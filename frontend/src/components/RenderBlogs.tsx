import  { useState, useEffect } from 'react';
import { Search, ChevronDown, Heart, MessageSquare, Bookmark } from 'lucide-react';
import NavBar from './NavBar';

// Mock data
const tags = ['Technology', 'Design', 'Programming', 'AI', 'Web Development', 'Data Science', 'UX/UI', 'Mobile Dev'];
const blogPosts = [
  { id: 1, title: 'Getting Started with React', excerpt: 'Learn the basics of React and start building your first app...', author: 'Jane Doe', date: '2024-09-01', readTime: '5 min read', tags: ['React', 'JavaScript'], likes: 120, comments: 15 },
  { id: 2, title: 'The Future of AI', excerpt: 'Exploring the potential impacts of artificial intelligence on various industries...', author: 'John Smith', date: '2024-08-28', readTime: '8 min read', tags: ['AI', 'Technology'], likes: 89, comments: 23 },
  { id: 3, title: 'Mastering CSS Grid', excerpt: 'A comprehensive guide to using CSS Grid for modern web layouts...', author: 'Emily Chen', date: '2024-08-25', readTime: '6 min read', tags: ['CSS', 'Web Development'], likes: 56, comments: 8 },
  { id: 4, title: 'The Rise of No-Code Platforms', excerpt: 'Discover how no-code platforms are democratizing software development...', author: 'Alex Johnson', date: '2024-08-22', readTime: '7 min read', tags: ['No-Code', 'Technology'], likes: 72, comments: 11 },
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    const filtered = blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === '' || post.tags.includes(selectedTag))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag]);

  return (
    <div className="min-h-screen bg-white">
        <NavBar></NavBar>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">Explore Our Blog</h1> */}
        
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
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      
        {filteredPosts.length > 0 && (
          <div className="mb-16 group">
            <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-100 rounded-lg overflow-hidden">
              <img src="/api/placeholder/1600/900" alt="Featured post" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">{filteredPosts[0].title}</h2>
            <p className="text-gray-600 mb-4">{filteredPosts[0].excerpt}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{filteredPosts[0].author}</span>
              <span className="mx-2">•</span>
              <span>{filteredPosts[0].date}</span>
              <span className="mx-2">•</span>
              <span>{filteredPosts[0].readTime}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post) => (
            <div key={post.id} className="group">
              <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img src={`/api/placeholder/800/450?text=${encodeURIComponent(post.title)}`} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author} • {post.date}</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center"><Heart size={16} className="mr-1" /> {post.likes}</span>
                  <span className="flex items-center"><MessageSquare size={16} className="mr-1" /> {post.comments}</span>
                  <Bookmark size={16} className="cursor-pointer hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

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