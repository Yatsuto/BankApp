import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Account = sequelize.define('account', {
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  account_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  max_limit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'accounts',
});

export default Account;
