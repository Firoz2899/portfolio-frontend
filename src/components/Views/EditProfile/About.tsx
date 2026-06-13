// components/About.js
import React, { useState, useEffect } from 'react';
import {
  FaMountain, FaHiking, FaLanguage, FaHeart, FaMusic, FaCamera,
  FaPlane, FaUtensils, FaBook, FaGlobe, FaSave, FaPlus, FaTrash,
  FaCode, FaGamepad, FaFilm, FaDumbbell, FaPalette, FaLaptopCode,
  FaCoffee, FaBeer, FaBasketballBall, FaBiking, FaDog, FaTree,
  FaStar, FaMoon, FaSun, FaLeaf, FaAnchor, FaTheaterMasks,
  FaSwimmingPool, FaFire, FaSnowflake, FaCity, FaBicycle,
  FaUser, FaMapMarkedAlt, FaEnvelope, FaPhone, FaFlag, FaMapMarkerAlt,FaCity as FaCityIcon
} from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAlert } from "../../Common/Alert";
import { useDispatch } from "react-redux";
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppSelector } from '@/hooks';
// import { setRefresh } from '../../../States/Slice/LoadingSlice';

const About = () => {
  const {isDarkMode: darkMode} = useThemeMode()
  const {editProfile: user} = useAppSelector(x => x.profile)
  const { showAlert } = useAlert();

  const availableIcons = [
    { name: 'FaHiking', component: <FaHiking /> },
    { name: 'FaCamera', component: <FaCamera /> },
    { name: 'FaPlane', component: <FaPlane /> },
    { name: 'FaUtensils', component: <FaUtensils /> },
    { name: 'FaMusic', component: <FaMusic /> },
    { name: 'FaBook', component: <FaBook /> },
    { name: 'FaGlobe', component: <FaGlobe /> },
    { name: 'FaHeart', component: <FaHeart /> },
    { name: 'FaCode', component: <FaCode /> },
    { name: 'FaGamepad', component: <FaGamepad /> },
    { name: 'FaFilm', component: <FaFilm /> },
    { name: 'FaDumbbell', component: <FaDumbbell /> },
    { name: 'FaPalette', component: <FaPalette /> },
    { name: 'FaLaptopCode', component: <FaLaptopCode /> },
    { name: 'FaCoffee', component: <FaCoffee /> },
    { name: 'FaBeer', component: <FaBeer /> },
    { name: 'FaBasketballBall', component: <FaBasketballBall /> },
    { name: 'FaBiking', component: <FaBiking /> },
    { name: 'FaDog', component: <FaDog /> },
    { name: 'FaTree', component: <FaTree /> },
    { name: 'FaStar', component: <FaStar /> },
    { name: 'FaMoon', component: <FaMoon /> },
    { name: 'FaSun', component: <FaSun /> },
    { name: 'FaLeaf', component: <FaLeaf /> },
    { name: 'FaAnchor', component: <FaAnchor /> },
    { name: 'FaTheaterMasks', component: <FaTheaterMasks /> },
    { name: 'FaSwimmingPool', component: <FaSwimmingPool /> },
    { name: 'FaFire', component: <FaFire /> },
    { name: 'FaSnowflake', component: <FaSnowflake /> },
    { name: 'FaCity', component: <FaCity /> },
    { name: 'FaBicycle', component: <FaBicycle /> },
  ];

  const [personalInfo, setPersonalInfo] = useState(user);
  const [interests, setInterests] = useState<string[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [newInterest, setNewInterest] = useState({ name: '', icon: 'FaHiking' });
  const [newLanguage, setNewLanguage] = useState({ name: '', level: 'Basic' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {

      if (user.Hobbies && Array.isArray(user.Hobbies)) {
        setInterests(user.Hobbies);
      }

      if (user.Language && Array.isArray(user.Language)) {
        setLanguages(user.Language);
      }
    }
  }, [user]);

  // Handle personal info change
  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Add new interest
  const handleAddInterest = () => {
    if (newInterest.name.trim() !== '') {
      const newId = Math.max(0, ...interests.map(i => i.id)) + 1;
      setInterests([...interests, {
        id: newId,
        name: newInterest.name,
        icon: newInterest.icon
      }]);
      setNewInterest({ name: '', icon: 'FaHiking' });
    }
  };

  // Remove interest
  const handleRemoveInterest = (id) => {
    setInterests(interests.filter(interest => interest.id !== id));
  };

  // Add new language
  const handleAddLanguage = () => {
    if (newLanguage.name.trim() !== '') {
      const newId = Math.max(0, ...languages.map(l => l.id)) + 1;
      setLanguages([...languages, {
        id: newId,
        name: newLanguage.name,
        level: newLanguage.level
      }]);
      setNewLanguage({ name: '', level: 'Basic' });
    }
  };

  // Remove language
  const handleRemoveLanguage = (id) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  // Save changes - Fixed the event handler
  const handleSave = async (e) => {

    e.preventDefault();
    console.log("Save button clicked");
    setSaving(true);

    try {
      // Combine all data
      const profileData = {
        ...personalInfo,
        Hobbies: interests,
        Language: languages
      };

      const apiurl = import.meta.env.VITE_API_URL;
      const update = import.meta.env.VITE_UPDATEUSERDETAIL_API;
      const res = await fetch(`${apiurl}${update}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      });

      const jsonResponse = await res.json().catch(() => ({
        message: "Unable to parse server response.",
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
      setSaving(false);
      // dispatch(setRefresh());
    }
  };

  // CKEditor configuration
  const editorConfiguration = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'outdent', 'indent', '|',
      'blockQuote', 'insertTable', 'undo', 'redo'
    ],
    height: '300px'
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Edit Profile</h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Update your personal information and preferences</p>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* Personal Information Card */}
            <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <FaUser className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name='FirstName'
                        value={personalInfo.FirstName}
                        onChange={handlePersonalInfoChange}
                        className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name='LastName'
                        value={personalInfo.LastName}
                        onChange={handlePersonalInfoChange}
                        className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="Email"
                        value={personalInfo.Email}
                        onChange={handlePersonalInfoChange}
                        className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name='Phone'
                        value={personalInfo.Phone}
                        onChange={handlePersonalInfoChange}
                        className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information Card */}
            <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100'}`}>
                    <FaMapMarkedAlt className={`text-lg ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Address Information</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address Line 1</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name='AddressLine1'
                        value={personalInfo.AddressLine1}
                        onChange={handlePersonalInfoChange}
                        placeholder="Street address"
                        className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address Line 2</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name='AddressLine2'
                        value={personalInfo.AddressLine2}
                        onChange={handlePersonalInfoChange}
                        placeholder="Apartment, suite, etc."
                        className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>City</label>
                      <div className="relative">
                        <FaCityIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name='City'
                          value={personalInfo.City}
                          onChange={handlePersonalInfoChange}
                          className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>State/Province</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name='State'
                          value={personalInfo.State}
                          onChange={handlePersonalInfoChange}
                          className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pincode/ZIP</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name='Pincode'
                          value={personalInfo.Pincode}
                          onChange={handlePersonalInfoChange}
                          className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Country</label>
                    <div className="relative">
                      <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name='Country'
                        value={personalInfo.Country}
                        onChange={handlePersonalInfoChange}
                        className={`w-full px-4 py-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Interests & Hobbies Card */}
                <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-pink-900/30' : 'bg-pink-100'}`}>
                        <FaHeart className={`text-lg ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                      </div>
                      <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Interests & Hobbies</h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {interests.map((interest) => (
                        <div key={interest.id} className={`flex items-center px-3 py-1.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <div className={`mr-2 ${darkMode ? 'text-pink-400' : 'text-pink-500'}`}>
                            {availableIcons.find(icon => icon.name === interest.icon)?.component || <FaHeart />}
                          </div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {interest.name}
                          </span>
                          <button
                            onClick={() => handleRemoveInterest(interest.id)}
                            className={`ml-1.5 p-0.5 rounded-full ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h3 className={`text-base font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Interest</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Interest name"
                          value={newInterest.name}
                          onChange={(e) => setNewInterest({ ...newInterest, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition`}
                        />
                        <div className="flex gap-3">
                          <select
                            value={newInterest.icon}
                            onChange={(e) => setNewInterest({ ...newInterest, icon: e.target.value })}
                            className={`flex-1 px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition`}
                          >
                            {availableIcons.map((icon) => (
                              <option key={icon.name} value={icon.name}>{icon.name.replace('Fa', '')}</option>
                            ))}
                          </select>
                          <button
                            onClick={handleAddInterest}
                            className="px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg transition flex items-center justify-center shadow-md hover:shadow-lg"
                          >
                            <FaPlus className="mr-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Languages Card */}
                <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <FaLanguage className={`text-lg ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                      </div>
                      <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Languages</h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {languages.map((lang) => (
                        <div key={lang.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {lang.name}
                            </span>
                            <div className="flex items-center">
                              <span className={`mr-2 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                {lang.level}
                              </span>
                              <button
                                onClick={() => handleRemoveLanguage(lang.id)}
                                className={`p-1 rounded-full ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </div>
                          <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                              style={{ width: lang.level === 'Native' ? '100%' : lang.level === 'Intermediate' ? '70%' : '40%' }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h3 className={`text-base font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Language</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Language name"
                          value={newLanguage.name}
                          onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                        />
                        <div className="flex gap-3">
                          <select
                            value={newLanguage.level}
                            onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
                            className={`flex-1 px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                          >
                            <option value="Native">Native</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Basic">Basic</option>
                          </select>
                          <button
                            onClick={handleAddLanguage}
                            className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition flex items-center justify-center shadow-md hover:shadow-lg"
                          >
                            <FaPlus className="mr-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Journey Text Card */}
            <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                    <FaMountain className={`text-lg ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Journey</h2>
                </div>
              </div>

              <div className="p-6">
                <div className={`ck-editor-wrapper ${darkMode ? 'dark' : ''}`}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={personalInfo.MyJourney || ''}
                    config={editorConfiguration}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setPersonalInfo({ ...personalInfo, MyJourney: data });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>


          <div className="lg:col-span-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* CKEditor dark mode styles - Fixed style tag */}
      <style global>{`
        .dark .ck-editor__editable {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
        }
        .dark .ck-toolbar {
          background-color: #1f2937 !important;
          border-color: #4b5563 !important;
        }
        .dark .ck.ck-toolbar .ck-toolbar__separator {
          background: #4b5563 !important;
        }
        .dark .ck.ck-toolbar .ck-button {
          color: #f3f4f6 !important;
        }
        .dark .ck.ck-toolbar .ck-button:hover {
          background: #4b5563 !important;
        }
        .dark .ck.ck-toolbar .ck-button.ck-on {
          background: #4b5563 !important;
        }
        .dark .ck.ck-toolbar .ck-dropdown__panel {
          background: #374151 !important;
          border-color: #4b5563 !important;
        }
        .dark .ck.ck-toolbar .ck-list__item .ck-button {
          color: #f3f4f6 !important;
        }
        .dark .ck.ck-toolbar .ck-list__item .ck-button:hover {
          background: #4b5563 !important;
        }
      `}</style>
    </div>
  );
};

export default About;