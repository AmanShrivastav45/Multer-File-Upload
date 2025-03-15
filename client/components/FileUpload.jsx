import React, { useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const server = import.meta.env.VITE_SERVER_URL;

const FileUpload = () => {
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadCompleted, setUploadCompleted] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setError("Please upload a PDF file.");
                setFileData(null);
            } else {
                setFileData({
                    file,
                    name: file.name,
                    size: file.size,
                    progress: 0,
                    status: "uploading",
                });
                setError("");
                simulateUpload();
            }
        }
    };

    const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            setFileData((prevFile) => {
                if (!prevFile) return null;
                if (progress >= 100) {
                    clearInterval(interval);
                    return { ...prevFile, progress: 100, status: "completed" };
                }
                return { ...prevFile, progress };
            });
        }, 500);
    };

    const handleDelete = () => {
        setFileData(null);
        setError("");
        setUploadCompleted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fileData?.file) {
            setError("No file selected.");
            return;
        }
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", fileData.file);

        try {
            const response = await axios.post(`${server}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                toast.success("File uploaded successfully!");
                setUploadCompleted(true);
            }
        } catch (error) {
            toast.error("There was an error uploading the file. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleUploadAgain = () => {
        setFileData(null);
        setUploadCompleted(false);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white border border-gray-300 py-4 rounded-xl pb-6 shadow-md">
            <div className="w-full flex items-center justify-start border-b border-gray-300 pb-4 px-4">
                <div className="w-10 h-10 mr-3 border border-gray-400 rounded-full text-xl flex items-center justify-center">
                    <IoCloudUploadOutline />
                </div>
                <div>
                    <h2 className="text-lg font-medium">Upload files</h2>
                    <h2 className="text-xs text-gray-500">Select the file you want to upload</h2>
                </div>
            </div>

            {!uploadCompleted && (
                <div className="w-full p-6 pb-0">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                        <IoCloudUploadOutline size={24} className="mb-4" />
                        <span>Choose a file or drag & drop it here.</span>
                        <span className="text-xs text-gray-400">PDF files only, up to 50MB</span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
                        <div className="mt-4 text-sm border border-gray-300 rounded-[5px] px-3 py-1.5 text-gray-700 font-medium">Browse File</div>
                    </label>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            )}

            {fileData && (
                <div className="px-6 pt-6 pb-2">
                    <div className="flex w-full items-center justify-between p-3 border border-gray-300 rounded-[8px] mb-2">
                        <div className="w-full flex flex-col">
                            <div className="flex mb-3">
                                <img src="/pdf.svg" alt="File Icon" className="w-10 h-10" />
                                <div className="flex justify-between ml-3 w-full">
                                    <div className="flex flex-col">
                                        <p className="font-medium">{fileData.name}</p>
                                        <div className="flex">
                                            <p className="text-xs text-gray-500 mr-2">{(fileData.size / 1024).toFixed(2)} KB</p>
                                            {fileData.status === "completed" ? (
                                                <FaCheckCircle className="text-green-500" size={14} />
                                            ) : (
                                                <FaTimes className="text-gray-500 cursor-pointer" size={14} />
                                            )}
                                        </div>
                                    </div>
                                    {!uploadCompleted && (
                                        <button onClick={handleDelete} className="mr-2 mb-2 text-lg cursor-pointer">
                                            <RiDeleteBinLine />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded mt-1">
                                <div
                                    className={`h-1.5 rounded ${fileData.status === "completed" ? "bg-green-500" : "bg-blue-500"}`}
                                    style={{ width: `${fileData.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`mt-4 w-full h-10 py-2 rounded-md transition ${uploadCompleted
                                ? "bg-green-600 text-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            }`}
                        disabled={isUploading || uploadCompleted}
                    >
                        {isUploading ? "Uploading..." : uploadCompleted ? "Completed" : "Submit File"}
                    </button>
                </div>

            )}
            {uploadCompleted && (
                <button
                    onClick={handleUploadAgain}
                    className="mt-2 w-full text-gray-500 cursor-pointer text-sm pt-2 hover:text-gray-700 transition"
                >
                    Upload another file
                </button>
            )}
        </div>
    );
};

export default FileUpload;
