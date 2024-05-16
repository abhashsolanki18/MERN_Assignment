import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { uploadOnCloud } from './cloudinary.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const localFilePath = req.file.path;

  try {
    const imageUrl = await uploadOnCloud(localFilePath, title, description);
    res.status(200).json({ message: 'File uploaded successfully', url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});

app.get('/images', async (req, res) => {
  try {
    const cloudName = 'abhashsolanki'; // Your Cloudinary cloud name
    const folder = 'images'; // Your folder name where images are stored

    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        params: {
          expression: `folder:${folder}`, // Filter by folder
          type: 'upload', // Filter by resource type (uploads)
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET
          ).toString('base64')}`,
        },
      }
    );

    if (response.data && response.data.resources) {
      res.status(200).json(response.data.resources);
    } else {
      res.status(404).json({ message: 'No images found in the specified folder' });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
