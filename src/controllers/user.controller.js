import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async(req, res) => {
    //1. get user details from frontend. (using postman we can get user details instead of frontend using our "user models")
    //2. validation - not empty
    //3. check if user already exists.(using username, email)
    //4. check for images, check for avatar.
    //5. upload them t0 cloudinary, avatar check if it gets uploaded or not
    //6. create user object - create entry in db.
    //7. remove password and refresh token field from response.
    //8. check for user creation , it happened or not
    //9. return res

    //1.
    const {fullName, email, username, password} = req.body
    // console.log("email: ",email);

    //2.
    if (
        //.some() goes through the array and checks if at least one of the fields meets the condition:
        [fullName, email, username, password].some((field) => field?.trim() === "") 
        //field might be undefined, so we use optional chaining (?.) to avoid errors.
        // .trim() removes any leading/trailing spaces, so " " becomes "".
        //ye code pehle to sabhi field leta hai out of four fields we have provided then it checks that if the field is empty if so it returns true.{use AI to understand}, if we have not used this method we could have directly checked them using if( fullname === "" ) and so for all the fields separately
    ) {
        throw new ApiError(400, `All fields are required`) //using our already created function for Error handling.
    }
    
    //3.
    const existedUser = await User.findOne({ //This is a Mongoose method that searches for a single user in the database.
        $or: [{ username }, { email }]  //$or is a MongoDB operator that allows you to specify multiple conditions.It returns documents that match at least one of the conditions.
        //Find a user where the username matches the provided username OR the email matches the provided email.
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


    // console.log(req.files); //just to check what is this 
    // console.log(req.body); //just to check what is this 
    

    //4.
    const avatarLocalPath = req.files?.avatar[0]?.path; //This line safely gets the file path of the uploaded avatar image, if it exists.
    // req.files:
    // This is an object that contains files uploaded by the user (usually when using a middleware like multer for handling multipart/form-data).

    // ?. (optional chaining):
    // This checks if the property exists before trying to access it, preventing errors if something is undefined or null.

    // avatar:
    // This is the field name for the uploaded file (e.g., <input type="file" name="avatar" /> in your frontend form).

    // [0]:
    // If multiple files are uploaded under the same field, they are stored as an array. [0] gets the first file.

    // path:
    // This is the location (on disk or in temp storage) where the uploaded file is saved.

    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    //or  //check on AI why we used below method.
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar image is required") //coverimage is not neccessarily  required as we have saved in models
    }
    
    //5.
    const avatar = await uploadOnCloudinary(avatarLocalPath) //you have to wait till this process is finished.
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar image is required")
    }

    //6.
    const user = await User.create({ //Used to insert a new document into a MongoDB collection (database)
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", //as we have not checked that coverImage is provided or not
        email,
        password,
        username: username.toLowerCase()
    })

    //7. and 8.
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" // '-' ke baad jo bhi likha hai wo hame nahi chahiye hota hai to wo database me show nahi hoga
    ) 
    //db automatically creates "_id" for each data block

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a user.")
    }

    //9.
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfully")
    )






    })


export {registerUser}