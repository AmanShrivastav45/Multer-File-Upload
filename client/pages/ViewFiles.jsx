import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const server = import.meta.env.VITE_SERVER_URL;

const ViewFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${server}/files`);
        setFiles(response.data);
      } catch (err) {
        setError("Failed to fetch files.");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-100 p-6">
      <Link to="/" className='absolute top-5 right-12 text-sm'>
        Upload Files
      </Link>
      <h1 className="font-medium mb-4">Uploaded Files</h1>

      {loading ? (
        <p>Loading files...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="w-full max-w-lg bg-white shadow-md rounded-md p-4">
          {files.map((file) => (
            <li key={file._id} className="border-b last:border-none py-2 flex justify-between items-center">
              <span>{file.filename}</span>
              <Link to={`/view/${file.filename}`} className="text-blue-600 hover:underline text-sm">
                View PDF
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFiles;
