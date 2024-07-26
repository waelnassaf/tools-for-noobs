import React from "react"
import { BsCloudUpload } from "react-icons/bs"

interface FileInputProps {
    onDrop: (files: FileList) => void
    accept?: string
}

const FileInput = ({ onDrop, accept = "" }: FileInputProps) => {
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        if (e.dataTransfer) {
            onDrop(e.dataTransfer.files)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onDrop(e.target.files)
        }
    }

    return (
        <label
            className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <span className="flex items-center space-x-2 text-xl">
                <BsCloudUpload />
                <span className="font-medium text-gray-600">
                    Drop files to Attach, or{" "}
                    <span className="text-blue-600 underline">browse</span>
                </span>
            </span>
            <input
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleFileChange}
            />
        </label>
    )
}

export default FileInput
