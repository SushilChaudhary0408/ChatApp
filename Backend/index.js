// import express from 'express';
// import dotenv from 'dotenv'
// import mongoose from 'mongoose';
// import cors from 'cors'
// import cookieParser from 'cookie-parser';
// import UserRoute from './route/User.Route.js';
// import messageRoute from './route/message.route.js';
// import { app, server } from './SocketIO/server.js';


// dotenv.config();

// // middleware 
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// const PORT = process.env.PORT || 4000;
// const URI = process.env.MONGODB_URI;

// try {
//     mongoose.connect(URI)
//     console.log("Connected to mongoose")
// } catch (error) {
//     console.log(error)
// }

// // routes 
// app.use("/api/user", UserRoute);
// app.use("/api/message", messageRoute);

// server.listen(PORT, () => {
//     console.log(`Example app listening on PORT ${PORT}`);
// });




import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoute from './route/User.Route.js';
import messageRoute from './route/message.route.js';
import { app, server } from './SocketIO/server.js';

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// MongoDB connection
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Routes
app.use("/api/user", UserRoute);
app.use("/api/message", messageRoute);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
