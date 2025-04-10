import { Op } from 'sequelize';
import { Account, Transaction } from '../../models/index.js';

export const getTransactionsForAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [
          { from_account_id: accountId },
          { to_account_id: accountId },
        ],
      },
      include: [
        {
          model: Account,
          as: 'fromAccount',
          attributes: ['account_type', 'account_number']
        },
        {
          model: Account,
          as: 'toAccount',
          attributes: ['account_type', 'account_number']
        },
      ],
      order: [['timestamp', 'DESC']],
    });

    res.json(transactions);
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
