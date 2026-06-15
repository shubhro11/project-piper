import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"
import morgan from "morgan"

// Import Routes
import musicRoutes from "./routes/music.route.js"

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))


// Routes
app.use("/api/music", musicRoutes)

export default app