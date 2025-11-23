import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({//app.use is used to set up middleware functions in an Express application.
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))//middleware to parse (access) incoming json request bodies with a size limit of 16 kb
app.use(express.urlencoded({extended:true, limit:"16kb"}))//middleware to parse incoming requests with urlencoded payloads like space and special characters(" ": %20 or "@": %40)
app.use(express.static("public"))//serving static files like images,css files from the public directory
app.use(cookieParser())//middleware to parse cookies from incoming requests

export { app }