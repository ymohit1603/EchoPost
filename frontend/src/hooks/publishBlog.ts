import axios from "axios";
import {BlogPostType } from "../pages/Publish";


const PublishBlog = async (data: BlogPostType) => {
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/book`, data)
        return response.data;
        
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export default PublishBlog;