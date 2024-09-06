import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blogs{
    "content": string,
    "title": string,
    "id": Int16Array,
    "author": {
        "name":string
    }
}

export const useBlog = ({ id }: { id: string } ) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/book/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response) => {
                setBlog(response.data.blogs);
                setLoading(false);
            })
    }, []);

    return {
        loading,
        blog
    }

}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/book`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response) => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])


    return {
        loading,
        blogs
    }
}