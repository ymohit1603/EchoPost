import axios from "axios";
import {BlogPostType } from "../pages/Publish";


const PublishBlog = async (data:BlogPostType) => {
    try {
        await axios.post(`${process.env.BACKEND_URL}/api/v1/book`,data)
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export default PublishBlog;