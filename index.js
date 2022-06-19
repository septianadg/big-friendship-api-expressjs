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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});