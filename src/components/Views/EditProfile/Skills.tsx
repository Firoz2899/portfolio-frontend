// components/Skills.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMountain, FaTree, FaLeaf, FaHiking, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const Skills = ({ darkMode }) => {
  // Initial skill categories data
  const [skillCategories, setSkillCategories] = useState([
    {
      id: 1,
      title: "Frontend",
      icon: <FaMountain className="text-3xl" />,
      skills: [
        { id: 1, name: "React", level: 95 },
        { id: 2, name: "Vue.js", level: 80 },
        { id: 3, name: "Angular", level: 75 },
        { id: 4, name: "HTML/CSS", level: 90 },
        { id: 5, name: "JavaScript", level: 90 },
        { id: 6, name: "TypeScript", level: 85 },
        { id: 7, name: "Tailwind CSS", level: 90 },
        { id: 8, name: "Bootstrap", level: 85 },
      ]
    },
    {
      id: 2,
      title: "Backend",
      icon: <FaTree className="text-3xl" />,
      skills: [
        { id: 9, name: "Node.js", level: 90 },
        { id: 10, name: "Express", level: 85 },
        { id: 11, name: "Python", level: 80 },
        { id: 12, name: "Django", level: 75 },
        { id: 13, name: "PHP", level: 70 },
        { id: 14, name: "Laravel", level: 75 },
        { id: 15, name: "Ruby", level: 65 },
        { id: 16, name: "Java", level: 70 },
      ]
    },
    {
      id: 3,
      title: "Database",
      icon: <FaLeaf className="text-3xl" />,
      skills: [
        { id: 17, name: "MongoDB", level: 85 },
        { id: 18, name: "MySQL", level: 80 },
        { id: 19, name: "PostgreSQL", level: 75 },
        { id: 20, name: "Firebase", level: 80 },
        { id: 21, name: "Redis", level: 70 },
        { id: 22, name: "SQLite", level: 75 },
      ]
    },
    {
      id: 4,
      title: "Tools & Others",
      icon: <FaHiking className="text-3xl" />,
      skills: [
        { id: 23, name: "Git", level: 90 },
        { id: 24, name: "Docker", level: 80 },
        { id: 25, name: "AWS", level: 75 },
        { id: 26, name: "Figma", level: 85 },
        { id: 27, name: "Webpack", level: 75 },
        { id: 28, name: "Jest", level: 80 },
        { id: 29, name: "CI/CD", level: 75 },
        { id: 30, name: "GraphQL", level: 70 },
      ]
    }
  ]);

  // Initial technologies data
  const [technologies, setTechnologies] = useState([
    "React", "Vue", "Angular", "Node.js", "Express", "Python", "Django", 
    "JavaScript", "TypeScript", "HTML5", "CSS3", "SASS", "Tailwind CSS", 
    "Bootstrap", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "AWS", 
    "Docker", "Git", "Figma", "Webpack", "Jest", "GraphQL"
  ]);

  // State for new category
  const [newCategory, setNewCategory] = useState({ title: "", iconType: "mountain" });

  // State for new skill
  const [newSkill, setNewSkill] = useState({ name: "", level: 50, categoryId: "" });

  // State for new technology
  const [newTechnology, setNewTechnology] = useState("");

  // State for editing
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Icon options
  const iconOptions = [
    { type: "mountain", icon: <FaMountain className="text-3xl" /> },
    { type: "tree", icon: <FaTree className="text-3xl" /> },
    { type: "leaf", icon: <FaLeaf className="text-3xl" /> },
    { type: "hiking", icon: <FaHiking className="text-3xl" /> }
  ];

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.title.trim() !== "") {
      const newId = Math.max(0, ...skillCategories.map(c => c.id)) + 1;
      const selectedIcon = iconOptions.find(opt => opt.type === newCategory.iconType) || iconOptions[0];
      
      setSkillCategories([
        ...skillCategories,
        {
          id: newId,
          title: newCategory.title,
          icon: selectedIcon.icon,
          skills: []
        }
      ]);
      
      setNewCategory({ title: "", iconType: "mountain" });
    }
  };

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.name.trim() !== "" && newSkill.categoryId) {
      const newId = Math.max(0, ...skillCategories.flatMap(c => c.skills.map(s => s.id))) + 1;
      
      setSkillCategories(skillCategories.map(category => 
        category.id === parseInt(newSkill.categoryId)
          ? {
              ...category,
              skills: [
                ...category.skills,
                { id: newId, name: newSkill.name, level: newSkill.level }
              ]
            }
          : category
      ));
      
      setNewSkill({ name: "", level: 50, categoryId: "" });
    }
  };

  // Add new technology
  const handleAddTechnology = () => {
    if (newTechnology.trim() !== "" && !technologies.includes(newTechnology.trim())) {
      setTechnologies([...technologies, newTechnology.trim()]);
      setNewTechnology("");
    }
  };

  // Delete category
  const handleDeleteCategory = (id) => {
    setSkillCategories(skillCategories.filter(category => category.id !== id));
    if (editingCategory === id) {
      setEditingCategory(null);
    }
  };

  // Delete skill
  const handleDeleteSkill = (categoryId, skillId) => {
    setSkillCategories(skillCategories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            skills: category.skills.filter(skill => skill.id !== skillId)
          }
        : category
    ));
    if (editingSkill === skillId) {
      setEditingSkill(null);
    }
  };

  // Delete technology
  const handleDeleteTechnology = (tech) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  // Start editing category
  const startEditingCategory = (category) => {
    setEditingCategory(category.id);
  };

  // Update category
  const updateCategory = (id, field, value) => {
    setSkillCategories(skillCategories.map(category => 
      category.id === id ? { ...category, [field]: value } : category
    ));
  };

  // Update category icon
  const updateCategoryIcon = (id, iconType) => {
    const selectedIcon = iconOptions.find(opt => opt.type === iconType);
    if (selectedIcon) {
      setSkillCategories(skillCategories.map(category => 
        category.id === id ? { ...category, icon: selectedIcon.icon } : category
      ));
    }
  };

  // Start editing skill
  const startEditingSkill = (skill) => {
    setEditingSkill(skill.id);
  };

  // Update skill
  const updateSkill = (categoryId, skillId, field, value) => {
    setSkillCategories(skillCategories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            skills: category.skills.map(skill => 
              skill.id === skillId ? { ...skill, [field]: value } : skill
            )
          }
        : category
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
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Skills Editor</h1>
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

          {/* Add New Category Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaPlus className="mr-2" /> Add New Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Title</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Mobile Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                <select
                  value={newCategory.iconType}
                  onChange={(e) => setNewCategory({...newCategory, iconType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="mountain">Mountain</option>
                  <option value="tree">Tree</option>
                  <option value="leaf">Leaf</option>
                  <option value="hiking">Hiking</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddCategory}
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center"
                >
                  <FaPlus className="mr-2" /> Add Category
                </button>
              </div>
            </div>
          </div>

          {/* Add New Skill Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaPlus className="mr-2" /> Add New Skill
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., React Native"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proficiency Level</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-12">{newSkill.level}%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  value={newSkill.categoryId}
                  onChange={(e) => setNewSkill({...newSkill, categoryId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a category</option>
                  {skillCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddSkill}
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center"
                >
                  <FaPlus className="mr-2" /> Add Skill
                </button>
              </div>
            </div>
          </div>

          {/* Skill Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Skill Categories</h2>
            
            {skillCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No skill categories yet. Add your first category above.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((category) => (
                  <div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white">
                          {category.icon}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditingCategory(category)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    
                    {editingCategory === category.id ? (
                      <div className="mb-4">
                        <input
                          type="text"
                          value={category.title}
                          onChange={(e) => updateCategory(category.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-3 dark:bg-gray-700 dark:text-white"
                        />
                        <select
                          value={iconOptions.find(opt => opt.icon === category.icon)?.type || "mountain"}
                          onChange={(e) => updateCategoryIcon(category.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="mountain">Mountain</option>
                          <option value="tree">Tree</option>
                          <option value="leaf">Leaf</option>
                          <option value="hiking">Hiking</option>
                        </select>
                      </div>
                    ) : (
                      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">{category.title}</h3>
                    )}
                    
                    <div className="space-y-4">
                      {category.skills.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No skills in this category yet.</p>
                      ) : (
                        category.skills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between items-center mb-1">
                              {editingSkill === skill.id ? (
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={(e) => updateSkill(category.id, skill.id, 'name', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                              ) : (
                                <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                              )}
                              <div className="flex items-center">
                                {editingSkill === skill.id ? (
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={skill.level}
                                    onChange={(e) => updateSkill(category.id, skill.id, 'level', parseInt(e.target.value) || 0)}
                                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mr-2 dark:bg-gray-700 dark:text-white"
                                  />
                                ) : (
                                  <span className="text-sm font-medium text-teal-600 dark:text-teal-400 mr-2">{skill.level}%</span>
                                )}
                                <button
                                  onClick={() => editingSkill === skill.id ? setEditingSkill(null) : startEditingSkill(skill)}
                                  className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                                >
                                  {editingSkill === skill.id ? <FaTimes /> : <FaEdit size={12} />}
                                </button>
                                <button
                                  onClick={() => handleDeleteSkill(category.id, skill.id)}
                                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full ml-1"
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technologies Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaLeaf className="mr-2" /> Technologies I Work With
            </h2>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full pl-4 pr-2 py-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{tech}</span>
                  <button
                    onClick={() => handleDeleteTechnology(tech)}
                    className="ml-2 p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add new technology"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleAddTechnology}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
              >
                <FaPlus className="mr-1" /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;