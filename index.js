import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
 
//app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
 
//app.listen(process.env.HOST_PORT || 5000, ()=> console.log('Server running at port 5000'));

var port = process.env.HOST_PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});