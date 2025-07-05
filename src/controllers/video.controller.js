import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)
    const sortOrder = sortType === "desc" ? -1:1 ;

    const filter = {};
    // 👇 If a userId is provided in query, filter by it
    if (userId) {
        const ownerId = userId?.trim();

        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        throw new Error("Invalid userId"); // or return 400 response
        }

        const filter = {
        owner: new mongoose.Types.ObjectId(ownerId),
    };
    }

    // 👇 If a search query is provided, add case-insensitive title match
    if (query) {
    filter.title = { $regex: query, $options: "i" }; // 'i' = case-insensitive
    }
    // filter.title	You're building a MongoDB query object to match documents where the title field...
    // { $regex: query }	...matches a regular expression pattern (basically a flexible search) based on the query string sent by the user
    // $options: "i"	"i" means case-insensitive (so "Cat" matches "cat", "CAT", etc.)


    console.log(filter);
    


    const videos = await Video.find(filter)
    .sort({[sortBy]: sortOrder} )              //.sort({ createdAt: -1 }) // Sort by createdAt descending
    .skip((pageNumber-1)*limitNumber)          //This skips the first N documents depending on which page you're on.
    .limit(limitNumber)                        // If limitNumber = 10, you get only 10 documents per page


    const total = await Video.countDocuments(filter); //this line counts the total number of documents in our databse that matches the filter.

    // return res.status(200).json(new ApiResponse(200, videos, "videos fetched successfully"))
    return res.status(200).json({
    success: true,
    data: videos,
    pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber)
    }
    });

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if(!title){
        throw new ApiError(400, "Video title is required")
    }
    if(!description){
        throw new ApiError(400, "Video description is required")
    }

    const localVideoPath = req.files?.videoFile[0]?.path;
    const localThumbnailPath = req.files?.thumbnail[0]?.path;
    if(!localVideoPath){
        throw new ApiError(400, "video is required.")
    }
    if(!localThumbnailPath){
        throw new ApiError(400, "Thumbnail is required.")
    }

    const uploadedVideo = await uploadOnCloudinary(localVideoPath)
    if (!uploadedVideo) {
        throw new ApiError(400, "video not uploaded")
    }
   
    
    
    const duration = uploadedVideo.duration; // in seconds
    // console.log("duration: ",duration);
    


    const uploadedThumbnail = await uploadOnCloudinary(localThumbnailPath)
    if (!uploadedThumbnail) {
        throw new ApiError(400, "Thumbnail not uploaded")
    }

    const finalVideo = await Video.create({
        title,
        description,
        videoFile : uploadedVideo?.url || "",
        thumbnail : uploadedThumbnail?.url || "",
        owner: req.user._id,
        isPublished: true,
        views: 0,
        duration: duration
    })

    return res
    .status(200)
    .json(new ApiResponse(200, finalVideo, "Video uploaded successfully."))
    
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}