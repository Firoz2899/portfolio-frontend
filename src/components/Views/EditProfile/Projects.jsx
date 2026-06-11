// components/Projects.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFilter, FaCode, FaDesktop, FaMobileAlt, FaMountain, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const Projects = ({ darkMode }) => {
  // Initial projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Mountain Explorer',
      description: 'An interactive web application for exploring mountain trails and conservation efforts.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['web', 'react', 'node.js', 'mongodb'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true,
      icon: <FaDesktop />
    },
    {
      id: 2,
      title: 'Forest Task Manager',
      description: 'A collaborative task management application with real-time updates inspired by forest ecosystems.',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['web', 'react', 'firebase', 'tailwind'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true,
      icon: <FaDesktop />
    },
    {
      id: 3,
      title: 'Summit Tracker',
      description: 'A mobile application for tracking hiking trails and mountain expedition data.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['mobile', 'react native', 'redux', 'api'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: false,
      icon: <FaMobileAlt />
    },
    {
      id: 4,
      title: 'Alpine Weather Dashboard',
      description: 'A responsive weather dashboard with mountain forecasts and interactive maps.',
      image: 'https://images.unsplash.com/photo-1592210454359-904ecf22d7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['web', 'javascript', 'api', 'css'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: false,
      icon: <FaDesktop />
    },
    {
      id: 5,
      title: 'Wildlife API',
      description: 'A secure RESTful API for wildlife research and forest monitoring.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['backend', 'node.js', 'express', 'mongodb'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: false,
      icon: <FaCode />
    },
    {
      id: 6,
      title: 'Nature Conservation UI',
      description: 'A modern UI design for nature conservation organizations and initiatives.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['ui/ux', 'figma', 'prototyping'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: false,
      icon: <FaDesktop />
    },
  ]);

  // Initial filters
  const [filters, setFilters] = useState(['all', 'web', 'mobile', 'ui/ux', 'backend']);
  
  // State for new project
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    tags: [''],
    github: '',
    demo: '',
    featured: false,
    iconType: 'desktop'
  });

  // State for new filter
  const [newFilter, setNewFilter] = useState('');

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editProject, setEditProject] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Icon options
  const iconOptions = [
    { type: 'desktop', icon: <FaDesktop /> },
    { type: 'mobile', icon: <FaMobileAlt /> },
    { type: 'code', icon: <FaCode /> }
  ];

  // Handle input change for new project
  const handleNewProjectChange = (field, value) => {
    setNewProject({ ...newProject, [field]: value });
  };

  // Handle tags change for new project
  const handleNewProjectTagsChange = (index, value) => {
    const updatedTags = [...newProject.tags];
    updatedTags[index] = value;
    setNewProject({ ...newProject, tags: updatedTags });
  };

  // Add new tag to new project
  const addNewProjectTag = () => {
    setNewProject({ ...newProject, tags: [...newProject.tags, ''] });
  };

  // Remove tag from new project
  const removeNewProjectTag = (index) => {
    if (newProject.tags.length > 1) {
      const updatedTags = [...newProject.tags];
      updatedTags.splice(index, 1);
      setNewProject({ ...newProject, tags: updatedTags });
    }
  };

  // Add new project
  const handleAddProject = () => {
    if (newProject.title.trim() !== '' && newProject.description.trim() !== '') {
      const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
      const selectedIcon = iconOptions.find(opt => opt.type === newProject.iconType) || iconOptions[0];
      const filteredTags = newProject.tags.filter(tag => tag.trim() !== '');
      
      setProjects([
        ...projects,
        {
          id: newId,
          title: newProject.title,
          description: newProject.description,
          image: newProject.image || `https://via.placeholder.com/1000x600?text=${encodeURIComponent(newProject.title)}`,
          tags: filteredTags,
          github: newProject.github,
          demo: newProject.demo,
          featured: newProject.featured,
          icon: selectedIcon.icon
        }
      ]);
      
      // Reset form
      setNewProject({
        title: '',
        description: '',
        image: '',
        tags: [''],
        github: '',
        demo: '',
        featured: false,
        iconType: 'desktop'
      });
    }
  };

  // Add new filter
  const handleAddFilter = () => {
    if (newFilter.trim() !== '' && !filters.includes(newFilter.trim())) {
      setFilters([...filters, newFilter.trim()]);
      setNewFilter('');
    }
  };

  // Delete filter
  const handleDeleteFilter = (filter) => {
    if (filter !== 'all') { // Prevent deleting the 'all' filter
      setFilters(filters.filter(f => f !== filter));
    }
  };

  // Start editing a project
  const startEditing = (project) => {
    setEditingId(project.id);
    setEditProject({ ...project, iconType: iconOptions.find(opt => opt.icon === project.icon)?.type || 'desktop' });
  };

  // Handle input change for editing project
  const handleEditProjectChange = (field, value) => {
    setEditProject({ ...editProject, [field]: value });
  };

  // Handle tags change for editing project
  const handleEditProjectTagsChange = (index, value) => {
    const updatedTags = [...editProject.tags];
    updatedTags[index] = value;
    setEditProject({ ...editProject, tags: updatedTags });
  };

  // Add new tag to editing project
  const addEditProjectTag = () => {
    setEditProject({ ...editProject, tags: [...editProject.tags, ''] });
  };

  // Remove tag from editing project
  const removeEditProjectTag = (index) => {
    if (editProject.tags.length > 1) {
      const updatedTags = [...editProject.tags];
      updatedTags.splice(index, 1);
      setEditProject({ ...editProject, tags: updatedTags });
    }
  };

  // Save edited project
  const saveEditedProject = () => {
    if (editProject.title.trim() !== '' && editProject.description.trim() !== '') {
      const selectedIcon = iconOptions.find(opt => opt.type === editProject.iconType) || iconOptions[0];
      const filteredTags = editProject.tags.filter(tag => tag.trim() !== '');
      
      setProjects(projects.map(project => 
        project.id === editingId 
          ? { 
              ...editProject, 
              icon: selectedIcon.icon,
              tags: filteredTags
            } 
          : project
      ));
      
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditProject(null);
  };

  // Delete project
  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
  };

  // Toggle featured status
  const toggleFeatured = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, featured: !project.featured } : project
    ));
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
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Projects Editor</h1>
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

          {/* Add New Project Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaPlus className="mr-2" /> Add New Project
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => handleNewProjectChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Type</label>
                <select
                  value={newProject.iconType}
                  onChange={(e) => handleNewProjectChange('iconType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="desktop">Web Application</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="code">Backend/API</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => handleNewProjectChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter project description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProject.image}
                  onChange={(e) => handleNewProjectChange('image', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter image URL (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={newProject.github}
                  onChange={(e) => handleNewProjectChange('github', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter GitHub URL (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Demo URL</label>
                <input
                  type="text"
                  value={newProject.demo}
                  onChange={(e) => handleNewProjectChange('demo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter demo URL (optional)"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProject.featured}
                  onChange={(e) => handleNewProjectChange('featured', e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Featured Project
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                <button
                  type="button"
                  onClick={addNewProjectTag}
                  className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 flex items-center"
                >
                  <FaPlus className="mr-1" /> Add Tag
                </button>
              </div>
              {newProject.tags.map((tag, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleNewProjectTagsChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewProjectTag(index)}
                    disabled={newProject.tags.length <= 1}
                    className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleAddProject}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> Add Project
            </button>
          </div>

          {/* Filters Management */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaFilter className="mr-2" /> Manage Filters
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((filter, index) => (
                <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full pl-4 pr-2 py-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{filter}</span>
                  {filter !== 'all' && (
                    <button
                      onClick={() => handleDeleteFilter(filter)}
                      className="ml-2 p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add new filter"
                value={newFilter}
                onChange={(e) => setNewFilter(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleAddFilter}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
              >
                <FaPlus className="mr-1" /> Add
              </button>
            </div>
          </div>

          {/* Existing Projects */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Projects</h2>
            
            {projects.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No projects yet. Add your first project above.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    {editingId === project.id ? (
                      // Edit Mode
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Editing Project</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEditedProject}
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input
                              type="text"
                              value={editProject.title}
                              onChange={(e) => handleEditProjectChange('title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Type</label>
                            <select
                              value={editProject.iconType}
                              onChange={(e) => handleEditProjectChange('iconType', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                              <option value="desktop">Web Application</option>
                              <option value="mobile">Mobile Application</option>
                              <option value="code">Backend/API</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea
                              value={editProject.description}
                              onChange={(e) => handleEditProjectChange('description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                            <input
                              type="text"
                              value={editProject.image}
                              onChange={(e) => handleEditProjectChange('image', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
                            <input
                              type="text"
                              value={editProject.github}
                              onChange={(e) => handleEditProjectChange('github', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Demo URL</label>
                            <input
                              type="text"
                              value={editProject.demo}
                              onChange={(e) => handleEditProjectChange('demo', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`featured-${project.id}`}
                              checked={editProject.featured}
                              onChange={(e) => handleEditProjectChange('featured', e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <label htmlFor={`featured-${project.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Featured Project
                            </label>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                              <button
                                type="button"
                                onClick={addEditProjectTag}
                                className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 flex items-center"
                              >
                                <FaPlus className="mr-1" /> Add
                              </button>
                            </div>
                            {editProject.tags.map((tag, index) => (
                              <div key={index} className="flex items-center mb-2">
                                <input
                                  type="text"
                                  value={tag}
                                  onChange={(e) => handleEditProjectTagsChange(index, e.target.value)}
                                  className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm dark:bg-gray-700 dark:text-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeEditProjectTag(index)}
                                  disabled={editProject.tags.length <= 1}
                                  className="ml-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full disabled:opacity-25 disabled:cursor-not-allowed"
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div className="relative">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/1000x600?text=${encodeURIComponent(project.title)}`;
                              }}
                            />
                          </div>
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                              onClick={() => startEditing(project)}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                          {project.featured && (
                            <div className="absolute top-2 left-2 px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">
                              Featured
                            </div>
                          )}
                        </div>
                        
                        <div className="p-5">
                          <div className="flex items-center mb-2">
                            <div className="text-teal-500 mr-2">
                              {project.icon}
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white">{project.title}</h4>
                          </div>
                          
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              {project.github && (
                                <a 
                                  href={project.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                  <FaGithub />
                                </a>
                              )}
                              {project.demo && (
                                <a 
                                  href={project.demo} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                  <FaExternalLinkAlt />
                                </a>
                              )}
                            </div>
                            
                            <button
                              onClick={() => toggleFeatured(project.id)}
                              className={`text-xs px-2 py-1 rounded-full ${
                                project.featured 
                                  ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200' 
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              {project.featured ? 'Featured' : 'Make Featured'}
                            </button>
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

export default Projects;