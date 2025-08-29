This backend was built with Express and mongoDb.
Password is encrypted with bcrypt.

To run the code, perform the actions below;

1. run "npm i" or "npm install". this will install all the dependencies.

2. create a .env file in the parent folder and define the variables below
   MONGO_URL=
   SERVER_PORT=
   SECRET_KEY=
   SESSION_TIME=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

You'll need a mongoDb cloud account and a cloudinary account for storing pictures

3. run "nodemon server.js" to start the server.

NOTE: you may encounter connection failure error with mongoDb. Lunch Atlas, select the project,
navigate to network Access, add this ip 0.0.0.0/0 and save
