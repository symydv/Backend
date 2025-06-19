//Error is an inbuilt Nodejs class, read about it

// try to understand (use Ai)
class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong.",
        errors = [],
        stack = ""
    ){
        //overwriting
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructur)
        }
    }
}

export {ApiError}

//You can throw "ApiError" in your API routes and catch it in your error middleware to send structured error responses to the client.