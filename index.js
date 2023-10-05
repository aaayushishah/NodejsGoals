import express from "express";
import bodyparser from "body-parser";
import usersRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import imageRoutes from "./routes/images.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ErrorHandler from "./middleware/errorhandler.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const PORT = 5000;
const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/users", usersRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/file", imageRoutes);
app.use(ErrorHandler);
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB");
});
app.listen(PORT, () => {
  console.log("process.env.DB_CONNECTION: ", process.env.DB_CONNECTION);
  console.log(`Server running on PORT: ${PORT}`);
});
