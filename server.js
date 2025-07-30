import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import path from 'path'
import { fileURLToPath } from "url";
import { url } from "inspector";
import resumeRouter from "./routes/resumeroutes.js";
import multer from 'multer';
import cloudinary from 'cloudinary'
import fs from 'fs';



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express();
const PORT = 3000;

app.use(cors())// connect db
connectDB()


// middlwware
app.use(express.json())
app.use('/api/auth',userRouter)
app.use('/api/resume',resumeRouter)

app.use(
    '/uploads',
    express.static(path.join(__dirname,'uploads'),{
        setHeaders:(res,_path)=>{
            res.set('access-control-allow-origin','http://localhost:5173/')// here frontend url will come 
        }
    }
    )
)
//routes

app.get('/',(req,res)=>{
    res.send('API WORKING')
})


// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get("/ejs", (req, res) => {
  res.render("upload", { imageUrl: null });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);
    res.render("upload", { imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.send("Upload failed!");
  }
});

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})