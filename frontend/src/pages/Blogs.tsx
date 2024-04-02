import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    return <div>
        <AppBar />      
    <div className="flex justify-center">
        <div className="">
        {loading ? (
                <p>Loading...</p>
            ) : (
                blogs.map((blog) => (
                    <BlogCard
                        authorName={blog.author.name || ""}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"published date"}
                    />
                ))
            )}
        </div>
    </div>
</div>
}