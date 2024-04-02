import { Link } from "react-router-dom"
import { Avatar1 } from "./BlogCard"

export const AppBar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center items-center text-lg font-semibold cursor-pointer">
                Medium
        </Link>
        <div className="flex items-center">
                <Link to={"/publish"}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-4">New</button>
                </Link>
                <Avatar1 />
        </div>
    </div>
}