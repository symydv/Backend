import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"


const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    //TODO: get all comments for a video
    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "video not found.")
    }

    const videoComments = await Comment.find({video: videoId})
    .sort({ createdAt: -1 }) //newest first.
    .skip((page-1)*limit)
    .limit(limit)

    let message = ""
    if (!videoComments || videoComments.length === 0) {
        message = "there are no comments on this video."
    }

    const totalComments = await Comment.countDocuments({video: videoId})

    return res
    .status(200)
    .json(new ApiResponse(200, {
        videoComments,
        totalComments,
        totalPages: Math.ceil(totalComments / limit),
        currentPage: page,
        message
    }, "video comments fetched successfully." ))

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "video does not exist.")
    }

    const comment = await Comment.create({
        content: content,
        video: videoId,
        owner: req.user._id
    })

    if (!comment) {
        throw new ApiError(500, "comment was not created.")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment created successfully."))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params

    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new ApiError(404, "comment not found.")
    }

})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }