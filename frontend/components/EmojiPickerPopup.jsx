import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { LuImage, LuX } from "react-icons/lu"

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleEmojiSelect = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    };

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            <div
            className='flex items-center gap-4 cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <div className='w-12 h-12 flex items-center justify-center text-2xl'>
                    {
                        icon ? (
                            <img src={icon} alt='Icon' className='w-12 h-12' />
                        ) : (
                            <LuImage />
                        )
                    }
                </div>

                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {
                isOpen && (
                    <div className='relative'>
                        {/* <button onClick={() => setIsOpen(false)} className='w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-full mb-1 cursor-pointer absolute -top-7 right-12 z-50'>
                            <LuX />
                        </button> */}

                        <EmojiPicker
                            open={isOpen}
                            onEmojiClick={handleEmojiSelect}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default EmojiPickerPopup
