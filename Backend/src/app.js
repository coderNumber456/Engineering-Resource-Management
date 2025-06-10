import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
    path: './.env'
});

//  CORS configuration for JWT
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] // Crucial for JWT
}));


app.use(cookieParser());

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import assignmentRoute from "./routes/assignmentRoute.js";

app.use("/api/auth", userRoute);
app.use("/api/projects", projectRoute);
app.use("/api/engineers", userRoute); 
app.use("/api/assignments", assignmentRoute);

export { app };