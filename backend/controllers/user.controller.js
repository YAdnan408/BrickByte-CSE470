import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const test = (req, res) => {
    res.json({
        message: 'Welcome to BrickByte API testing'
    });
};

export const updateUser = async (req, res) => {
    if (req.user.id!== req.params.id) return next (errorHandler(403, "You can only update your own account!"));
    try{
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      } 
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }
      }, { new: true });

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (err) {
      next(err);
    }  
};