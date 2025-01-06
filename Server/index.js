import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoute.js"
import cors from "cors"
import path from 'path';
import userRouter from "./routes/loginRoute.js"

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use('/uploads', express.static(path.join('uploads')));
app.use("/api",userRouter)

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;




mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port :${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
