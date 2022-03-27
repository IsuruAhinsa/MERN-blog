import "dotenv/config";
import express from "express";
import cors from "cors";
import AppRoutes from "./api/routes/app.route.js";
import { connect } from "./config/database.js";
import PostRoutes from "./api/routes/post.route.js";
import UserRoutes from "./api/routes/user.route.js";
import AuthRoutes from "./api/routes/auth.route.js";
import CategoryRoutes from "./api/routes/category.route.js";
import upload from "./config/filesystem.js";
import path from "path";

const app = express();
const PORT = process.env.APP_PORT;
// Use dependencies
app.use(cors());
app.use(express.json({ limit:'20mb' }));

const __dirname = path.resolve();
app.use("/public/img", express.static(path.join(__dirname, "/public/img")));

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/categories", CategoryRoutes);

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded!");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
    AppRoutes(app);
    connect();
});