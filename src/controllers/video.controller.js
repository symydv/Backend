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

    filter = {}
    // 👇 If a userId is provided in query, filter by it
    if (userId) {
    filter.owner = userId;
    }

    // 👇 If a search query is provided, add case-insensitive title match
    if (query) {
    filter.title = { $regex: query, $options: "i" }; // 'i' = case-insensitive
    }
    // filter.title	You're building a MongoDB query object to match documents where the title field...
    // { $regex: query }	...matches a regular expression pattern (basically a flexible search) based on the query string sent by the user
    // $options: "i"	"i" means case-insensitive (so "Cat" matches "cat", "CAT", etc.)

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