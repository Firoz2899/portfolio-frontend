// components/Testimonials.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaMountain, FaTree, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const Testimonials = ({ darkMode }) => {
  // Initial testimonials data
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, SummitTech Inc.",
      content: "Alex is an exceptional developer who delivered our project ahead of schedule. His attention to detail and problem-solving skills are outstanding. I highly recommend him for any complex web development project.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager, Forest Solutions",
      content: "Working with Alex was a pleasure. He has a deep understanding of both frontend and backend technologies, which made our project seamless. His communication skills and professionalism are top-notch.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "CTO, Alpine Digital",
      content: "Alex's expertise in React and Node.js transformed our application. He implemented features we thought were impossible and optimized performance beyond our expectations. A true professional.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ]);

  // State for new testimonial
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    position: "",
    content: "",
    rating: 5,
    avatar: ""
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editTestimonial, setEditTestimonial] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input change for new testimonial
  const handleNewTestimonialChange = (field, value) => {
    setNewTestimonial({ ...newTestimonial, [field]: value });
  };

  // Add new testimonial
  const handleAddTestimonial = () => {
    if (newTestimonial.name.trim() !== "" && newTestimonial.content.trim() !== "") {
      const newId = Math.max(0, ...testimonials.map(t => t.id)) + 1;
      
      setTestimonials([
        ...testimonials,
        {
          id: newId,
          name: newTestimonial.name,
          position: newTestimonial.position,
          content: newTestimonial.content,
          rating: newTestimonial.rating,
          avatar: newTestimonial.avatar || `https://via.placeholder.com/500x500?text=${encodeURIComponent(newTestimonial.name.charAt(0))}`
        }
      ]);
      
      // Reset form
      setNewTestimonial({
        name: "",
        position: "",
        content: "",
        rating: 5,
        avatar: ""
      });
    }
  };

  // Start editing a testimonial
  const startEditing = (testimonial) => {
    setEditingId(testimonial.id);
    setEditTestimonial({ ...testimonial });
  };

  // Handle input change for editing testimonial
  const handleEditTestimonialChange = (field, value) => {
    setEditTestimonial({ ...editTestimonial, [field]: value });
  };

  // Save edited testimonial
  const saveEditedTestimonial = () => {
    if (editTestimonial.name.trim() !== "" && editTestimonial.content.trim() !== "") {
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === editingId ? editTestimonial : testimonial
      ));
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTestimonial(null);
  };

  // Delete testimonial
  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
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

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Testimonials Editor</h1>
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
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center">
              <FaSave className="mr-2" /> Changes saved successfully!
            </div>
          )}

          {/* Add New Testimonial Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaPlus className="mr-2" /> Add New Testimonial
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={newTestimonial.name}
                  onChange={(e) => handleNewTestimonialChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter person's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
                <input
                  type="text"
                  value={newTestimonial.position}
                  onChange={(e) => handleNewTestimonialChange('position', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter position and company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                <input
                  type="text"
                  value={newTestimonial.avatar}
                  onChange={(e) => handleNewTestimonialChange('avatar', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter avatar URL (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                <select
                  value={newTestimonial.rating}
                  onChange={(e) => handleNewTestimonialChange('rating', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Testimonial Content</label>
              <textarea
                value={newTestimonial.content}
                onChange={(e) => handleNewTestimonialChange('content', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter testimonial content"
              />
            </div>
            
            <button
              onClick={handleAddTestimonial}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> Add Testimonial
            </button>
          </div>

          {/* Existing Testimonials */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Testimonials</h2>
            
            {testimonials.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No testimonials yet. Add your first testimonial above.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    {editingId === testimonial.id ? (
                      // Edit Mode
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Editing Testimonial</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEditedTestimonial}
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input
                              type="text"
                              value={editTestimonial.name}
                              onChange={(e) => handleEditTestimonialChange('name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
                            <input
                              type="text"
                              value={editTestimonial.position}
                              onChange={(e) => handleEditTestimonialChange('position', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                            <input
                              type="text"
                              value={editTestimonial.avatar}
                              onChange={(e) => handleEditTestimonialChange('avatar', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                            <select
                              value={editTestimonial.rating}
                              onChange={(e) => handleEditTestimonialChange('rating', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                              <option value={1}>1 Star</option>
                              <option value={2}>2 Stars</option>
                              <option value={3}>3 Stars</option>
                              <option value={4}>4 Stars</option>
                              <option value={5}>5 Stars</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Testimonial Content</label>
                            <textarea
                              value={editTestimonial.content}
                              onChange={(e) => handleEditTestimonialChange('content', e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            {editTestimonial.avatar ? (
                              <img 
                                src={editTestimonial.avatar} 
                                alt={editTestimonial.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(editTestimonial.name.charAt(0))}`;
                                }}
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-teal-500 flex items-center justify-center text-gray-500 dark:text-gray-300">
                                {editTestimonial.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="relative group">
                        {/* Top decorative element */}
                        <div className="h-2 bg-gradient-to-r from-teal-500 to-blue-600"></div>
                        
                        <div className="p-6">
                          {/* Quote icon */}
                          <div className="text-teal-500 mb-4">
                            <FaQuoteLeft className="text-3xl opacity-20" />
                          </div>
                          
                          {/* Testimonial content */}
                          <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                            "{testimonial.content}"
                          </p>
                          
                          {/* Star rating */}
                          <div className="flex mb-6">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} 
                              />
                            ))}
                          </div>
                          
                          {/* Person info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name} 
                                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-teal-500"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(testimonial.name.charAt(0))}`;
                                }}
                              />
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                <p className="text-sm text-teal-600 dark:text-teal-400">{testimonial.position}</p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEditing(testimonial)}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => deleteTestimonial(testimonial.id)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
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

export default Testimonials;