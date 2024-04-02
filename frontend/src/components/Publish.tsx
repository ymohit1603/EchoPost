import { useState } from "react";
import { AppBar } from "./AppBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const navigate = useNavigate();
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const postBlog = async () => {
        const response=await axios.post(`${BACKEND_URL}/api/v1/book`, {
            title,
            content:description
        }, { headers: { Authorization: localStorage.getItem('token') } })
           navigate(`/blogs/${response.data.id}`)
    }
    return <div>
        <AppBar></AppBar>
        <div className=" ml-72 mr-72 mt-10 p-10 border border-slate-500 font-medium bg-gray-250 rounded-3xl">
            <div className="w-full flex justify-center ">         
                <div className="w-full mt-3">
                    <div className="mb-2">
                        <input type="text" id="large-input" onChange={(e) => {
                         
                            setTitle(e.target.value);
                        }} className=" text-2xl block w-full p-4 text-gray-900 border border-slate-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Title"/>
                    </div>
                    <div >
                        <textarea id="message" rows={6} onChange={(e) => {
                            setDescription(e.target.value);
                        }} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-slate-300 rounded-lg b focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                <div className="flex justify-end">
                        <button type="submit" onClick={postBlog} className="px-5 py-2.5 mt-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Publish post
                    </button>
                    </div>
                </div>     
            </div>
        </div>
       
    </div>
}