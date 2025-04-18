// Import Account and Transaction models
import { Account, Transaction } from '../../models/index.js';

// Controller: Handles ATM-style withdrawals
export const withdrawFromAccount = async (req, res) => {
  const { account_id, amount, note } = req.body;

  try {
    // 🔍 Step 1: Find the account by its ID
    const account = await Account.findByPk(account_id);
    if (!account)
      return res.status(404).json({ message: 'Account not found' });

    // ✅ Step 2: Check if the account is eligible for withdrawal
    if (!['Checking', 'Savings'].includes(account.account_type)) {
      return res.status(400).json({
        message: 'Withdrawals are only allowed from Checking or Savings',
      });
    }

    // 🚫 Step 3: Check if the account has enough balance
    if (parseFloat(account.balance) < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // 💸 Step 4: Deduct the amount from account balance
    account.balance = parseFloat(account.balance) - parseFloat(amount);
    await account.save();

    // 🧾 Step 5: Log the withdrawal in the transaction table
    await Transaction.create({
      from_account_id: account.id, // Withdrawals come *from* this account
      to_account_id: null,         // No destination since this is a cash withdrawal
      amount,
      note: note || 'ATM Withdrawal',
      timestamp: new Date(),
    });

    // 🔐 Step 6: Generate a one-time passcode (OTP) for ATM access
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    // 🧠 Step 7: Store OTP in a global variable with a 5-minute expiration
    global.otps = global.otps || {};
    global.otps[otp] = {
      account_id,
      expires_at: Date.now() + 5 * 60 * 1000, // Valid for 5 minutes
    };

    // ✅ Step 8: Return OTP and expiration to the frontend
    res.json({ otp, expires_at: global.otps[otp].expires_at });

  } catch (error) {
    // ❌ Step 9: Catch and log any unexpected errors
    console.error('❌ Error during withdrawal:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
