// components/Gallery.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes, FaEdit, FaImage } from 'react-icons/fa';

const Gallery = ({ darkMode }) => {
  // Initial gallery data
  const [galleryItems, setGalleryItems] = useState([
    { 
      id: 1, 
      title: 'Mountain Adventure',
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 2, 
      title: 'Nature Photography',
      imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 3, 
      title: 'Digital Artwork',
      imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 4, 
      title: 'Brand Identity',
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 5, 
      title: 'Urban Exploration',
      imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 6, 
      title: 'Abstract Compositions',
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 7, 
      title: 'Web Interfaces',
      imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 8, 
      title: 'Portrait Series',
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    },
    { 
      id: 9, 
      title: 'Illustration Works',
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
    }
  ]);

  // Initial text content
  const [textContent, setTextContent] = useState({
    title: "Visual Journey",
    paragraphs: [
      "Welcome to my visual gallery, where each image tells a unique story. This collection represents my journey through different creative mediums, from nature photography to digital artwork and design projects.",
      "Each photograph and artwork in this gallery captures a moment of inspiration, a glimpse into my creative process, or a solution to a design challenge. They reflect my passion for visual storytelling and my commitment to capturing beauty in both natural and digital environments.",
      "Browse through the carousel to explore my work. The gallery features a diverse range of styles and subjects, showcasing my versatility as a creator and my ability to adapt to different visual languages."
    ],
    highlights: [
      "Nature photography capturing breathtaking landscapes",
      "Digital artwork exploring abstract concepts",
      "Brand identity designs for various clients",
      "Urban exploration photography",
      "Web interface designs and prototypes"
    ],
    buttonText: "View Full Portfolio"
  });

  // State for new image
  const [newImage, setNewImage] = useState({ title: "", imageUrl: "" });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input change for new image
  const handleNewImageChange = (field, value) => {
    setNewImage({ ...newImage, [field]: value });
  };

  // Add new image
  const handleAddImage = () => {
    if (newImage.title.trim() !== "" && newImage.imageUrl.trim() !== "") {
      const newId = Math.max(0, ...galleryItems.map(item => item.id)) + 1;
      setGalleryItems([
        ...galleryItems,
        {
          id: newId,
          title: newImage.title,
          imageUrl: newImage.imageUrl
        }
      ]);
      
      // Reset form
      setNewImage({ title: "", imageUrl: "" });
    }
  };

  // Start editing an image
  const startEditing = (image) => {
    setEditingId(image.id);
    setEditImage({ ...image });
  };

  // Handle input change for editing image
  const handleEditImageChange = (field, value) => {
    setEditImage({ ...editImage, [field]: value });
  };

  // Save edited image
  const saveEditedImage = () => {
    if (editImage.title.trim() !== "" && editImage.imageUrl.trim() !== "") {
      setGalleryItems(galleryItems.map(item => 
        item.id === editingId ? editImage : item
      ));
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditImage(null);
  };

  // Delete image
  const deleteImage = (id) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
  };

  // Handle text content change
  const handleTextContentChange = (field, value) => {
    setTextContent({ ...textContent, [field]: value });
  };

  // Handle paragraph change
  const handleParagraphChange = (index, value) => {
    const updatedParagraphs = [...textContent.paragraphs];
    updatedParagraphs[index] = value;
    setTextContent({ ...textContent, paragraphs: updatedParagraphs });
  };

  // Handle highlight change
  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...textContent.highlights];
    updatedHighlights[index] = value;
    setTextContent({ ...textContent, highlights: updatedHighlights });
  };

  // Add new paragraph
  const addParagraph = () => {
    setTextContent({
      ...textContent,
      paragraphs: [...textContent.paragraphs, ""]
    });
  };

  // Remove paragraph
  const removeParagraph = (index) => {
    if (textContent.paragraphs.length > 1) {
      const updatedParagraphs = [...textContent.paragraphs];
      updatedParagraphs.splice(index, 1);
      setTextContent({ ...textContent, paragraphs: updatedParagraphs });
    }
  };

  // Add new highlight
  const addHighlight = () => {
    setTextContent({
      ...textContent,
      highlights: [...textContent.highlights, ""]
    });
  };

  // Remove highlight
  const removeHighlight = (index) => {
    if (textContent.highlights.length > 1) {
      const updatedHighlights = [...textContent.highlights];
      updatedHighlights.splice(index, 1);
      setTextContent({ ...textContent, highlights: updatedHighlights });
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
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const tealTextClass = darkMode ? 'text-teal-400' : 'text-teal-600';
  const tealHoverClass = darkMode ? 'hover:text-teal-300' : 'hover:text-teal-800';
  const redTextClass = darkMode ? 'text-red-400' : 'text-red-500';
  const redHoverClass = darkMode ? 'hover:text-red-300' : 'hover:text-red-700';
  const successBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const successTextClass = darkMode ? 'text-green-200' : 'text-green-700';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Gallery Editor</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Gallery Items */}
          <div>
            <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
              <h2 className={`text-2xl font-semibold mb-6 flex items-center ${tealTextClass}`}>
                <FaPlus className="mr-2" /> Add New Image
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image Title</label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) => handleNewImageChange('title', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Enter image title"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
                  <input
                    type="text"
                    value={newImage.imageUrl}
                    onChange={(e) => handleNewImageChange('imageUrl', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAddImage}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Image
              </button>
            </div>

            <div className={`rounded-2xl p-6 border shadow-sm ${cardBgClass} ${borderClass}`}>
              <h2 className={`text-2xl font-semibold mb-6 ${textClass}`}>Gallery Images</h2>
              
              {galleryItems.length === 0 ? (
                <div className={`text-center py-8 ${textMutedClass}`}>
                  No images in the gallery yet. Add your first image above.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className={`border rounded-lg overflow-hidden ${borderClass}`}>
                      {editingId === item.id ? (
                        // Edit Mode
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className={`text-lg font-semibold ${textClass}`}>Editing Image</h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={saveEditedImage}
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
                          
                          <div className="space-y-3">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Title</label>
                              <input
                                type="text"
                                value={editImage.title}
                                onChange={(e) => handleEditImageChange('title', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
                              <input
                                type="text"
                                value={editImage.imageUrl}
                                onChange={(e) => handleEditImageChange('imageUrl', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                              />
                            </div>
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                              {editImage.imageUrl ? (
                                <img 
                                  src={editImage.imageUrl} 
                                  alt={editImage.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/640x360?text=Invalid+Image+URL";
                                  }}
                                />
                              ) : (
                                <div className={`flex flex-col items-center ${textMutedClass}`}>
                                  <FaImage className="text-3xl mb-2" />
                                  <span>Preview</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div>
                          <div className="relative">
                            <div className="aspect-video bg-gray-100 overflow-hidden">
                              <img 
                                src={item.imageUrl} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/640x360?text=Invalid+Image+URL";
                                }}
                              />
                            </div>
                            <div className="absolute top-2 right-2 flex space-x-2">
                              <button
                                onClick={() => startEditing(item)}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => deleteImage(item.id)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className={`font-medium truncate ${textClass}`}>{item.title}</h3>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div>
            <div className={`rounded-2xl p-6 border shadow-sm ${cardBgClass} ${borderClass}`}>
              <h2 className={`text-2xl font-semibold mb-6 ${tealTextClass}`}>Gallery Content</h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Section Title</label>
                  <input
                    type="text"
                    value={textContent.title}
                    onChange={(e) => handleTextContentChange('title', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className={`block text-sm font-medium ${textSecondaryClass}`}>Paragraphs</label>
                    <button
                      type="button"
                      onClick={addParagraph}
                      className={`text-sm flex items-center ${tealTextClass} ${tealHoverClass}`}
                    >
                      <FaPlus className="mr-1" /> Add Paragraph
                    </button>
                  </div>
                  
                  {textContent.paragraphs.map((paragraph, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm ${textMutedClass}`}>Paragraph {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeParagraph(index)}
                          disabled={textContent.paragraphs.length <= 1}
                          className={`text-sm disabled:opacity-25 disabled:cursor-not-allowed ${redTextClass} ${redHoverClass}`}
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        value={paragraph}
                        onChange={(e) => handleParagraphChange(index, e.target.value)}
                        rows={3}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                      />
                    </div>
                  ))}
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className={`block text-sm font-medium ${textSecondaryClass}`}>Gallery Highlights</label>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className={`text-sm flex items-center ${tealTextClass} ${tealHoverClass}`}
                    >
                      <FaPlus className="mr-1" /> Add Highlight
                    </button>
                  </div>
                  
                  {textContent.highlights.map((highlight, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm ${textMutedClass}`}>Highlight {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          disabled={textContent.highlights.length <= 1}
                          className={`text-sm disabled:opacity-25 disabled:cursor-not-allowed ${redTextClass} ${redHoverClass}`}
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                      />
                    </div>
                  ))}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Button Text</label>
                  <input
                    type="text"
                    value={textContent.buttonText}
                    onChange={(e) => handleTextContentChange('buttonText', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;