import { Account } from "../../models/index.js";

const generateUniqueAccountNumber = async () => {
  const digits = '0123456789';

  const generate = () => {
    let acc = '';
    for (let i = 0; i < 12; i++) {
      acc += digits.charAt(Math.floor(Math.random() * 10));
    }
    return acc;
  };

  let unique = false;
  let accountNumber;

  while (!unique) {
    accountNumber = generate();
    const exists = await Account.findOne({ where: { account_number: accountNumber } });
    if (!exists) unique = true;
  }

  return accountNumber;
};

export const openAccount = async (req, res) => {
  const { user_id, account_type, funding_account_number } = req.body;

  if (!user_id || !account_type) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  try {
    let initial_balance = 0;


    if (funding_account_number) {
      const fundingAccount = await Account.findOne({
        where: {
          account_number: funding_account_number,
          user_id,
        },
      });

      if (!fundingAccount) {
        return res.status(404).json({ success: false, error: "Funding account not found" });
      }

      const balance = parseFloat(fundingAccount.balance);
      if (balance < 100) {
        return res.status(400).json({ success: false, error: "Insufficient balance to fund new account" });
      }


      fundingAccount.balance = (balance - 100).toFixed(2);
      await fundingAccount.save();
      initial_balance = 100;
    }


    const uniqueNumber = await generateUniqueAccountNumber();

    const newAccount = await Account.create({
      account_number: uniqueNumber,
      account_type,
      balance: initial_balance,
      user_id,
    });

    return res.status(201).json({ success: true, message: "Account created", account: newAccount });

  } catch (err) {
    console.error("❌ Error opening account:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
