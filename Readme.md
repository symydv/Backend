# Backend Series.

- [Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)


# Some integrated terminal shortcuts
1. use "cd foldername" to get into a folders integrated terminal, eg; if you are in integrated terminal of "BackendAdv" and want to go to "temp" terminal write "cd public/temp", or if you want to got to "src" write "cd src" , and to go back write "cd .."

2. use "ls" command to check what directories and file are inside your current folder.

3. use "touch file1, fil2" to create file1 and file2 and so on in your current directory

4. use "mkdir folder1, folder2" to create folders in your current diretory



# Some information/process notes-

1. we first write "npm init" to initiallize the file formation of "package.json"

2. we made an empty folder "public", added "temp" folder to it and added ".gitkeep" file in "temp" so that it can be added to github even if it is empty

3. we added ".gitignore" to our main directory so that we can not share sensitive information to github, we use any ".gitignore generator" website to get ideal files for "Nodejs" to add in gitignore, we can add more as per requirement.

4. created ".env" file to add evironment variables.

5. we created "src" folder and added many files and folders to our src directory (to make it organised).
{
    folders: [controllers, db, middlewares, models, routes, utils]
    files: [app.js, constants.js, index.js]
}

6. add "type" : "module" inside "package.json" so that we can use import syntax in our "index.js" file

7. we have used "nodemon" to constantly refresh the server whenever we edit our "index.js",
   for that we have installed nodemon using "npm i -D nodemon" in our terminal inside "package.json", (here -D represents dev dependency not for production)
   we also added "dev": "nodemon src/index.js" inside script in "package.json"

8. prettier is installed using "npm i -D prettier" , and prettier is used so that when many developers are working on a project they follow same  format like "singleQuotes" or not or haw many spaces we use for indentation etc. for that we create ".pretteirrc" file

9. we have added ".prettierignore" file which allows us to name files on which we dont want to add prettier laws like ".env" file .
----------------
10. we setup our database using mongodb atlas, watch lecture 7 first 10 minutes. also added db uri to ".env" file and added "export const DB_NAME = 'videotube'" in "constants.js" file

11. use "npm i mongoose express dotenv" to install mongoose, express and dotenv packages

12. there are two methods to connect database 
{
    1: writing its code in "index.js" file itself.
    2: writing db code in any other file and then import it in "index.js",
    for second method we have created a "index.js" file inside our "db" folder which is inside our "src" folder, and there we have written our code to connect database.
}

13. in the "package.json" file we have added "-r dotenv/config --experimental-json-modules" in script between "nodemon" and "./src/index.js" so that we can use import syntax for "dotenv" also. We can use "require" syntax as it is.
----------------
14. Create express app in app.js and export it.

15. use "npm i cookie-parser cors" to install cookie-parser and cors package and to import them in app.js to use them.

16. we create files in "utils" (utilities), we creates this files to use them many times again and again in our codebase
----------------
17. created files in "models" direcotry for data modeling. Added models by looking into the link mentioned above in this file

18. use "npm i mongoose-aggregate-paginate-v2" to install a package to use aggregation pipeline in video model to load limited videos at a time.

19. install bcrypt and jsonwebtoken (jwt) using "npm i bcrypt jsonwebtoken" , bcrypt helps you to hash(encrypt) your password. JWT is a compact, URL-safe way of representing claims (data) between two parties. It is commonly used for authentication and authorization in web applications. jwt is a bearer token.

20. JWT: A JWT token is a secure way for your app to know who the user is, without having to ask them to log in again and again.
It’s like a digital pass that proves your identity every time you use the app!
----------------
21. use "npm i cloudinary" to install cloudinsary. Setup cloudinary by making a new file "cloudinary.js" in "utils" directory.
{
    Cloudinary is a cloud-based media management platform used to:

        Upload and store images, videos, and other files

        Automatically resize, optimize, and transform them

        Deliver them via a CDN (very fast)

    It’s very useful for web apps that need user-generated file uploads (like profile pics, product images, etc.).
}

22. use "npm i multer" to install multer. create "multer.middleware.js" file in "middleware" directory and setup multer there.
{
    When you want to upload files (images, PDFs, etc.) from a frontend (HTML form or React app) to your Express server, you need to parse and store the files — Multer does that for you.
}

NOTE:- Multer is used to save our files locally for short time then it is stored in cloudinary.

----------------
---------------- #Configuration is almost 95% over, remaining we will see as we move into our project.
we also created notes on HTTP in "BackendCoC/HTTPCrashCourse/Notes.txt"#-----------------------
----------------

23. we now procced to create controllers and their routes in "controllers" and "routes" directory respectively. Then import them in "app.js" . 

24. Downloaded Postman on desktop and lernt about it watch lecture 12 from 23 minutes.
----------------
25. Now we will actually register a user in controllers.

26. import {upload} from "../middlewares/multer.middleware.js" in our "user router" file
---------------
27. we used postman to test our registration process using cloudinary, MongoDB and Multer (Check lecture 14.) , also learned about use of environment in postman and many more things.
---------------
28. created "loginUser" and "logoutUser" in "user.controllers.js", and added their routes in "user.routes.js" . also learned about generating and using access and refresh tokens.

29. created "auth.middleware.js" file in middlewares