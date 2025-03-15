import React from 'react'
import { Link } from 'react-router-dom'
import FileUpload from '../components/FileUpload'

const UploadFiles = () => {
    return (
        <div className="h-screen realtive w-full flex items-center justify-center bg-blue-100">
            <Link to="/files" className='absolute top-5 right-10'>Check files</Link>
            <FileUpload />
        </div>
    )
}

export default UploadFiles