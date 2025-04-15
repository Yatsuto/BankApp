import User from "../../models/users.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and Password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid Password",
      });
    }

    // ✅ Send back user ID and optional user info
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
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
};

export default login;
