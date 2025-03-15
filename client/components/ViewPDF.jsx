import React from "react";
import { useParams, Link } from "react-router-dom";

const server = import.meta.env.VITE_SERVER_URL;

const ViewPDF = () => {
    const { filename } = useParams();
    const pdfUrl = `${server}/view/${filename}`;

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text font-medium">Viewing: {filename}</h1>
                    <Link to="/files" className="text-blue-600 hover:underline">Back to Files</Link>
                </div>
                <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                    className="w-full h-[600px] border"
                ></iframe>
            </div>
        </div>
    );
};

export default ViewPDF;
