import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"   //It takes the incoming cookies sent in the HTTP request, processes them, and makes them readily available for use within your application logic. 


const app = express()

//app.use() , this is used for all the middlewares and configurations.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))  //to encode random urls
app.use(express.static("public")) // static: This is a built-in middleware function in Express. It serves static files and is based on serve-static.

app.use(cookieParser())

export {app}