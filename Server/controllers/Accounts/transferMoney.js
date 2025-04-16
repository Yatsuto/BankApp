import {Account , Transaction }from '../../models/index.js';
import sequelize from '../../config/config.js';


export const transferMoney = async (req, res) => {
  const { user_id, from_account_id, to_account_id, amount, note } = req.body;

  try {

    if (!user_id || !from_account_id || !to_account_id || !amount || from_account_id === to_account_id) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ message: 'Invalid transfer amount' });
    }


    const fromAccount = await Account.findOne({ where: { id: from_account_id, user_id } });
    const toAccount = await Account.findOne({ where: { id: to_account_id } });

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ message: 'One or both accounts not found' });
    }


    if (!['Checking', 'Savings'].includes(fromAccount.account_type)) {
      return res.status(400).json({ message: 'Transfers can only be made from Checking or Savings accounts' });
    }

    if (parseFloat(fromAccount.balance) < amountNum) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    
    await sequelize.transaction(async (t) => {
      fromAccount.balance = parseFloat(fromAccount.balance) - amountNum;
      if (toAccount.account_type.toLowerCase() === 'credit') {
        toAccount.balance = parseFloat(toAccount.balance) - parseFloat(amount);
      } else {
        toAccount.balance = parseFloat(toAccount.balance) + parseFloat(amount);
      }
      

      await fromAccount.save({ transaction: t });
      await toAccount.save({ transaction: t });

      await Transaction.create({
        from_account_id,
        to_account_id,
        amount: amountNum,
        note,
      }, { transaction: t });
    });

    return res.status(200).json({ message: 'Transfer completed successfully' });

  } catch (error) {
    console.error('❌ Error during transfer:', error);
    return res.status(500).json({ message: 'Server error during transfer' });
  }
};
