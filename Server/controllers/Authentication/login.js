// Import User model and bcrypt for password comparison
import User from "../../models/users.js";
import bcrypt from "bcrypt";

// Controller: Authenticates a user by email and password
const login = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Step 1: Validate presence of required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and Password are required",
    });
  }

  try {
    // 🔍 Step 2: Look for a user with the given email
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    // 🔐 Step 3: Compare provided password with hashed password in DB
    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid Password",
      });
    }

    // ✅ Step 4: Return success response with limited user info
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (err) {
    // ❌ Step 5: Handle server errors
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
};

export default login;
