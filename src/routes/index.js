import { auth } from "../auth";
import userRoutes from "./user";
import authRoutes from "./auth";
import notebookRoutes from "./notebook";

export default app => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", auth, userRoutes);
  app.use("/api/notebooks", auth, notebookRoutes);
};
