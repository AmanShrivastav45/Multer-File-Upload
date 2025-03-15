import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./database/connection.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/multer/api", authRoutes);

app.listen(PORT, async () => {
    await connectMongoDB();
    console.table({
        "Server Status": "Active",
        "Server Port": PORT,
        "MongoDB": "Connected",
    });
});
