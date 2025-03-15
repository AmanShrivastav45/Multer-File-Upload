import path from "path";
import { fileURLToPath } from "url";
import File from "../models/file.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded or invalid file type" });
        }
        const newFile = new File({ filename: req.file.filename });
        await newFile.save();

        res.json({ message: "File uploaded successfully", filename: req.file.filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "File upload failed" });
    }
};

export const getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Error fetching files" });
    }
};

export const viewFile = async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, "../uploads", filename);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving file" });
    }
};
