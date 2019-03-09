import { Router } from "express";
import User from "../db/models/user";

const userRouter = Router();

userRouter.post("/signUp", async (req, res) => {
  // TODO: Validate with joi
  const user = await User.create(req.body);
  return res.status(201).json(user);
});

userRouter.post("/signIn", async (req, res) => {
  // TODO: Validate with joi

  const { email, password } = req.body;
  debugger;
  return res.status(201).json(user);
});

userRouter.get("/all", async (req, res) => {
  //const users = await User.find({});
  debugger;
  return res.status(201).json(users);
});

userRouter.get("/getById/:id", async (req, res) => {
  debugger;

  const user = await User.findById(req.params.id);
  return res.status(201).json(user);
});

export default userRouter;
