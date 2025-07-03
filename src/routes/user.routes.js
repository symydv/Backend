import { Router } from "express";
import { 
    changeCurrentPassword, 
    getCurrentUser, 
    getUserChannelProfile, 
    getWatchHistory, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage 
} from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    //neeche "register" method use ho raha hai uske just pehle hum "upload"(created using multer) use kar raha hai isi liye ise middleware kehte hai
    registerUser
)


router.route("/login").post(loginUser)


//secured routes.

router.route("/logout").post(verifyJWT, logoutUser) // verifyJWT is a middleware that we have created in "auth.middleware.js".

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails) //.post will update every thing so using patch

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// upload.single("avatar")
// → Middleware (usually from multer) to handle multipart/form-data.
// → Extracts the uploaded file from the field named "avatar" and stores it (locally or in memory).

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile) //because we are taking data from req.params
// This route is part of the user profile or channel system.
// It’s defined as a dynamic route /c/:username — similar to how YouTube uses /c/channelName.
// It uses JWT middleware for protected access and a controller that performs an aggregation query to fetch user metadata along with subscription data from related collections.

router.route("/history").get(verifyJWT, getWatchHistory)


export default router