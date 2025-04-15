import express from 'express';
import { transferMoney } from '../controllers/Accounts/transferMoney.js';
import { getAccounts } from '../controllers/Accounts/getAccounts.js';
import { getTransactionsForAccount } from '../controllers/Accounts/getTransactionsForAccount.js';
import { depositToAccount } from '../controllers/Accounts/depositToAccount.js';
import { withdrawFromAccount } from '../controllers/Accounts/withdrawMoney.js';
import { openAccount } from '../controllers/Accounts/openAccount.js';
const router = express.Router();

router.get('/:userId', getAccounts);
router.post('/transfer', transferMoney); // ✅ New route
router.get('/:accountId/transactions', getTransactionsForAccount);
router.post('/deposit', depositToAccount);
router.post('/withdraw', withdrawFromAccount);
router.post("/open", openAccount);

export default router;
