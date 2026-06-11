// components/Documents.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaUpload, FaDownload, FaTrash, FaEye, FaPlus, FaShieldAlt, FaLock, FaEdit, FaTimes } from 'react-icons/fa';

const Documents = ({ darkMode }) => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Passport",
      type: "Identification",
      description: "International travel document",
      uploadDate: "2023-06-15",
      size: "2.4 MB",
      category: "ID"
    },
    {
      id: 2,
      name: "Driver's License",
      type: "Identification",
      description: "Official driving permit",
      uploadDate: "2023-05-20",
      size: "1.8 MB",
      category: "ID"
    },
    {
      id: 3,
      name: "Insurance Policy",
      type: "Insurance",
      description: "Health insurance coverage details",
      uploadDate: "2023-07-10",
      size: "3.2 MB",
      category: "Insurance"
    },
    {
      id: 4,
      name: "Property Deed",
      type: "Legal",
      description: "Property ownership document",
      uploadDate: "2023-04-05",
      size: "4.7 MB",
      category: "Legal"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDocument, setCurrentDocument] = useState({
    id: null,
    name: "",
    type: "",
    description: "",
    uploadDate: "",
    size: "",
    category: ""
  });

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentDocument({
      id: documents.length + 1,
      name: "",
      type: "",
      description: "",
      uploadDate: new Date().toISOString().split('T')[0],
      size: "0 MB",
      category: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (doc) => {
    setIsEditing(true);
    setCurrentDocument(doc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDocument({
      ...currentDocument,
      [name]: value
    });
  };

  const handleSaveDocument = () => {
    if (isEditing) {
      setDocuments(documents.map(doc => 
        doc.id === currentDocument.id ? currentDocument : doc
      ));
    } else {
      setDocuments([...documents, currentDocument]);
    }
    closeModal();
  };

  // Theme classes
  const bgClass = darkMode ? 'bg-gradient-to-br from-teal-900 to-blue-900' : 'bg-gradient-to-br from-teal-50 to-blue-50';
  const textClass = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-teal-800' : 'border-teal-100';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const modalBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const tealTextClass = darkMode ? 'text-teal-400' : 'text-teal-600';
  const tealHoverClass = darkMode ? 'hover:text-teal-300' : 'hover:text-teal-800';
  const blueTextClass = darkMode ? 'text-blue-400' : 'text-blue-500';
  const blueHoverClass = darkMode ? 'hover:text-blue-300' : 'hover:text-blue-700';
  const redTextClass = darkMode ? 'text-red-400' : 'text-red-500';
  const redHoverClass = darkMode ? 'hover:text-red-300' : 'hover:text-red-700';
  const badgeBgClass = darkMode ? 'bg-teal-900/30' : 'bg-teal-100';
  const badgeTextClass = darkMode ? 'text-teal-200' : 'text-teal-800';
  const iconBgClass = darkMode ? 'bg-teal-900/30' : 'bg-teal-100';
  const securityBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const modalOverlayClass = darkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50';

  return (
    <section id="documents" className={`py-16 ${bgClass} relative overflow-hidden`}>
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" style={{ backgroundImage: 'radial-gradient(circle, #0d9488 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl font-bold mb-2 font-playfair ${textClass}`}
          >
            My Documents
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto"
          ></motion.div>
        </div>
        
        {/* Security Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl shadow-lg p-1">
            <div className={`rounded-xl p-4 ${securityBgClass}`}>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${iconBgClass}`}>
                  <FaShieldAlt className={`text-lg ${tealTextClass}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold font-poppins ${textClass}`}>Secure Document Storage</h3>
                  <p className={`text-sm font-poppins ${tealTextClass}`}>All documents are encrypted and securely stored</p>
                </div>
                <div className="flex items-center">
                  <FaLock className={`mr-1 ${tealTextClass}`} />
                  <span className={`text-xs font-poppins ${textSecondaryClass}`}>End-to-End Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {documents.map((doc, index) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className={`${cardBgClass} rounded-xl shadow-md overflow-hidden border ${borderClass} h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${iconBgClass}`}>
                      <FaFileAlt className={`text-lg ${tealTextClass}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-bold text-sm font-poppins ${textClass}`}>{doc.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-poppins ${badgeBgClass} ${badgeTextClass}`}>
                          {doc.category}
                        </span>
                      </div>
                      <p className={`text-xs font-poppins ${tealTextClass}`}>{doc.type}</p>
                    </div>
                  </div>
                  
                  <p className={`text-xs mb-3 font-poppins ${textSecondaryClass}`}>{doc.description}</p>
                  
                  <div className="flex justify-between text-xs mb-4">
                    <div>
                      <p className={`font-poppins ${tealTextClass}`}>Uploaded</p>
                      <p className={`font-medium font-poppins ${textClass}`}>{doc.uploadDate}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-poppins ${tealTextClass}`}>Size</p>
                      <p className={`font-medium font-poppins ${textClass}`}>{doc.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button className={`flex items-center text-xs font-poppins ${tealTextClass} ${tealHoverClass}`}>
                      <FaEye className="mr-1" />
                      View
                    </button>
                    <button className={`flex items-center text-xs font-poppins ${tealTextClass} ${tealHoverClass}`}>
                      <FaDownload className="mr-1" />
                      Download
                    </button>
                    <button 
                      onClick={() => openEditModal(doc)}
                      className={`flex items-center text-xs font-poppins ${blueTextClass} ${blueHoverClass}`}
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(doc.id)}
                      className={`flex items-center text-xs font-poppins ${redTextClass} ${redHoverClass}`}
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Add New Document Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <button 
            onClick={openAddModal}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-poppins"
          >
            <FaPlus className="mr-2" />
            Add New Document
          </button>
        </motion.div>
      </div>

      {/* Add/Edit Document Modal */}
      {isModalOpen && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${modalOverlayClass}`}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${modalBgClass} rounded-xl shadow-xl w-full max-w-md`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold font-playfair ${textClass}`}>
                  {isEditing ? "Edit Document" : "Add New Document"}
                </h3>
                <button 
                  onClick={closeModal}
                  className={`hover:${textSecondaryClass} ${textMutedClass}`}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 font-poppins ${textSecondaryClass}`}>
                    Document Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentDocument.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-poppins ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="e.g. Passport, License"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 font-poppins ${textSecondaryClass}`}>
                    Document Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={currentDocument.type}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-poppins ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="e.g. Identification, Legal"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 font-poppins ${textSecondaryClass}`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentDocument.description}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-poppins ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Brief description of the document"
                    rows="2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 font-poppins ${textSecondaryClass}`}>
                      Upload Date
                    </label>
                    <input
                      type="date"
                      name="uploadDate"
                      value={currentDocument.uploadDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-poppins ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 font-poppins ${textSecondaryClass}`}>
                      Size (MB)
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={currentDocument.size}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-poppins ${inputBgClass} ${inputBorderClass} ${textClass}`}
                      placeholder="e.g. 2.4 MB"
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 font-poppins ${textSecondaryClass}`}>
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={currentDocument.category}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-poppins ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="e.g. ID, Insurance, Legal"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className={`px-4 py-2 border rounded-lg font-medium transition-colors font-poppins ${inputBorderClass} ${textSecondaryClass} hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDocument}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all font-poppins"
                >
                  {isEditing ? "Update Document" : "Add Document"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Documents;