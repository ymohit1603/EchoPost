import axios from "axios";


const fetchAllBlogs = async () => {
    try {
      const response = await axios.get('/api/v1/book/');
      return response.data; 
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

export default fetchAllBlogs;