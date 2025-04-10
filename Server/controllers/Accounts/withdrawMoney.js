import { Account, Transaction } from '../../models/index.js';

export const withdrawFromAccount = async (req, res) => {
  const { account_id, amount, note } = req.body;

  try {
    const account = await Account.findByPk(account_id);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    if (!['Checking', 'Savings'].includes(account.account_type)) {
      return res.status(400).json({ message: 'Withdrawals are only allowed from Checking or Savings' });
    }

    if (parseFloat(account.balance) < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct balance
    account.balance = parseFloat(account.balance) - parseFloat(amount);
    await account.save();

    // Log the transaction
    await Transaction.create({
      from_account_id: account.id,
      to_account_id: null,
      amount,
      note: note || 'ATM Withdrawal',
      timestamp: new Date()
    });

    // Generate one-time-use code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in memory (for demo purposes)
    // In production, you'd want Redis or a DB
    global.otps = global.otps || {};
    global.otps[otp] = {
      account_id,
      expires_at: Date.now() + 5 * 60 * 1000 // 5 min
    };

    res.json({ otp, expires_at: global.otps[otp].expires_at });

  } catch (error) {
    console.error('❌ Error during withdrawal:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
