// components/Playlist.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, FaTimes, FaPlus, FaTrash, FaEdit, FaArrowLeft, FaMusic, FaList, FaInfoCircle, FaClock, FaUser
} from 'react-icons/fa';

const Playlist = ({ darkMode, onSave, onCancel, initialData }) => {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: "Design Inspiration",
      description: "Curated collection of design talks, tutorials, and case studies that inspire my creative process.",
      itemCount: 24,
      category: "design",
      tracks: [
        { id: 1, title: "The Principles of Good Design", duration: "15:30", artist: "Design Weekly" },
        { id: 2, title: "Color Theory for Digital Products", duration: "22:15", artist: "UI/UX Masters" },
        { id: 3, title: "Minimalism in Modern Design", duration: "18:45", artist: "Design Insights" }
      ]
    },
    {
      id: 2,
      title: "Development Resources",
      description: "Technical tutorials, coding challenges, and best practices for modern web development.",
      itemCount: 18,
      category: "development",
      tracks: [
        { id: 4, title: "JavaScript Best Practices", duration: "25:10", artist: "Code Daily" },
        { id: 5, title: "React Performance Optimization", duration: "30:22", artist: "Frontend Masters" },
        { id: 6, title: "CSS Grid and Flexbox", duration: "20:45", artist: "Web Dev Weekly" }
      ]
    }
  ]);

  const [pageInfo, setPageInfo] = useState({
    title: "Playlists",
    subtitle: "Inspiration Audio Collection",
    description: "Listen to curated audio content from my playlists. Perfect for learning and inspiration on the go."
  });

  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [newTrack, setNewTrack] = useState({
    title: "",
    duration: "",
    artist: ""
  });

  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [editingTrackId, setEditingTrackId] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const categoryOptions = [
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "creative", label: "Creative" },
    { value: "trends", label: "Trends" },
    { value: "motivation", label: "Motivation" },
    { value: "business", label: "Business" }
  ];

  useEffect(() => {
    if (initialData) {
      setPlaylists(initialData.playlists || playlists);
      setPageInfo(initialData.pageInfo || pageInfo);
    }
  }, [initialData]);

  const handlePageInfoChange = (e) => {
    const { name, value } = e.target;
    setPageInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaylistChange = (id, field, value) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === id ? { ...playlist, [field]: value } : playlist
      )
    );
  };

  const handleTrackChange = (playlistId, trackId, field, value) => {
    setPlaylists(prev => 
      prev.map(playlist => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            tracks: playlist.tracks.map(track => 
              track.id === trackId ? { ...track, [field]: value } : track
            )
          };
        }
        return playlist;
      })
    );
  };

  const handleNewPlaylistChange = (field, value) => {
    setNewPlaylist(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewTrackChange = (field, value) => {
    setNewTrack(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addPlaylist = () => {
    if (newPlaylist.title && newPlaylist.category) {
      const newId = playlists.length > 0 
        ? Math.max(...playlists.map(p => p.id)) + 1 
        : 1;
      
      setPlaylists([
        ...playlists,
        {
          id: newId,
          title: newPlaylist.title,
          description: newPlaylist.description,
          category: newPlaylist.category,
          itemCount: 0,
          tracks: []
        }
      ]);
      
      setNewPlaylist({
        title: "",
        description: "",
        category: ""
      });
    }
  };

  const addTrack = () => {
    if (selectedPlaylistId && newTrack.title && newTrack.artist) {
      const playlist = playlists.find(p => p.id === selectedPlaylistId);
      if (playlist) {
        const newTrackId = playlist.tracks.length > 0 
          ? Math.max(...playlist.tracks.map(t => t.id)) + 1 
          : 1;
        
        setPlaylists(prev => 
          prev.map(p => {
            if (p.id === selectedPlaylistId) {
              return {
                ...p,
                itemCount: p.itemCount + 1,
                tracks: [
                  ...p.tracks,
                  {
                    id: newTrackId,
                    title: newTrack.title,
                    duration: newTrack.duration,
                    artist: newTrack.artist
                  }
                ]
              };
            }
            return p;
          })
        );
        
        setNewTrack({
          title: "",
          duration: "",
          artist: ""
        });
      }
    }
  };

  const deletePlaylist = (id) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== id));
    if (editingPlaylistId === id) {
      setEditingPlaylistId(null);
    }
    if (selectedPlaylistId === id) {
      setSelectedPlaylistId(null);
    }
  };

  const deleteTrack = (playlistId, trackId) => {
    setPlaylists(prev => 
      prev.map(playlist => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            itemCount: Math.max(0, playlist.itemCount - 1),
            tracks: playlist.tracks.filter(track => track.id !== trackId)
          };
        }
        return playlist;
      })
    );
    
    if (editingTrackId === trackId) {
      setEditingTrackId(null);
    }
  };

  const startEditingPlaylist = (id) => {
    setEditingPlaylistId(id);
    setEditingTrackId(null);
  };

  const startEditingTrack = (playlistId, trackId) => {
    setEditingTrackId(trackId);
    setEditingPlaylistId(null);
  };

  const stopEditing = () => {
    setEditingPlaylistId(null);
    setEditingTrackId(null);
  };

  const handleSave = () => {
    const data = {
      playlists,
      pageInfo
    };
    onSave(data);
  };

  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900 dark:to-blue-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={onCancel}
                    className="mr-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <FaArrowLeft />
                  </button>
                  <h2 className="text-2xl font-bold font-playfair">Edit Playlists</h2>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={onCancel}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center transition-colors"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-white text-teal-600 hover:bg-teal-50 rounded-lg flex items-center font-medium transition-colors"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Page Info Section */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4 font-playfair text-gray-900 dark:text-white">Page Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Page Title</label>
                    <input
                      type="text"
                      name="title"
                      value={pageInfo.title}
                      onChange={handlePageInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Subtitle</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={pageInfo.subtitle}
                      onChange={handlePageInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={pageInfo.description}
                      onChange={handlePageInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Playlists Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold font-playfair text-gray-900 dark:text-white">Playlists</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
                      {playlists.length} playlists
                    </span>
                  </div>
                  
                  {/* Add New Playlist */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                    <h4 className="font-medium mb-3 font-poppins text-gray-900 dark:text-white">Add New Playlist</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins flex items-center">
                          <FaList className="mr-2 text-teal-500" /> Title
                        </label>
                        <input
                          type="text"
                          value={newPlaylist.title}
                          onChange={(e) => handleNewPlaylistChange('title', e.target.value)}
                          placeholder="Playlist title"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins flex items-center">
                          <FaInfoCircle className="mr-2 text-teal-500" /> Description
                        </label>
                        <textarea
                          value={newPlaylist.description}
                          onChange={(e) => handleNewPlaylistChange('description', e.target.value)}
                          placeholder="Playlist description"
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins resize-none text-gray-900 dark:text-white"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Category</label>
                        <select
                          value={newPlaylist.category}
                          onChange={(e) => handleNewPlaylistChange('category', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                        >
                          <option value="">Select a category</option>
                          {categoryOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={addPlaylist}
                          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium font-poppins flex items-center"
                        >
                          <FaPlus className="mr-2" /> Add Playlist
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Existing Playlists */}
                  <div className="space-y-4">
                    {playlists.map(playlist => (
                      <div key={playlist.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                        {editingPlaylistId === playlist.id ? (
                          <div className="p-5">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Title</label>
                                <input
                                  type="text"
                                  value={playlist.title}
                                  onChange={(e) => handlePlaylistChange(playlist.id, 'title', e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Description</label>
                                <textarea
                                  value={playlist.description}
                                  onChange={(e) => handlePlaylistChange(playlist.id, 'description', e.target.value)}
                                  rows="2"
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins resize-none text-gray-900 dark:text-white"
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Category</label>
                                <select
                                  value={playlist.category}
                                  onChange={(e) => handlePlaylistChange(playlist.id, 'category', e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                                >
                                  {categoryOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex space-x-3 pt-2">
                                <button
                                  onClick={stopEditing}
                                  className="flex-1 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium font-poppins"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={stopEditing}
                                  className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium font-poppins"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-lg font-bold font-poppins text-gray-900 dark:text-white">{playlist.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-poppins">{playlist.description}</p>
                                <div className="mt-2 flex items-center">
                                  <span className="inline-block px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs rounded-full font-poppins">
                                    {categoryOptions.find(c => c.value === playlist.category)?.label}
                                  </span>
                                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-poppins">
                                    {playlist.itemCount} tracks
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => startEditingPlaylist(playlist.id)}
                                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                                >
                                  <FaEdit className="text-gray-600 dark:text-gray-300" />
                                </button>
                                <button
                                  onClick={() => deletePlaylist(playlist.id)}
                                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                                >
                                  <FaTrash className="text-red-600 dark:text-red-400" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedPlaylistId(playlist.id)}
                              className={`w-full py-2 rounded-lg font-medium font-poppins text-sm ${selectedPlaylistId === playlist.id ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'}`}
                            >
                              Manage Tracks
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {playlists.length === 0 && (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <FaMusic className="text-4xl text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 font-poppins">No playlists added yet</p>
                    </div>
                  )}
                </div>
                
                {/* Tracks Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold font-playfair text-gray-900 dark:text-white">Tracks</h3>
                    {selectedPlaylist && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
                        {selectedPlaylist.title} • {selectedPlaylist.tracks.length} tracks
                      </span>
                    )}
                  </div>
                  
                  {selectedPlaylist ? (
                    <>
                      {/* Add New Track */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                        <h4 className="font-medium mb-3 font-poppins text-gray-900 dark:text-white">Add New Track to "{selectedPlaylist.title}"</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins flex items-center">
                              <FaMusic className="mr-2 text-teal-500" /> Title
                            </label>
                            <input
                              type="text"
                              value={newTrack.title}
                              onChange={(e) => handleNewTrackChange('title', e.target.value)}
                              placeholder="Track title"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins flex items-center">
                                <FaClock className="mr-2 text-teal-500" /> Duration
                              </label>
                              <input
                                type="text"
                                value={newTrack.duration}
                                onChange={(e) => handleNewTrackChange('duration', e.target.value)}
                                placeholder="e.g. 15:30"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins flex items-center">
                                <FaUser className="mr-2 text-teal-500" /> Artist
                              </label>
                              <input
                                type="text"
                                value={newTrack.artist}
                                onChange={(e) => handleNewTrackChange('artist', e.target.value)}
                                placeholder="Artist name"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={addTrack}
                              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium font-poppins flex items-center"
                            >
                              <FaPlus className="mr-2" /> Add Track
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Existing Tracks */}
                      <div className="space-y-4">
                        {selectedPlaylist.tracks.map(track => (
                          <div key={track.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                            {editingTrackId === track.id ? (
                              <div className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="md:col-span-2">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Title</label>
                                    <input
                                      type="text"
                                      value={track.title}
                                      onChange={(e) => handleTrackChange(selectedPlaylist.id, track.id, 'title', e.target.value)}
                                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Duration</label>
                                    <input
                                      type="text"
                                      value={track.duration}
                                      onChange={(e) => handleTrackChange(selectedPlaylist.id, track.id, 'duration', e.target.value)}
                                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                                    />
                                  </div>
                                  <div className="md:col-span-2">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-poppins">Artist</label>
                                    <input
                                      type="text"
                                      value={track.artist}
                                      onChange={(e) => handleTrackChange(selectedPlaylist.id, track.id, 'artist', e.target.value)}
                                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                                    />
                                  </div>
                                  <div className="flex items-end space-x-2">
                                    <button
                                      onClick={stopEditing}
                                      className="flex-1 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium font-poppins"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={stopEditing}
                                      className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium font-poppins"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-5">
                                <div className="flex justify-between items-center">
                                  <div className="flex-1">
                                    <h4 className="font-medium font-poppins text-gray-900 dark:text-white">{track.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-poppins">{track.artist} • {track.duration}</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => startEditingTrack(selectedPlaylist.id, track.id)}
                                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                                    >
                                      <FaEdit className="text-gray-600 dark:text-gray-300" />
                                    </button>
                                    <button
                                      onClick={() => deleteTrack(selectedPlaylist.id, track.id)}
                                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                                    >
                                      <FaTrash className="text-red-600 dark:text-red-400" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {selectedPlaylist.tracks.length === 0 && (
                        <div className="text-center py-10 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <FaMusic className="text-4xl text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 dark:text-gray-400 font-poppins">No tracks added yet</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <FaMusic className="text-4xl text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 font-poppins">Select a playlist to manage its tracks</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;