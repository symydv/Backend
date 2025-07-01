import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
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





export default router