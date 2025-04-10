import { Account , Transaction } from '../../models/index.js';

export const depositToAccount = async (req, res) => {
  try {
    const { account_id, amount, note, checkNumber } = req.body;

    const account = await Account.findByPk(account_id);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    let updatedBalance;
    if (account.account_type === 'Credit') {
      updatedBalance = parseFloat(account.balance) - parseFloat(amount);
    } else {
      updatedBalance = parseFloat(account.balance) + parseFloat(amount);
    }

    await account.update({ balance: updatedBalance });

    await Transaction.create({
      from_account_id: null,
      to_account_id: account.id,
      amount,
      note: `Check #${checkNumber}${note ? ` - ${note}` : ''}`,
      timestamp: new Date()
    });

    res.status(200).json({ message: 'Deposit successful', newBalance: updatedBalance });
  } catch (error) {
    console.error('❌ Error during deposit:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
