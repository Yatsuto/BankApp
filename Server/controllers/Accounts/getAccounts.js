// controllers/Accounts/getAccounts.js

// Import Account and User models
import { Account, User } from '../../models/index.js';

// Controller: Retrieves all accounts linked to a specific user
export const getAccounts = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from route parameters
    console.log(`🔍 Fetching accounts for userId: ${userId}`);

    // 🔎 Look up the user to ensure they exist
    const user = await User.findByPk(userId);
    if (!user) {
      console.warn(`⚠️ No user found with ID: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    // 🏦 Fetch all accounts belonging to the user
    const accounts = await Account.findAll({ where: { user_id: userId } });

    // ℹ️ Log results for debugging purposes
    if (!accounts.length) {
      console.log(`ℹ️ No accounts found for user_id: ${userId}`);
    } else {
      console.log(`📦 ${accounts.length} accounts found`);
      console.log(accounts[0].account_number); // Sample log of first account
    }

    // ✅ Return the accounts as JSON
    res.status(200).json(accounts);
  } catch (error) {
    // ❌ Handle and log any errors that occur
    console.error('❌ Error fetching accounts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
