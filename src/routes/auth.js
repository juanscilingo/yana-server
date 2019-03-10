import { Router } from "express";
import passport from "passport";
import { User } from "../db/models";
import { auth, guest } from "../auth";

const { SESSION_NAME } = process.env;

const authRouter = Router();

authRouter.post("/signup", guest, async (req, res, next) => {
  // TODO: Validate with joi
  const user = await User.create(req.body);

  req.login(user, err => {
    if (err) next(err);

    return res.status(200).json({
      email: user.email,
      name: user.name,
      avatar: user.avatar
    });
  });
});

authRouter.post("/signin", guest, async (req, res, next) => {
  // TODO: Validate with joi

  passport.authenticate("local", (err, user, info) => {
    //if (err) return res.status(401).json(err);
    if (info) return next({ ...info, name: "Unauthorized" });
    if (err) return next(err);

    req.login(user, err => {
      // if (err) return res.status(401).json(err);
      if (err) return next(err);

      return res.status(200).json({
        email: user.email,
        name: user.name,
        avatar: user.avatar
      });
    });
  })(req, res);
});

authRouter.post("/signout", auth, async (req, res) => {
  req.session.destroy();
  req.logout();
  return res.sendStatus(200);
});

export default authRouter;
