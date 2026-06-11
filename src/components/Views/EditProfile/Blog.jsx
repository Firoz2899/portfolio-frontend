// components/Blog.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaComment, FaArrowRight, FaMountain, FaTree, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const Blog = ({ darkMode }) => {
  // Initial blog posts data
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Building Nature-Themed Web Applications",
      excerpt: "Learn how to create immersive nature-themed web applications with modern technologies and design principles.",
      date: "May 15, 2023",
      author: "Alex Johnson",
      comments: 24,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Web Development"
    },
    {
      id: 2,
      title: "The Future of Mountain Technology",
      excerpt: "Exploring emerging technologies and trends that will shape the future of mountain conservation and research.",
      date: "Apr 28, 2023",
      author: "Alex Johnson",
      comments: 18,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Technology"
    },
    {
      id: 3,
      title: "Deep Dive into CSS Grid Layout",
      excerpt: "A comprehensive guide to CSS Grid Layout with practical examples and use cases for modern web design.",
      date: "Apr 10, 2023",
      author: "Alex Johnson",
      comments: 32,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "CSS"
    },
    {
      id: 4,
      title: "Introduction to TypeScript for Forest Developers",
      excerpt: "Learn how TypeScript can improve your JavaScript development experience with static typing and better tooling.",
      date: "Mar 22, 2023",
      author: "Alex Johnson",
      comments: 15,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "JavaScript"
    }
  ]);

  // State for new blog post
  const [newBlogPost, setNewBlogPost] = useState({
    title: "",
    excerpt: "",
    date: "",
    author: "",
    comments: 0,
    image: "",
    category: ""
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editBlogPost, setEditBlogPost] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input change for new blog post
  const handleNewBlogPostChange = (field, value) => {
    setNewBlogPost({ ...newBlogPost, [field]: value });
  };

  // Add new blog post
  const handleAddBlogPost = () => {
    if (newBlogPost.title.trim() !== "" && newBlogPost.excerpt.trim() !== "") {
      const newId = Math.max(0, ...blogPosts.map(p => p.id)) + 1;
      
      setBlogPosts([
        ...blogPosts,
        {
          id: newId,
          title: newBlogPost.title,
          excerpt: newBlogPost.excerpt,
          date: newBlogPost.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          author: newBlogPost.author || "Alex Johnson",
          comments: newBlogPost.comments || 0,
          image: newBlogPost.image || `https://via.placeholder.com/500x300?text=${encodeURIComponent(newBlogPost.title)}`,
          category: newBlogPost.category || "General"
        }
      ]);
      
      // Reset form
      setNewBlogPost({
        title: "",
        excerpt: "",
        date: "",
        author: "",
        comments: 0,
        image: "",
        category: ""
      });
    }
  };

  // Start editing a blog post
  const startEditing = (post) => {
    setEditingId(post.id);
    setEditBlogPost({ ...post });
  };

  // Handle input change for editing blog post
  const handleEditBlogPostChange = (field, value) => {
    setEditBlogPost({ ...editBlogPost, [field]: value });
  };

  // Save edited blog post
  const saveEditedBlogPost = () => {
    if (editBlogPost.title.trim() !== "" && editBlogPost.excerpt.trim() !== "") {
      setBlogPosts(blogPosts.map(post => 
        post.id === editingId ? editBlogPost : post
      ));
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditBlogPost(null);
  };

  // Delete blog post
  const deleteBlogPost = (id) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
  };

  // Save all changes
  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  // Theme classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const textClass = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-700';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const categoryBgClass = darkMode ? 'bg-teal-900' : 'bg-teal-100';
  const categoryTextClass = darkMode ? 'text-teal-200' : 'text-teal-800';
  const successBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const successTextClass = darkMode ? 'text-green-200' : 'text-green-700';
  const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Blog Editor</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-75"
          >
            {saving ? (
              <>Saving...</>
            ) : (
              <>
                <FaSave className="mr-2" /> Save Changes
              </>
            )}
          </button>
        </div>

        {saveSuccess && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${successBgClass} ${successTextClass}`}>
            <FaSave className="mr-2" /> Changes saved successfully!
          </div>
        )}

        {/* Add New Blog Post Form */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
            <FaPlus className="mr-2" /> Add New Blog Post
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Title</label>
              <input
                type="text"
                value={newBlogPost.title}
                onChange={(e) => handleNewBlogPostChange('title', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter blog post title"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Category</label>
              <input
                type="text"
                value={newBlogPost.category}
                onChange={(e) => handleNewBlogPostChange('category', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter category"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Author</label>
              <input
                type="text"
                value={newBlogPost.author}
                onChange={(e) => handleNewBlogPostChange('author', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter author name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Date</label>
              <input
                type="text"
                value={newBlogPost.date}
                onChange={(e) => handleNewBlogPostChange('date', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="e.g., May 15, 2023"
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Excerpt</label>
              <textarea
                value={newBlogPost.excerpt}
                onChange={(e) => handleNewBlogPostChange('excerpt', e.target.value)}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter blog post excerpt"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
              <input
                type="text"
                value={newBlogPost.image}
                onChange={(e) => handleNewBlogPostChange('image', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter image URL (optional)"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Comments Count</label>
              <input
                type="number"
                min="0"
                value={newBlogPost.comments}
                onChange={(e) => handleNewBlogPostChange('comments', parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Number of comments"
              />
            </div>
          </div>
          
          <button
            onClick={handleAddBlogPost}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" /> Add Blog Post
          </button>
        </div>

        {/* Existing Blog Posts */}
        <div className="space-y-8">
          <h2 className={`text-2xl font-semibold ${textClass}`}>Your Blog Posts</h2>
          
          {blogPosts.length === 0 ? (
            <div className={`text-center py-8 ${textMutedClass}`}>
              No blog posts yet. Add your first blog post above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <div key={post.id} className={`rounded-2xl border shadow-sm overflow-hidden ${cardBgClass} ${borderClass}`}>
                  {editingId === post.id ? (
                    // Edit Mode
                    <div className={`p-6 ${darkMode ? 'bg-gray-800' : ''}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-lg font-semibold ${textClass}`}>Editing Blog Post</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEditedBlogPost}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Title</label>
                          <input
                            type="text"
                            value={editBlogPost.title}
                            onChange={(e) => handleEditBlogPostChange('title', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Category</label>
                          <input
                            type="text"
                            value={editBlogPost.category}
                            onChange={(e) => handleEditBlogPostChange('category', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Author</label>
                          <input
                            type="text"
                            value={editBlogPost.author}
                            onChange={(e) => handleEditBlogPostChange('author', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Date</label>
                          <input
                            type="text"
                            value={editBlogPost.date}
                            onChange={(e) => handleEditBlogPostChange('date', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Excerpt</label>
                          <textarea
                            value={editBlogPost.excerpt}
                            onChange={(e) => handleEditBlogPostChange('excerpt', e.target.value)}
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
                          <input
                            type="text"
                            value={editBlogPost.image}
                            onChange={(e) => handleEditBlogPostChange('image', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Comments Count</label>
                          <input
                            type="number"
                            min="0"
                            value={editBlogPost.comments}
                            onChange={(e) => handleEditBlogPostChange('comments', parseInt(e.target.value) || 0)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                          {editBlogPost.image ? (
                            <img 
                              src={editBlogPost.image} 
                              alt={editBlogPost.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/500x300?text=${encodeURIComponent(editBlogPost.title)}`;
                              }}
                            />
                          ) : (
                            <div className={`flex flex-col items-center ${textMutedClass}`}>
                              <FaMountain className="text-3xl mb-2" />
                              <span>Preview</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="group">
                      {/* Top accent bar */}
                      <div className="h-1.5 bg-gradient-to-r from-teal-500 to-blue-600"></div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className={`flex items-center text-xs ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                            <span className={`px-2 py-1 rounded ${categoryBgClass} ${categoryTextClass}`}>
                              {post.category}
                            </span>
                            <span className="mx-2">•</span>
                            <FaCalendarAlt className="mr-1" />
                            <span>{post.date}</span>
                          </div>
                          
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(post)}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteBlogPost(post.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-2 ${textClass}`}>{post.title}</h3>
                        
                        <div className="h-32 overflow-hidden rounded-lg mb-3">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://via.placeholder.com/500x300?text=${encodeURIComponent(post.title)}`;
                            }}
                          />
                        </div>
                        
                        <p className={`text-sm mb-3 ${textSecondaryClass}`}>{post.excerpt}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className={`flex items-center text-xs ${textMutedClass}`}>
                            <FaUser className="mr-1" />
                            <span>{post.author}</span>
                            <span className="mx-2">•</span>
                            <FaComment className="mr-1" />
                            <span>{post.comments}</span>
                          </div>
                          
                          <a 
                            href={`/blog/${post.id}`} 
                            className={`flex items-center text-sm hover:underline ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}
                          >
                            Read More <FaArrowRight className="ml-1 text-xs" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;