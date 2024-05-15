import express from "express";
import cors from "cors";
import multer from "multer";
import { uploadOnCloud } from "./cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {
  res.send("Server is running");
});

app.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  const data = {
    email: email,
    name: name,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const localFilePath = req.file.path;
      const imageUrl = await uploadOnCloud(localFilePath);
      res.status(200).json({ message: 'File uploaded successfully', url: imageUrl });
    } catch (error) {
      res.status(500).json({ message: 'File upload failed', error: error.message });
    }
  });
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
