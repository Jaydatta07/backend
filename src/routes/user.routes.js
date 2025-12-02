import express from "express"
import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

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

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJwt, logoutUser)//route first visits first function(verifyJwt) and then the next() keyword in that function tells route that visit second function in row(logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

export default router