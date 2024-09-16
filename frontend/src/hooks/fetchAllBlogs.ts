import axios from "axios";

const fetchAllBlogs = async () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(BACKEND_URL);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/book`);
      console.log(response);
      return response.data; 
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

export default fetchAllBlogs;