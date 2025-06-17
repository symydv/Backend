// we have used nodemon to constantly refresh the server whenever we edit our index.js,
// for that we have installed nodemon using "npm i -D nodemon" in our terminal inside package.json, (here -D represents dev dependency)
// we also added "dev": "nodemon src/index.js" inside script in package.json


// require("dotenv").config({path: "./env"});  
import dotenv from "dotenv"

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB()













// 1. below is the first approch to connect to a database.
/*
import express from "express"
const app = express()
//connecting database can cause error as it is on another continent
//using async await as db can take time in loading. and also use try catch for error handling

//below code is for emideate execution of function(note: is line ke pehle wali line ko semicolumn se end karna jaruri hai)
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        //below code if db runs but app fails for some reasons
        app.on("error", (error) => {
            console.log("ERROR: ",error);
            throw error  
        })

        //but if it runs
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR: ",error)
        throw err
    }
})()
*/
