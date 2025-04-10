import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import Account from './account.js'; // ✅ Import Account model

const Transaction = sequelize.define('transaction', {
  from_account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  to_account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: 'transactions',
});

// ✅ Define associations
Transaction.belongsTo(Account, { foreignKey: 'from_account_id', as: 'fromAccount' });
Transaction.belongsTo(Account, { foreignKey: 'to_account_id', as: 'toAccount' });

export default Transaction;
