// controllers/Accounts/getAccounts.js
import {Account , User } from '../../models/index.js';


export const getAccounts = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`🔍 Fetching accounts for userId: ${userId}`);

    const user = await User.findByPk(userId);
    if (!user) {
      console.warn(`⚠️ No user found with ID: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const accounts = await Account.findAll({ where: { user_id: userId } });

    if (!accounts.length) {
      console.log(`ℹ️ No accounts found for user_id: ${userId}`);
    } else {
      console.log(`📦 ${accounts.length} accounts found`);
    }

    res.status(200).json(accounts);
  } catch (error) {
    console.error('❌ Error fetching accounts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
