import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) return res.status(401).json({ error: "Unauthorized" });
      if (decoded.id !== user._id.toString())
        return res
          .status(401)
          .send({ error: "Unauthorized. You can delete only your account" });

      await User.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "User has been deleted." });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
