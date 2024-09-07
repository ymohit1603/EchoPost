import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, MessageSquare, Bookmark, Share2, ChevronLeft } from 'lucide-react';

// Define types
interface BlogPost {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  likes: number;
  comments: number;
}

// Mock data
const blogPost: BlogPost = {
  id: 1,
  title: 'The Future of Artificial Intelligence',
  author: 'Dr. Jane Smith',
  authorAvatar: '/api/placeholder/100/100',
  date: 'September 15, 2024',
  readTime: '10 min read',
  tags: ['AI', 'Technology', 'Future'],
  content: `
    <p>Artificial Intelligence (AI) has been a buzzword in the tech industry for years, but recent advancements are pushing it into realms once thought to be the exclusive domain of human intelligence. As we stand on the brink of a new era, it's crucial to understand the potential impacts and challenges that lie ahead.</p>

    <h2>The Current State of AI</h2>
    <p>Today's AI systems are capable of performing tasks that were once considered impossible for machines. From natural language processing to computer vision, AI is transforming industries and reshaping our daily lives. However, we're still far from achieving Artificial General Intelligence (AGI) - AI that can perform any intellectual task that a human can.</p>

    <h2>Potential Impacts</h2>
    <ul>
      <li><strong>Healthcare:</strong> AI is already being used to diagnose diseases and develop new treatments. In the future, we might see AI-powered personalized medicine becoming the norm.</li>
      <li><strong>Education:</strong> Adaptive learning systems could revolutionize education, providing personalized learning experiences for students of all ages.</li>
      <li><strong>Work:</strong> While AI will undoubtedly automate many jobs, it's also likely to create new types of jobs that we can't even imagine yet.</li>
    </ul>

    <h2>Ethical Considerations</h2>
    <p>As AI becomes more advanced, we must grapple with complex ethical questions. How do we ensure AI systems are fair and unbiased? How do we protect privacy in a world of intelligent systems? These are challenges that will require collaboration between technologists, ethicists, and policymakers.</p>

    <h2>The Road Ahead</h2>
    <p>The future of AI is both exciting and uncertain. As we continue to push the boundaries of what's possible, it's crucial that we do so responsibly, always keeping in mind the potential impacts on society and individuals. The choices we make today will shape the AI-driven world of tomorrow.</p>
  `,
  likes: 1024,
  comments: 128,
};

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    // In a real application, you would fetch the post data based on the id
    // For this example, we'll just use our mock data
    setPost(blogPost);
  }, [id]);

  if (!post) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link to="/blogs" className="flex items-center text-gray-900 hover:text-blue-500 transition-colors">
            <ChevronLeft className="mr-2" size={20} />
            <span>Back to Blog</span>
          </Link>
          <span className="text-2xl font-bold text-gray-900">ModernBlog</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center mb-4">
            <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">{post.date} • {post.readTime}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-w-16 aspect-h-9 mb-8 bg-gray-100 rounded-lg overflow-hidden">
          <img src="/api/placeholder/1200/675" alt="Featured" className="object-cover w-full h-full" />
        </div>

        {/* Post Content */}
        <article className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Interaction Bar */}
        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <button 
              className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className="mr-2" size={20} />
              <span>{isLiked ? post.likes + 1 : post.likes}</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
              <MessageSquare className="mr-2" size={20} />
              <span>{post.comments}</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className={`${isBookmarked ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-500 transition-colors`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark size={20} />
            </button>
            <button className="text-gray-500 hover:text-blue-500 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Comments Section (placeholder) */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>
          <p className="text-gray-600">Comments section coming soon...</p>
        </section>
      </main>
    </div>
  );
};

export default BlogPostPage;