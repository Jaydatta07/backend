import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJwt = asyncHandler(async(req,res,next) => { //here res is not usable,so we can use - in the place of res keyword
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            //discussion on frontend
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user;//this line gives the access of user to the next function(logoutUser) using req.user
        next()//this next() keyword is important to tell the route that visit the next function(logoutUser) in the row of route /logout,without this keyword routes will stop after this function only
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token")
    }
})