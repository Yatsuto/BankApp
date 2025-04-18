// Import necessary models and Sequelize transaction handler
import { Account, Transaction } from '../../models/index.js';
import sequelize from '../../config/config.js';

// Controller: Transfer money between two user accounts
export const transferMoney = async (req, res) => {
  const { user_id, from_account_id, to_account_id, amount, note } = req.body;

  try {
    // 🛡️ Validate required fields
    if (!user_id || !from_account_id || !to_account_id || !amount || from_account_id === to_account_id) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // 💵 Convert amount to number and validate
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ message: 'Invalid transfer amount' });
    }

    // 🔍 Fetch both source and destination accounts
    const fromAccount = await Account.findOne({ where: { id: from_account_id, user_id } });
    const toAccount = await Account.findOne({ where: { id: to_account_id } });

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ message: 'One or both accounts not found' });
    }

    // ✅ Only Checking or Savings accounts can initiate transfers
    if (!['Checking', 'Savings'].includes(fromAccount.account_type)) {
      return res.status(400).json({ message: 'Transfers can only be made from Checking or Savings accounts' });
    }

    // 🚫 Ensure the sender has enough balance
    if (parseFloat(fromAccount.balance) < amountNum) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // 🔁 Perform balance updates and transaction logging atomically
    await sequelize.transaction(async (t) => {
      // 💸 Deduct from sender
      fromAccount.balance = parseFloat(fromAccount.balance) - amountNum;

      // 💳 For credit accounts, reduce the balance (debt); otherwise, increase
      if (toAccount.account_type.toLowerCase() === 'credit') {
        toAccount.balance = parseFloat(toAccount.balance) - amountNum;
      } else {
        toAccount.balance = parseFloat(toAccount.balance) + amountNum;
      }

      // 💾 Save changes within transaction
      await fromAccount.save({ transaction: t });
      await toAccount.save({ transaction: t });

      // 🧾 Create a record in the transactions table
      await Transaction.create({
        from_account_id,
        to_account_id,
        amount: amountNum,
        note,
      }, { transaction: t });
    });

    // ✅ Success response
    return res.status(200).json({ message: 'Transfer completed successfully' });

  } catch (error) {
    // ❌ Handle unexpected server/database issues
    console.error('❌ Error during transfer:', error);
    return res.status(500).json({ message: 'Server error during transfer' });
  }
};
