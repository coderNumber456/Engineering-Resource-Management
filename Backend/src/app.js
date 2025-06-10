import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cookie from "cookie-session"

const app = express()

dotenv.config({
    path: './.env'
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
     methods: ['GET', 'POST', 'PUT', 'DELETE'], // All methods your API uses
    credentials: true ,
   
}))

app.use(cookieParser())

app.use(cookie({
    httponly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))




// routes

import userRoute from "./routes/userRoute.js"
import projectRoute from "./routes/projectRoute.js"
import assignmentRoute from "./routes/assignmentRoute.js"

app.use( "/api/auth",userRoute )
app.use("/api/projects",projectRoute)
app.use("/api/engineers",userRoute)
app.use("/api/assignments",assignmentRoute)

export { app }