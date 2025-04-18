// Import User model and bcrypt for password hashing
import User from "../../models/users.js";
import bcrypt from "bcrypt";

// Controller: Handles new user registration
export const register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // ✅ Step 1: Basic input validation
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({
      success: false,
      error: "Email, password, first name, and last name are required",
    });
  }

  try {
    // 🔎 Step 2: Check if a user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User with this email already exists",
      });
    }

    // 🔐 Step 3: Enforce strong password policy
    const isPasswordStrong = (pw) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return regex.test(pw);
    };

    if (!isPasswordStrong(password)) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
      });
    }

    // 🔑 Step 4: Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 👤 Step 5: Create the new user in the database
    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name
    });

    // ✅ Step 6: Return a success response (omit sensitive info)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      }
    });

  } catch (err) {
    // ❌ Step 7: Catch and log unexpected server/database errors
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error during registration"
    });
  }
};
