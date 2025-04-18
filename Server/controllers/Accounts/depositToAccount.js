// Import Account and Transaction models
import { Account, Transaction } from '../../models/index.js';

// Controller: Handles deposits into user accounts
export const depositToAccount = async (req, res) => {
  try {
    // ✅ Extract deposit data from the request body
    const { account_id, amount, note, checkNumber } = req.body;

    // 🔍 Find the account by primary key (id)
    const account = await Account.findByPk(account_id);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    // 💰 Calculate new balance depending on account type
    let updatedBalance;
    if (account.account_type === 'Credit') {
      // For credit accounts, depositing reduces the owed amount
      updatedBalance = parseFloat(account.balance) - parseFloat(amount);
    } else {
      // For Checking/Savings, deposit increases the balance
      updatedBalance = parseFloat(account.balance) + parseFloat(amount);
    }

    // 📈 Update the account balance in the DB
    await account.update({ balance: updatedBalance });

    // 🧾 Log the transaction in the Transaction table
    await Transaction.create({
      from_account_id: null,                       // Deposit doesn't originate from a user account
      to_account_id: account.id,                   // Destination account for the deposit
      amount,
      note: `Check #${checkNumber}${note ? ` - ${note}` : ''}`, // Note includes check number
      timestamp: new Date(),                       // Record current time
    });

    // ✅ Send success response with updated balance
    res.status(200).json({ message: 'Deposit successful', newBalance: updatedBalance });

  } catch (error) {
    // ❌ Catch any server/database errors
    console.error('❌ Error during deposit:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
