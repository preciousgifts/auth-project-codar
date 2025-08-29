import express from "express";
import DbConnection from "./utils/DbConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import homeRoutes from "./routes/home-routes.js";
import adminRoutes from "./routes/admin-routes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import frontDeskRoutes from "./routes/frontDeskRoutes.js";
import ImageRouter from "./routes/Image-routes.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5001;

app.use(cors());
app.use(express.json());
DbConnection();

app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/front-desk", frontDeskRoutes);
app.use("/api/image", ImageRouter);

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
