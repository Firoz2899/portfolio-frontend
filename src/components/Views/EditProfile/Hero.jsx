import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaDribbble, FaBehance, FaMedium, FaSave, FaTimes,FaTimesCircle, FaCloudUploadAlt, FaUser, FaUserTie, FaInfoCircle } from 'react-icons/fa';
import { useAlert } from "../../../components/Common/Alert";
// import { setRefresh } from "../../../States/Slice/LoadingSlice";
import { useDispatch } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Hero = ({ darkMode, user }) => {
  const defaultProfileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
  const defaultBackgroundImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const dispatch = useDispatch();

  const apiurl = import.meta.env.VITE_API_URL;
  const imageBaseUrl = import.meta.env.VITE_IMAGEBASE_URl;

  const [heroDetails, setHeroDetails] = useState({
    ProfileImage: "",
    BackgroundImage: "",
    FirstName: "",
    LastName: "",
    gradientFrom: "from-teal-300",
    gradientTo: "to-blue-300",
    Roles: "",
    Description: "",
    Availability: "",
    ProfileFile: null,
    BackgroundFile: null,
  });

  const socialObj = {
    Github: "",
    Linkedin: "",
    Twitter: "",
    Instagram: "",
    Facebook: "",
    Youtube: "",
    Tiktok: "",
    Discord: "",
    Telegram: "",
    Dribbble: "",
    Behance: "",
    Medium: "",
    UserUniqueId: ""
  };
  const [socialLinks, setSocialLinks] = useState(socialObj);

  // Available icons for social links
  const iconOptions = [
    { value: 'Github', label: 'GitHub', icon: <FaGithub /> },
    { value: 'Linkedin', label: 'LinkedIn', icon: <FaLinkedin /> },
    { value: 'Twitter', label: 'Twitter', icon: <FaTwitter /> },
    { value: 'Instagram', label: 'Instagram', icon: <FaInstagram /> },
    { value: 'Facebook', label: 'Facebook', icon: <FaFacebook /> },
    { value: 'Youtube', label: 'YouTube', icon: <FaYoutube /> },
    { value: 'Tiktok', label: 'TikTok', icon: <FaTiktok /> },
    { value: 'Discord', label: 'Discord', icon: <FaDiscord /> },
    { value: 'Telegram', label: 'Telegram', icon: <FaTelegram /> },
    { value: 'Dribbble', label: 'Dribbble', icon: <FaDribbble /> },
    { value: 'Behance', label: 'Behance', icon: <FaBehance /> },
    { value: 'Medium', label: 'Medium', icon: <FaMedium /> }
  ];

  const availabilityOptions = [
    { value: "Available", label: "Available for work" },
    { value: "Not_Available", label: "Not available" },
    { value: "Open_To_collaborations", label: "Open to collaborations" },
    { value: "internships", label: "Open to internships" },
    { value: "Freelancing", label: "Available for freelance" },
    { value: "Looking", label: "Actively looking" },
    { value: "Busy", label: "Currently engaged or not taking new work" },
    { value: "Full_time_positions", label: "Full-time positions" },
    { value: "Part_time_opportunities", label: "Part-time opportunities" },
    { value: "Remote_work_only", label: "Remote work only" },
    { value: "mentorship", label: "Looking for mentorship" },
    { value: "dont_disturb", label: "Prefers not to be contacted at the moment" },
    { value: "away", label: "Away for personal time or travel." },
  ];

  // UI state
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [dragActive, setDragActive] = useState({ profile: false, background: false });

  const profileInputRef = useRef(null);
  const backgroundInputRef = useRef(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    setHeroDetails(user);
    setSocialLinks(user.SocialMedia || socialObj);
  }, [user]);

  // Function to get the correct image source
  const getImageSrc = (imagePath, defaultImage) => {
    if (!imagePath) return defaultImage;
    // Check if it's a data URL (starts with "data:")
    if (imagePath.startsWith('data:')) {
      return imagePath;
    }
    // Otherwise, it's a path from the database
    return `${imageBaseUrl}${imagePath}`;
  };

  // Handle hero detail changes
  const handleDetailChange = (field, value) => {
    setHeroDetails(prev => ({ ...prev, [field]: value }));
  };

  // Handle social link changes
  const handleSocialLinkChange = (platform, url) => {
    setSocialLinks(prev => ({ ...prev, [platform]: url }));
  };

  // Clear social link input
  const clearSocialLink = (platform) => {
    setSocialLinks(prev => ({ ...prev, [platform]: "" }));
  };

  // Handle drag events
  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [type]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [type]: false }));
    }
  };

  // Handle drop events
  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], type);
    }
  };

  // Handle file selection
  const handleFile = (file, type) => {
    if (!file.type.match('image.*')) {
      showAlert('error', 'Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'profile') {
        setHeroDetails(prev => ({
          ...prev,
          ProfileImage: reader.result,
          ProfileFile: file
        }));
      } else {
        setHeroDetails(prev => ({
          ...prev,
          BackgroundImage: reader.result,
          BackgroundFile: file
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Trigger file input click
  const openFileDialog = (type) => {
    if (type === 'profile') {
      profileInputRef.current.click();
    } else {
      backgroundInputRef.current.click();
    }
  };

  // Handle file input change
  const handleFileInputChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], type);
    }
  };

  // Handle availability change
  const handleAvailabilityChange = (e) => {
    const { value } = e.target;
    setHeroDetails(prev => ({ ...prev, Availability: value }));
  };

  // Save hero details
  const saveHeroDetails = async (e) => {
    e.preventDefault();
    console.log("Saving hero details:", heroDetails);

    try {
      const updateUser = import.meta.env.VITE_UPDATEUSERDETAIL_API;
      const formData = new FormData();

      formData.append("UserUniqueId", heroDetails.UserUniqueId);
      formData.append("FirstName", heroDetails.FirstName);
      formData.append("LastName", heroDetails.LastName);
      formData.append("Roles", heroDetails.Roles);
      formData.append("Description", heroDetails.Description);
      formData.append("Availability", heroDetails.Availability);

      // Append image files (check if file exists)
      if (heroDetails.ProfileFile instanceof File) {
        formData.append("ProfileFile", heroDetails.ProfileFile);
      }

      if (heroDetails.BackgroundFile instanceof File) {
        formData.append("BackgroundFile", heroDetails.BackgroundFile);
      }

      const res = await fetch(`${apiurl}${updateUser}`, {
        method: "PUT",
        body: formData,
      });

      const jsonResponse = await res.json().catch(() => ({
        message: "We couldn't process the server response.",
      }));

      if (!res.ok) {
        showAlert({
          type: "error",
          message:
            jsonResponse.message ||
            "An error occurred while updating your details. Please try again later.",
        });
        return;
      }

      showAlert({
        type: "success",
        message: "Your profile has been updated successfully.",
      });

    } catch (error) {
      console.error("Unexpected error:", error);
      showAlert({
        type: "error",
        message: "A network error occurred. Please check your connection and try again.",
      });
    }
    finally {
      // dispatch(setRefresh());
    }
  };

  const validateSocialLinks = () => {
    for (const [platform, inputUrl] of Object.entries(socialLinks)) {
      if (!inputUrl || platform === "UserUniqueId" || platform === "updatedAt" ||platform === "createdAt" || platform === "_id") continue;

      if (
        !inputUrl.includes("http://") &&
        !inputUrl.includes("https://") &&
        !inputUrl.includes("www.")
      ) {
        return {
          valid: false,
          message: `"${platform}" link must contain http://, https:// or www.`,
        };
      }
    }

    return { valid: true };
  };

  // Save social links
  const saveSocialLinks = async (e) => {

    e.preventDefault();
    console.log('Saving social links:', socialLinks);

    try {
      const validation = validateSocialLinks();
      if (!validation.valid) {
        showAlert({ type: "error", message: validation.message });
        return;
      }

      const payload = {
        ...socialLinks,
        UserUniqueId: user.UserUniqueId,
      };

      const updateSocialMedia = import.meta.env.VITE_UPDATESOCIALMEDIA_API;

      const res = await fetch(`${apiurl}${updateSocialMedia}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const jsonResponse = await res.json().catch(() => ({
        message: "Unable to parse server response.",
      }));

      if (!res.ok) {
        showAlert({
          type: "error",
          message:
            jsonResponse.message ||
            "Failed to update social media links. Please check your connection or try again later.",
        });
        return;
      }

      showAlert({ type: "success", message: "Social Media Links Updated Successfully" });
    } catch (error) {
      console.error("Network or unexpected error:", error);
      showAlert({
        type: "error",
        message: "A network error occurred. Please try again shortly.",
      });
    }
  };

  // Theme classes
  const bgClass = darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50';
  const cardBgClass = darkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm';
  const containerBgClass = darkMode ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const labelClass = darkMode ? 'text-gray-300' : 'text-gray-700';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBgClass = darkMode ? 'bg-gray-700/80' : 'bg-white';
  const inputBorderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const inputFocusClass = darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500';
  const buttonBgClass = darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600';
  const iconBgClass = darkMode ? 'bg-gray-700' : 'bg-gray-100';
  const redTextClass = darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700';
  const tabActiveClass = darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white';
  const tabInactiveClass = darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700';
  const dragActiveClass = darkMode ? 'border-blue-500 bg-blue-900/30' : 'border-blue-400 bg-blue-100';
  const dragInactiveClass = darkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-100';
  const shadowClass = darkMode ? 'shadow-xl shadow-blue-900/20' : 'shadow-xl shadow-blue-200/30';
  const editorContentClass = darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800';
  const clearButtonClass = darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-4xl w-full mx-4 animate-zoomIn" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage} alt="Full View" className="w-full h-auto rounded-xl shadow-2xl" />
            <button
              className="absolute top-3 right-3 text-white text-2xl bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all duration-300"
              onClick={() => setPreviewImage(null)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <div className={`max-w-6xl mx-auto rounded-2xl overflow-hidden ${containerBgClass} ${shadowClass}`}>
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className={`text-4xl font-bold ${textClass}`}>Edit Hero Section</h1>
            <p className={`${textSecondaryClass} mt-2 text-lg`}>Customize your homepage hero section</p>
          </motion.div>

          {/* Tabs for different sections */}
          <div className="flex mb-8 border-b">
            <button
              className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-300 ${activeTab === 'details' ? tabActiveClass : tabInactiveClass
                }`}
              onClick={() => setActiveTab('details')}
            >
              Hero Details
            </button>
            <button
              className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-300 ${activeTab === 'social' ? tabActiveClass : tabInactiveClass
                }`}
              onClick={() => setActiveTab('social')}
            >
              Social Links
            </button>
          </div>

          {/* Hero Details Tab */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Images */}
                <div className="space-y-8">
                  {/* Profile Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className={`p-6 rounded-2xl ${cardBgClass} border ${borderClass} shadow-lg`}
                  >
                    <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>Profile Image</h2>

                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg">
                          <img
                            onClick={() => setPreviewImage(getImageSrc(heroDetails.ProfileImage, defaultProfileImage))}
                            src={getImageSrc(heroDetails.ProfileImage, defaultProfileImage)}
                            alt="Profile Preview"
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div
                        className={`w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ${dragActive.profile ? dragActiveClass : dragInactiveClass
                          }`}
                        onDragEnter={(e) => handleDrag(e, 'profile')}
                        onDragOver={(e) => handleDrag(e, 'profile')}
                        onDragLeave={(e) => handleDrag(e, 'profile')}
                        onDrop={(e) => handleDrop(e, 'profile')}
                        onClick={() => openFileDialog('profile')}
                      >
                        <FaCloudUploadAlt className={`mx-auto h-12 w-12 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                        <p className={`mt-2 text-sm ${textClass}`}>
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className={`text-xs ${textSecondaryClass} mt-1`}>
                          PNG, JPG, GIF up to 10MB
                        </p>
                        <input
                          ref={profileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileInputChange(e, "profile")}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Background Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`p-6 rounded-2xl ${cardBgClass} border ${borderClass} shadow-lg`}
                  >
                    <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>Background Image</h2>

                    <div className="flex flex-col items-center">
                      <div className="relative mb-4 w-full">
                        <div className="w-full h-56 rounded-xl overflow-hidden border-4 border-teal-500 shadow-lg">
                          <img
                            onClick={() => setPreviewImage(getImageSrc(heroDetails.BackgroundImage, defaultBackgroundImage))}
                            src={getImageSrc(heroDetails.BackgroundImage, defaultBackgroundImage)}
                            alt="Background Preview"
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div
                        className={`w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ${dragActive.background ? dragActiveClass : dragInactiveClass
                          }`}
                        onDragEnter={(e) => handleDrag(e, 'background')}
                        onDragOver={(e) => handleDrag(e, 'background')}
                        onDragLeave={(e) => handleDrag(e, 'background')}
                        onDrop={(e) => handleDrop(e, 'background')}
                        onClick={() => openFileDialog('background')}
                      >
                        <FaCloudUploadAlt className={`mx-auto h-12 w-12 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                        <p className={`mt-2 text-sm ${textClass}`}>
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className={`text-xs ${textSecondaryClass} mt-1`}>
                          PNG, JPG, GIF up to 10MB
                        </p>
                        <input
                          ref={backgroundInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileInputChange(e, "background")}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Text Fields */}
                <div className="space-y-8">
                  {/* Name and Status */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className={`p-6 rounded-2xl ${cardBgClass} border ${borderClass} shadow-lg`}
                  >
                    <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>Name & Status</h2>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${labelClass}`}>First Name</label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder='e.g. John'
                            value={heroDetails.FirstName}
                            onChange={(e) => handleDetailChange('FirstName', e.target.value)}
                            className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 ${inputBgClass} ${inputBorderClass} ${inputFocusClass} ${textClass} transition-all duration-300`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Last Name</label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder='e.g. Doe'
                            value={heroDetails.LastName}
                            onChange={(e) => handleDetailChange('LastName', e.target.value)}
                            className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 ${inputBgClass} ${inputBorderClass} ${inputFocusClass} ${textClass} transition-all duration-300`}
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className={`text-lg font-medium mb-3 ${textClass}`}>Availability Status</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {availabilityOptions.map((item) => (
                        <label
                          key={item.value}
                          className="inline-flex items-center text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-200/20 transition-colors duration-300"
                        >
                          <input
                            type="radio"
                            name="availability"
                            value={item.value}
                            checked={heroDetails.Availability === item.value}
                            onChange={handleAvailabilityChange}
                            className="cursor-pointer w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                          <span className={`ml-2 ${textClass}`}>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>

                  {/* Roles */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`p-6 rounded-2xl ${cardBgClass} border ${borderClass} shadow-lg`}
                  >
                    <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>Roles (Typewriter)</h2>
                    <div className="relative">
                      <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={heroDetails.Roles}
                        onChange={(e) => handleDetailChange("Roles", e.target.value)}
                        placeholder="e.g. Developer, Designer, Creator"
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 ${inputBgClass} ${inputBorderClass} ${inputFocusClass} ${textClass} transition-all duration-300`}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-8 mt-7">
                {/* Description with CKEditor */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className={`p-6 rounded-2xl ${cardBgClass} border ${borderClass} shadow-lg`}
                >
                  <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>Description</h2>
                  
                  <div className={`border rounded-lg ${inputBorderClass} overflow-hidden`}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={heroDetails.Description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeroDetails(prev => ({ ...prev, Description: data }));
                      }}
                      config={{
                        toolbar: [
                          'heading', '|',
                          'bold', 'italic', 'underline', '|',
                          'link', '|',
                          'bulletedList', 'numberedList', '|',
                          'blockQuote', 'insertTable', '|',
                          'undo', 'redo'
                        ],
                        placeholder: 'Write a brief description about yourself...',
                        // Dark mode configuration
                        ui: {
                          viewportOffset: {
                            top: 50
                          }
                        }
                      }}
                      onReady={editor => {
                        // Apply dark mode styles to CKEditor
                        if (darkMode) {
                          const editableElement = editor.ui.getEditableElement();
                          if (editableElement) {
                            editableElement.style.backgroundColor = '#1f2937';
                            editableElement.style.color = '#f3f4f6';
                          }
                          
                          // Style toolbar
                          const toolbarElement = editor.ui.view.toolbar.element;
                          if (toolbarElement) {
                            toolbarElement.style.backgroundColor = '#374151';
                            toolbarElement.style.borderColor = '#4b5563';
                          }
                        }
                      }}
                    />
                  </div>
                  
                  <p className={`text-sm mt-2 ${textSecondaryClass}`}>
                    Use the editor toolbar to format your text
                  </p>
                </motion.div>
              </div>

              {/* Save Button for Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 flex justify-end"
              >
                <button
                  onClick={saveHeroDetails}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <FaSave className="mr-3 text-xl" />
                  Save Hero Details
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`p-6 rounded-2xl ${cardBgClass} border ${borderClass} shadow-lg`}>
                <h2 className={`text-xl font-semibold mb-6 ${textClass}`}>Social Links</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {iconOptions.map((platform) => (
                    <div key={platform.value} className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgClass} shadow-md`}>
                        {platform.icon}
                      </div>
                      <div className="flex-1">
                        <label className={`block text-sm font-medium mb-1 ${labelClass}`}>
                          {platform.label}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={socialLinks[platform.value]}
                            onChange={(e) => handleSocialLinkChange(platform.value, e.target.value)}
                            placeholder={`https://${platform.label.toLowerCase()}.com/username`}
                            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${inputBgClass} ${inputBorderClass} ${inputFocusClass} ${textClass} transition-all duration-300`}
                          />
                          {socialLinks[platform.value] && (
                            <button
                              type="button"
                              onClick={() => clearSocialLink(platform.value)}
                              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${clearButtonClass} transition-colors duration-200`}
                              aria-label="Clear input"
                            >
                              <FaTimesCircle />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button for Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 flex justify-end"
              >
                <button
                  onClick={saveSocialLinks}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <FaSave className="mr-3 text-xl" />
                  Save Social Links
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* CKEditor Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out forwards;
        }
        
        /* CKEditor Styles */
        .ck-editor__editable {
          min-height: 150px;
          background-color: ${darkMode ? '#1f2937' : '#ffffff'} !important;
          color: ${darkMode ? '#f3f4f6' : '#1f2937'} !important;
        }
        
        .ck-toolbar {
          background-color: ${darkMode ? '#374151' : '#f3f4f6'} !important;
          border-color: ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .ck-toolbar .ck-button {
          color: ${darkMode ? '#f3f4f6' : '#1f2937'} !important;
        }
        
        .ck-toolbar .ck-button:hover {
          background-color: ${darkMode ? '#4b5563' : '#e5e7eb'} !important;
        }
        
        .ck-content .ck-widget {
          border-color: ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .ck-editor__main {
          border-color: ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .ck-editor__editable.ck-focused {
          border-color: ${darkMode ? '#3b82f6' : '#3b82f6'} !important;
          box-shadow: 0 0 0 2px ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} !important;
        }
        
        .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
          border-color: ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
      `}</style>
    </div>
  );
};

export default Hero;