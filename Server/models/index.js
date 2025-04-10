import User from './users.js';
import Account from './account.js';
import Transaction from './transactions.js';


User.hasMany(Account, { foreignKey: 'user_id' });
Account.belongsTo(User, { foreignKey: 'user_id' });

export { User, Account, Transaction };
