import mongoose, {Schema} from "mongoose";  //Schema isliye taki baar baar mongoose.Schema na likhna pade.
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const userschema = new Schema(
    {
    id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // ensures that any extra spaces at the start or end of a string are removed before saving to the database.
        index: true //index: true tells MongoDB to create an index for that field, improving query performance for lookups, sorting, and ensuring uniqueness (when combined with unique: true).it is not optimised so dont use it every where.
    },
    watchHistory:[ 
        {
        type: Schema.Types.ObjectId,
        ref: "video"
        }
    ],
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverimage: {
        type: String //cloudinary url
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshToken: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    },
    {
        timestamps: true
    }
)


//pre() is a hook :In Mongoose, the pre method is used to define middleware that runs before a certain action (like saving, validating, or removing a document) occurs.
//pre() me kripya arrow function na use kare kyuki arrow function me "this" use nahi kar sakte par isme "this" ki jarurat hai.
//  "save", matlab just save hone se pehle kuch use karna hai.
userschema.pre("save", async function(next){  //using async as it may take some time.
    if(!this.isModified("password")) return next() //we used this line so that this code for encrypting password only runs when user is first time creating the password or modifying it. so it says if not modifying move to next task directly
    this.password = await bcrypt.hash(this.password, 10) //10 is just rounds do encryption it can be any number
    next() //"next" ko last me call kiya hai because we want to move on to save, after encrypting our password.
})


//we can also create our own methods using .methods.methodName, like here we created "isPasswordCorrect" method
userschema.methods.isPasswordCorrect = async function 
(password) {
    return await bcrypt.compare(password, this.password)   //compares given password with saved password on database.
}

userschema.methods.generateAccessToken = function(){ 
    //is process me time nahi lagata hai.
    return jwt.sign(
        //1. payload 
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        //2. accesse token
        process.env.ACCESS_TOKEN_SECRET,
        //3. expiry
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
//These methods generate signed JWTs for authentication and session management, using user info and secret keys from your environment variables.
userschema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userschema);
