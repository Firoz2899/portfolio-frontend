// components/YouTube.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaPlay, FaMountain, FaTree, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const YouTube = ({ darkMode }) => {
  // Initial videos data
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Building Nature-Themed React Applications",
      description: "Learn how to build professional nature-themed applications using React and modern CSS techniques.",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      duration: "24:15",
      views: "15.2K",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "Deep Dive into Node.js Authentication",
      description: "Complete guide to implementing authentication in Node.js using JSON Web Tokens and nature security principles.",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      duration: "32:48",
      views: "8.7K",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: Nature Layouts",
      description: "Understanding the differences between CSS Grid and Flexbox with nature-themed layout examples.",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      duration: "18:32",
      views: "12.4K",
      videoId: "dQw4w9WgXcQ"
    }
  ]);

  // Initial channel info
  const [channelInfo, setChannelInfo] = useState({
    title: "YouTube Channel",
    description: "I share tutorials, coding tips, and insights about web development on my YouTube channel. Subscribe to stay updated with my latest content!",
    subscribeLink: "https://youtube.com"
  });

  // State for new video
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    thumbnail: "",
    duration: "",
    views: "",
    videoId: ""
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editVideo, setEditVideo] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input change for new video
  const handleNewVideoChange = (field, value) => {
    setNewVideo({ ...newVideo, [field]: value });
  };

  // Add new video
  const handleAddVideo = () => {
    if (newVideo.title.trim() !== "" && newVideo.videoId.trim() !== "") {
      const newId = Math.max(0, ...videos.map(v => v.id)) + 1;
      
      setVideos([
        ...videos,
        {
          id: newId,
          title: newVideo.title,
          description: newVideo.description,
          thumbnail: newVideo.thumbnail || `https://via.placeholder.com/500x300?text=${encodeURIComponent(newVideo.title)}`,
          duration: newVideo.duration || "0:00",
          views: newVideo.views || "0",
          videoId: newVideo.videoId
        }
      ]);
      
      // Reset form
      setNewVideo({
        title: "",
        description: "",
        thumbnail: "",
        duration: "",
        views: "",
        videoId: ""
      });
    }
  };

  // Start editing a video
  const startEditing = (video) => {
    setEditingId(video.id);
    setEditVideo({ ...video });
  };

  // Handle input change for editing video
  const handleEditVideoChange = (field, value) => {
    setEditVideo({ ...editVideo, [field]: value });
  };

  // Save edited video
  const saveEditedVideo = () => {
    if (editVideo.title.trim() !== "" && editVideo.videoId.trim() !== "") {
      setVideos(videos.map(video => 
        video.id === editingId ? editVideo : video
      ));
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditVideo(null);
  };

  // Delete video
  const deleteVideo = (id) => {
    setVideos(videos.filter(video => video.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
  };

  // Handle channel info change
  const handleChannelInfoChange = (field, value) => {
    setChannelInfo({ ...channelInfo, [field]: value });
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

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">YouTube Editor</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-75"
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
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center">
              <FaSave className="mr-2" /> Changes saved successfully!
            </div>
          )}

          {/* Channel Info Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400 flex items-center">
              <FaYoutube className="mr-2" /> Channel Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Channel Title</label>
                <input
                  type="text"
                  value={channelInfo.title}
                  onChange={(e) => handleChannelInfoChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter channel title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subscribe Link</label>
                <input
                  type="text"
                  value={channelInfo.subscribeLink}
                  onChange={(e) => handleChannelInfoChange('subscribeLink', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter subscribe link"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Channel Description</label>
                <textarea
                  value={channelInfo.description}
                  onChange={(e) => handleChannelInfoChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter channel description"
                />
              </div>
            </div>
          </div>

          {/* Add New Video Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-red-600 dark:text-red-400 flex items-center">
              <FaPlus className="mr-2" /> Add New Video
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video Title</label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) => handleNewVideoChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter video title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">YouTube Video ID</label>
                <input
                  type="text"
                  value={newVideo.videoId}
                  onChange={(e) => handleNewVideoChange('videoId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter YouTube video ID"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Example: For youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail URL</label>
                <input
                  type="text"
                  value={newVideo.thumbnail}
                  onChange={(e) => handleNewVideoChange('thumbnail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter thumbnail URL (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                <input
                  type="text"
                  value={newVideo.duration}
                  onChange={(e) => handleNewVideoChange('duration', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 24:15"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) => handleNewVideoChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter video description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Views</label>
                <input
                  type="text"
                  value={newVideo.views}
                  onChange={(e) => handleNewVideoChange('views', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 15.2K"
                />
              </div>
            </div>
            
            <button
              onClick={handleAddVideo}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> Add Video
            </button>
          </div>

          {/* Existing Videos */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Videos</h2>
            
            {videos.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No videos yet. Add your first video above.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    {editingId === video.id ? (
                      // Edit Mode
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Editing Video</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEditedVideo}
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video Title</label>
                            <input
                              type="text"
                              value={editVideo.title}
                              onChange={(e) => handleEditVideoChange('title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">YouTube Video ID</label>
                            <input
                              type="text"
                              value={editVideo.videoId}
                              onChange={(e) => handleEditVideoChange('videoId', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail URL</label>
                            <input
                              type="text"
                              value={editVideo.thumbnail}
                              onChange={(e) => handleEditVideoChange('thumbnail', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                            <input
                              type="text"
                              value={editVideo.duration}
                              onChange={(e) => handleEditVideoChange('duration', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Views</label>
                            <input
                              type="text"
                              value={editVideo.views}
                              onChange={(e) => handleEditVideoChange('views', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea
                              value={editVideo.description}
                              onChange={(e) => handleEditVideoChange('description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                            {editVideo.thumbnail ? (
                              <img 
                                src={editVideo.thumbnail} 
                                alt={editVideo.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://via.placeholder.com/500x300?text=${encodeURIComponent(editVideo.title)}`;
                                }}
                              />
                            ) : (
                              <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
                                <FaYoutube className="text-3xl mb-2" />
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
                        <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-600"></div>
                        
                        <div className="relative">
                          <div className="h-32 overflow-hidden">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/500x300?text=${encodeURIComponent(video.title)}`;
                              }}
                            />
                          </div>
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                              <FaPlay className="text-white text-lg ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          
                          {/* Edit and delete buttons */}
                          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(video)}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteVideo(video.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{video.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{video.description}</p>
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>{video.views} views</span>
                            <span>2 days ago</span>
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
    </div>
  );
};

export default YouTube;