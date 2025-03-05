import React, { useState } from 'react'

const useImageUpload = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUploadedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return { handleImageUpload, uploadedImage }
}

export default useImageUpload