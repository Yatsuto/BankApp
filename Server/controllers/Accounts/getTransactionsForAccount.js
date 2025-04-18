// Import Sequelize operator and models
import { Op } from 'sequelize';
import { Account, Transaction } from '../../models/index.js';

// Controller: Fetches all transactions involving a specific account
export const getTransactionsForAccount = async (req, res) => {
  const { accountId } = req.params; // Get account ID from request URL

  try {
    // 🔍 Find all transactions where the account is either sender or receiver
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [
          { from_account_id: accountId },  // Account sent money
          { to_account_id: accountId },    // Account received money
        ],
      },
      include: [
        {
          model: Account,
          as: 'fromAccount',               // Include sender account details
          attributes: ['account_type', 'account_number'],
        },
        {
          model: Account,
          as: 'toAccount',                 // Include receiver account details
          attributes: ['account_type', 'account_number'],
        },
      ],
      order: [['timestamp', 'DESC']],      // Order transactions by most recent
    });

    // ✅ Return the full transaction list as JSON
    res.json(transactions);
  } catch (error) {
    // ❌ Handle errors gracefully
    console.error('❌ Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
