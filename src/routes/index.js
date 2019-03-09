import { auth } from "../auth";
import userRoutes from "./user";
import authRoutes from "./auth";

export default app => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", auth, userRoutes);
};
