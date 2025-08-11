import express from "express";
const app = express();
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: 5001");
    })
})

