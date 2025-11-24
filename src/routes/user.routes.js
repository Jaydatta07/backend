import express from "express"
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([//this is used to upload files and fields keyword accepts multiple files for for multiple inputs in array 
        {
            name: "avatar",//we will upload image for avatar in quantity of 1
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

export default router