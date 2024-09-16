import { useState, useEffect } from 'react';
import { Search, ChevronDown, Heart, MessageSquare, Bookmark } from 'lucide-react';
import NavBar from './NavBar';
import fetchAllBlogs from '../hooks/fetchAllBlogs';

interface BlogPostTypes {
  id: string;
  title: string;
  content: string;
  author: {
    name:string
  };
  createdAt: string;
  tag: string;
  _count: {
    likes: number;
    comment: number;
  };
}

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPostTypes[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostTypes[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetchAllBlogs();
        setBlogPosts(posts.blogs);
      } catch (error) {
        console.error('Failed to fetch blog posts', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = blogPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === '' || post.tag.includes(selectedTag))
    );
    setFilteredPosts(filtered);
  }, [blogPosts, searchTerm, selectedTag]);

  const uniqueTags = Array.from(new Set(blogPosts.map((post) => post.tag)));

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag,index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredPosts.map((post,index) => (
                <div key={index} className="group">
                  <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`/api/placeholder/800/450?text=${encodeURIComponent(post.title)}`}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Heart size={16} className="mr-1" /> {post._count.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare size={16} className="mr-1" /> {post._count.comment}
                      </span>
                      <Bookmark size={16} className="cursor-pointer hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Load More
            <ChevronDown className="inline-block ml-2" size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;