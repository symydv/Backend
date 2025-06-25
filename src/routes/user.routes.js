import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

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

export default router