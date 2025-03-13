/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the image state
            setImage(file);

            // Generate preview URL
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Profile Image Preview */}
            <div>
                {image ? (
                    <div className="w-24 h-24 border rounded-full relative">
                        <img
                            src={previewUrl}
                            alt="Profile Preview"
                            className="w-full h-full rounded-full object-cover"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="bg-red-400 p-2 rounded-full absolute -bottom-1 -right-1 z-10"
                        >
                            <LuTrash className="text-2xl text-white" />
                        </button>
                    </div>
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-300 relative">
                        <LuUser className="text-4xl text-primary" />
                        <button
                            onClick={onChooseFile}
                            className="bg-primary p-2 rounded-full absolute -bottom-1 -right-1 z-10"
                        >
                            <LuUpload className="text-2xl text-white" />
                        </button>
                    </div>
                )}
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );
};

export default ProfilePhotoSelector;
