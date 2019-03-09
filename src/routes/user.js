import { Router } from "express";
import User from "../db/models/user";

const userRouter = Router();

userRouter.get("/me", async (req, res) => {
  return res.status(200).json(req.user);
});

userRouter.get("/all", async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
});

userRouter.get("/getById/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.status(200).json(user);
});

export default userRouter;
