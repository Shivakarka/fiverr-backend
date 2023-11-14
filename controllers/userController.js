import User from "../models/userModel.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "User has been deleted." });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return next(createError(404, "User not found!"));

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
