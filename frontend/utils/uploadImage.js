import axios from "axios";
import { API_BASE_URL } from "./apiPath";

const uploadImage = async (imageFile) => {
    const formData = new FormData(); 

    formData.append('image', imageFile); 

    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            }
        })

        return response.data; 
    } catch (error) {
        console.log("Error while uploading the image", error); 
        throw error; 
    }
}

export default uploadImage