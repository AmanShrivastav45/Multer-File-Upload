import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
