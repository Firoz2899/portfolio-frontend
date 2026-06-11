//// components/Experience.js
import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaCalendarAlt, FaBuilding, FaMapMarkerAlt, FaPhone, FaGlobe, FaUserTie, FaCity, FaFlag, FaEnvelope, FaTrophy } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
// import { setRefresh } from '../../../States/Slice/LoadingSlice';
import { useAlert } from "../../../components/Common/Alert";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Experience = ({ darkMode, user }) => {

  const experienceObj = {
    Achievements: []
  };

  const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const MySwal = withReactContent(Swal);

  const [experiences, setExperiences] = useState(user.Experience || []);
  const [newExperience, setNewExperience] = useState(experienceObj);
  const [loading, setLoading] = useState(false);
  const [startPeriod, setStartPeriod] = useState(null);
  const [endPeriod, setEndPeriod] = useState(null);

  // Refs for Flatpickr instances
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Initialize Flatpickr with options
  const flatpickrOptions = {
    plugins: [
      new monthSelectPlugin({
        dateFormat: "M Y",
        altFormat: "F Y",
        altInput: true,
        defaultDate: null,
        theme: darkMode ? "dark" : "light"
      })
    ],
    onChange: (selectedDates, dateStr, instance) => {
      if (instance === startDateRef.current?.flatpickr) {
        setStartPeriod(selectedDates[0]);
        setValue("StartPeriod", dateStr);
      } else if (instance === endDateRef.current?.flatpickr) {
        setEndPeriod(selectedDates[0]);
        setValue("EndPeriod", dateStr);
      }
    }
  };

  const formValidation = (fieldName) => {
    switch (fieldName) {
      case "Position":
        return {
          required: "Position is required"
        }
      case "Company":
        return {
          required: "Company is required"
        }
      case "Country":
        return {
          required: "Country is required"
        }
      case "State":
        return {
          required: "State is required"
        }
      case "City":
        return {
          required: "City is required"
        }
      case "StartPeriod":
        return {
          required: "Start Period is required"
        }
      default:
        return {
          required: "Fields are required"
        }
    }
  }

  // Handle achievement change for new experience
  const handleNewAchievementChange = (index, value) => {
    const updatedAchievements = [...newExperience.Achievements];
    updatedAchievements[index] = value;
    setNewExperience({ ...newExperience, Achievements: updatedAchievements });
  };

  // Add new achievement field to new experience
  const addNewAchievement = (e) => {
    e.preventDefault();
    setNewExperience({
      ...newExperience,
      Achievements: [...newExperience.Achievements, ""]
    });
  };

  // Remove achievement field from new experience
  const removeNewAchievement = (index) => {
    if (newExperience.Achievements.length > 1) {
      const updatedAchievements = [...newExperience.Achievements];
      updatedAchievements.splice(index, 1);
      setNewExperience({ ...newExperience, Achievements: updatedAchievements });
    }
  };

  // Delete experience
  const deleteExperience = async (id) => {

    const apiurl = import.meta.env.VITE_API_URL;
    const deleteEndpoint = import.meta.env.VITE_DELETEEXPERIENCE_API;
    try {
      const res = await fetch(`${apiurl}${deleteEndpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const jsonResponse = await res.json().catch(() => ({
        message: "We couldn't process the server response.",
      }));

      if (!res.ok) {
        showAlert({
          type: "error",
          message: jsonResponse.message || "Failed to delete experience. Please try again.",
        });
        return;
      }

      // Update local state
      setExperiences(experiences.filter(exp => exp._id !== id));

      showAlert({
        type: "success",
        message: "Experience deleted successfully.",
      });

    } catch (error) {
      console.error("Unexpected error:", error);
      showAlert({
        type: "error",
        message: "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      // dispatch(setRefresh());
    }
  };

  // Save all changes
  const handleSave = async (data) => {
    setLoading(true);
    const apiurl = import.meta.env.VITE_API_URL;
    const update = import.meta.env.VITE_CREATEEXPERIENCE_API;

    try {
      const payload = {
        ...data,
        Achievements: newExperience.Achievements,
        UserUniqueId: user.UserUniqueId,
      };

      const res = await fetch(`${apiurl}${update}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      debugger
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

      // Add new experience to the list
      setExperiences(user.Experience)

      showAlert({
        type: "success",
        message: "Your Experience added successfully.",
      });

      // Reset form
      reset();
      setNewExperience(experienceObj);
      setStartPeriod(null);
      setEndPeriod(null);

    } catch (error) {
      console.error("Unexpected error:", error);
      showAlert({
        type: "error",
        message: "A network error occurred. Please check your connection and try again.",
      });
    }
    finally {
      dispatch(setRefresh());
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete this experience.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      deleteExperience(id);
    } else {
      // user cancelled
    }
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
  const redHoverClass = darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50';

  // Custom styles for Flatpickr
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Edit Experience</h1>
        </div>

        {/* Add New Experience Form */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <form onSubmit={handleSubmit(handleSave)} className="get-in-touch-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Position</label>
                <div className="relative">
                  <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("Position", formValidation("Position"))}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Job Title"
                  />
                </div>
                {errors.Position && <p style={{ color: "red", width: "100%" }}>{errors.Position.message}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Company</label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("Company", formValidation("Company"))}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Company Name"
                  />
                </div>
                {errors.Company && <p style={{ color: "red", width: "100%" }}>{errors.Company.message}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Country</label>
                <div className="relative">
                  <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("Country", formValidation("Country"))}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Country"
                  />
                </div>
                {errors.Country && <p style={{ color: "red", width: "100%" }}>{errors.Country.message}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>State</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("State", formValidation("State"))}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="State"
                  />
                </div>
                {errors.State && <p style={{ color: "red", width: "100%" }}>{errors.State.message}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>City</label>
                <div className="relative">
                  <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("City", formValidation("City"))}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="City"
                  />
                </div>
                {errors.City && <p style={{ color: "red", width: "100%" }}>{errors.City.message}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Pincode/Zip</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("Pincode")}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Pincode"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Start Period</label>
                <div className="relative">
                  <Flatpickr
                    ref={startDateRef}
                    options={{
                      ...flatpickrOptions,
                      defaultDate: startPeriod
                    }}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Jan 2025"
                  />
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <input
                  type="hidden"
                  {...register("StartPeriod", formValidation("StartPeriod"))}
                />
                {errors.StartPeriod && <p style={{ color: "red", width: "100%" }}>{errors.StartPeriod.message}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>End Period</label>
                <div className="relative">
                  <Flatpickr
                    ref={endDateRef}
                    options={{
                      ...flatpickrOptions,
                      defaultDate: endPeriod
                    }}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Jan 2025"
                  />
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <input
                  type="hidden"
                  {...register("EndPeriod")}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Phone</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("Phone")}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="eg. 9898989898"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Website Link</label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("Website")}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="https://google.com"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Description</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  {...register("Description")}
                  className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Description"
                  rows={4}
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className={`block text-sm font-medium ${textSecondaryClass}`}>Key Achievements</label>
                <button
                  onClick={addNewAchievement}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                >
                  <FaPlus className="mr-2" /> Add Achievements
                </button>
              </div>
              {newExperience.Achievements.map((achievement, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="relative flex-1">
                    <FaTrophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleNewAchievementChange(index, e.target.value)}
                      className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                      placeholder="Achievement description"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNewAchievement(index)}
                    disabled={newExperience.Achievements.length <= 1}
                    className={`ml-2 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed ${textMutedClass} ${redHoverClass}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                {loading ? (
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
          </form>
        </div>

        {/* Experiences List */}
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>Your Experiences</h2>

          {experiences.length === 0 ? (
            <div className={`text-center py-8 ${textMutedClass}`}>
              <p>No experiences added yet. Add your first experience using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <div key={exp._id} className={`rounded-xl p-5 border shadow-sm ${cardBgClass} ${borderClass}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-xl font-semibold ${textClass}`}>{exp.Position}</h3>
                    <button
                      onClick={() => handleDeleteClick(exp._id)}
                      className={`p-2 rounded-full ${textMutedClass} ${redHoverClass} transition-colors`}
                      title="Delete Experience"
                    >
                      <FaTrash />
                    </button>

                  </div>

                  <div className="mb-3">
                    <p className={`flex items-center ${textSecondaryClass}`}>
                      <FaBuilding className="mr-2" /> {exp.Company}
                    </p>
                    <p className={`flex items-center mt-1 ${textMutedClass}`}>
                      <FaMapMarkerAlt className="mr-2" /> {exp.City}, {exp.State}, {exp.Country}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className={`flex items-center ${textSecondaryClass}`}>
                      <FaCalendarAlt className="mr-2" />
                      {exp.StartPeriod} - {exp.EndPeriod || 'Present'}
                    </p>
                    {exp.Phone && (
                      <p className={`flex items-center mt-1 ${textMutedClass}`}>
                        <FaPhone className="mr-2" /> {exp.Phone}
                      </p>
                    )}
                    {exp.Website && (
                      <p className={`flex items-center mt-1 ${textMutedClass}`}>
                        <FaGlobe className="mr-2" />
                        <a href={exp.Website} target="_blank" rel="noopener noreferrer" className={tealTextClass}>
                          {exp.Website}
                        </a>
                      </p>
                    )}
                  </div>

                  {exp.Description && (
                    <p className={`mb-3 ${textSecondaryClass}`}>{exp.Description}</p>
                  )}

                  {exp.Achievements && exp.Achievements.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-medium mb-2 flex items-center ${textSecondaryClass}`}>
                        <FaTrophy className="mr-2" /> Key Achievements
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.Achievements.map((achievement, index) => (
                          <li key={index} className={`${textMutedClass} text-sm`}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for Flatpickr */}
      <style jsx global>{`
        /* Flatpickr Custom Styles */
        .flatpickr-input {
          background-color: ${darkMode ? '#374151' : '#ffffff'} !important;
          color: ${darkMode ? '#e5e7eb' : '#1f2937'} !important;
          border: 1px solid ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .flatpickr-input:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.2) !important;
          outline: none !important;
        }
        
        .flatpickr-calendar {
          background-color: ${darkMode ? '#374151' : '#ffffff'} !important;
          border: 1px solid ${darkMode ? '#4b5563' : '#e5e7eb'} !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }
        
        .flatpickr-months {
          background-color: ${darkMode ? '#374151' : '#ffffff'} !important;
          border-bottom: 1px solid ${darkMode ? '#4b5563' : '#e5e7eb'} !important;
        }
        
        .flatpickr-month {
          color: ${darkMode ? '#f3f4f6' : '#1f2937'} !important;
          fill: ${darkMode ? '#f3f4f6' : '#1f2937'} !important;
        }
        
        .flatpickr-current-month {
          color: ${darkMode ? '#f3f4f6' : '#1f2937'} !important;
          font-weight: 600 !important;
        }
        
        .flatpickr-weekdays {
          background-color: ${darkMode ? '#374151' : '#ffffff'} !important;
        }
        
        .flatpickr-weekday {
          color: ${darkMode ? '#9ca3af' : '#6b7280'} !important;
        }
        
        .flatpickr-days {
          background-color: ${darkMode ? '#374151' : '#ffffff'} !important;
        }
        
        .flatpickr-day {
          color: ${darkMode ? '#e5e7eb' : '#1f2937'} !important;
          border-radius: 0.375rem !important;
        }
        
        .flatpickr-day:hover {
          background-color: ${darkMode ? '#4b5563' : '#f3f4f6'} !important;
        }
        
        .flatpickr-day.selected {
          background-color: #0d9488 !important;
          color: white !important;
          font-weight: 600 !important;
        }
        
        .flatpickr-day.inRange {
          background-color: ${darkMode ? '#0f766e' : '#14b8a6'} !important;
          color: white !important;
        }
        
        .flatpickr-day.prevMonthDay,
        .flatpickr-day.nextMonthDay {
          color: ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .flatpickr-day.disabled {
          color: ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .numInputWrapper span {
          border-color: ${darkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .numInputWrapper span:hover {
          background-color: ${darkMode ? '#4b5563' : '#f3f4f6'} !important;
        }
        
        .numInputWrapper span.arrowUp {
          border-bottom-color: ${darkMode ? '#9ca3af' : '#6b7280'} !important;
        }
        
        .numInputWrapper span.arrowDown {
          border-top-color: ${darkMode ? '#9ca3af' : '#6b7280'} !important;
        }
        
        /* Month Select Plugin Styles */
        .flatpickr-monthSelect-months,
        .flatpickr-monthSelect-years {
          background-color: ${darkMode ? '#374151' : '#ffffff'} !important;
        }
        
        .flatpickr-monthSelect-month,
        .flatpickr-monthSelect-year {
          color: ${darkMode ? '#e5e7eb' : '#1f2937'} !important;
        }
        
        .flatpickr-monthSelect-month:hover,
        .flatpickr-monthSelect-year:hover {
          background-color: ${darkMode ? '#4b5563' : '#f3f4f6'} !important;
        }
        
        .flatpickr-monthSelect-month.selected,
        .flatpickr-monthSelect-year.selected {
          background-color: #0d9488 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Experience;