// components/EditProfile.js
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaInfoCircle, FaBriefcase, FaGraduationCap, FaCode, FaProjectDiagram,
  FaCertificate, FaComments, FaBlog, FaYoutube, FaVideo, FaHeartbeat,
  FaPhoneAlt, FaFileAlt, FaChartBar, FaQrcode,
  FaCog, FaSave, FaSignOutAlt, FaMoon, FaSun, FaBars, FaTimes, FaArrowRight,
  FaEye, FaEdit, FaPlus, FaSearch, FaChevronDown,
  FaThLarge, FaList, FaTachometerAlt, FaPalette, FaMountain,
  FaLeaf, FaTree, FaGem, FaFeather,
  FaDragon, FaKiwiBird, FaHorse, FaFish, FaSpider, FaBug, FaCat, FaDog, FaCrow,
  FaImages, FaUsers, FaMusic,
  FaRocket, FaChartLine, FaTrophy, FaGlobe, FaHeart, FaMedal,
  FaGlobe as FaGlobeAlt
} from 'react-icons/fa';
import { useAlert } from "@/components/Common/Alert"
import { useParams, useNavigate } from 'react-router-dom';
// import { setUser } from "../States/Slice/UserSlice"
// import { setLoading } from "../States/Slice/LoadingSlice"
// import { useDispatch, useSelector } from "react-redux"
import {AdminHeader} from "@/Components/Common/AdminHeader"
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppSelector } from '@/hooks';

// import { Hero, About, Experience, Education, Skills, Gallery, Projects, Certifications, Testimonials, MyTeam, Blog, YouTube, Videos, Medical, EmergencyContact, Documents, ProfileAnalytics, PaymentQR, Family, Playlist } from "../Components/Profile/EditIndex";

export default function EditProfile() {
    const {isDarkMode: darkMode, toggleTheme: toggleDarkMode} = useThemeMode()
    const [activeSection, setActiveSection] = useState('dashboard');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [headerSearch, setHeaderSearch] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
    const containerRef = useRef(null);
    const defaultProfileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
      const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <FaTachometerAlt />,
      description: 'Overview and analytics',
      color: 'from-teal-400 to-cyan-500',
      accent: 'teal',
      natureIcon: <FaMountain />
    },
    {
      id: 'about',
      name: 'About',
      icon: <FaInfoCircle />,
      description: 'Personal information',
      color: 'from-blue-400 to-sky-500',
      accent: 'blue',
      natureIcon: <FaLeaf />
    },
    {
      id: 'hero',
      name: 'Hero Section',
      icon: <FaUser />,
      description: 'Main profile section',
      color: 'from-purple-400 to-indigo-500',
      accent: 'purple',
      natureIcon: <FaFeather />
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: <FaBriefcase />,
      description: 'Work history',
      color: 'from-amber-400 to-orange-500',
      accent: 'amber',
      natureIcon: <FaTree />
    },
    {
      id: 'education',
      name: 'Education',
      icon: <FaGraduationCap />,
      description: 'Academic background',
      color: 'from-emerald-400 to-green-500',
      accent: 'green',
      natureIcon: <FaKiwiBird />
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <FaCode />,
      description: 'Technical abilities',
      color: 'from-rose-400 to-pink-500',
      accent: 'rose',
      natureIcon: <FaDragon />
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <FaProjectDiagram />,
      description: 'Portfolio showcase',
      color: 'from-violet-400 to-purple-500',
      accent: 'violet',
      natureIcon: <FaHorse />
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: <FaCertificate />,
      description: 'Professional credentials',
      color: 'from-cyan-400 to-sky-500',
      accent: 'cyan',
      natureIcon: <FaFish />
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      icon: <FaComments />,
      description: 'Client feedback',
      color: 'from-fuchsia-400 to-pink-500',
      accent: 'fuchsia',
      natureIcon: <FaSpider />
    },
    {
      id: 'team',
      name: 'My Team',
      icon: <FaUsers />,
      description: 'Team members',
      color: 'from-lime-400 to-green-500',
      accent: 'lime',
      natureIcon: <FaBug />
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: <FaBlog />,
      description: 'Articles & posts',
      color: 'from-red-400 to-rose-500',
      accent: 'red',
      natureIcon: <FaCat />
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <FaYoutube />,
      description: 'Video content',
      color: 'from-orange-400 to-amber-500',
      accent: 'orange',
      natureIcon: <FaDog />
    },
    {
      id: 'videos',
      name: 'Videos',
      icon: <FaVideo />,
      description: 'Video gallery',
      color: 'from-red-400 to-pink-500',
      accent: 'red',
      natureIcon: <FaCrow />
    },
    {
      id: 'medical',
      name: 'Medical',
      icon: <FaHeartbeat />,
      description: 'Health information',
      color: 'from-rose-400 to-pink-500',
      accent: 'rose',
      natureIcon: <FaHeartbeat />
    },
    {
      id: 'emergency',
      name: 'Emergency Contact',
      icon: <FaPhoneAlt />,
      description: 'Emergency contacts',
      color: 'from-blue-400 to-sky-500',
      accent: 'blue',
      natureIcon: <FaPhoneAlt />
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <FaFileAlt />,
      description: 'Important files',
      color: 'from-indigo-400 to-purple-500',
      accent: 'indigo',
      natureIcon: <FaFileAlt />
    },
    {
      id: 'analytics',
      name: 'Profile Analytics',
      icon: <FaChartBar />,
      description: 'Profile statistics',
      color: 'from-emerald-400 to-green-500',
      accent: 'emerald',
      natureIcon: <FaChartBar />
    },
    {
      id: 'payment',
      name: 'Payment QR',
      icon: <FaQrcode />,
      description: 'Payment options',
      color: 'from-teal-400 to-cyan-500',
      accent: 'teal',
      natureIcon: <FaQrcode />
    },
    {
      id: 'gallery',
      name: 'Image Gallery',
      icon: <FaImages />,
      description: 'Photo collection',
      color: 'from-purple-400 to-indigo-500',
      accent: 'purple',
      natureIcon: <FaImages />
    },
    {
      id: 'family',
      name: 'Family Members',
      icon: <FaUsers />,
      description: 'Family information',
      color: 'from-green-400 to-emerald-500',
      accent: 'green',
      natureIcon: <FaUsers />
    },
    {
      id: 'playlist',
      name: 'Playlist/Inspirations',
      icon: <FaMusic />,
      description: 'Favorite content',
      color: 'from-indigo-400 to-purple-500',
      accent: 'indigo',
      natureIcon: <FaMusic />
    }
  ];

  const filteredItems = navigationItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

   const handleLogout = async (e: any) => {
    e.preventDefault();

  };
  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`} ref={containerRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-cyan-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <Helmet>

        {/* <title>Admin Panel | {`${user?.FirstName} ${user?.LastName}`}</title> */}

        <meta name="description" content="Admin panel for managing your profile" />
      </Helmet>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
        //   onClick={toggleSidebar}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-xl`}>
        {/* Creative Sidebar Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-cyan-500/10 dark:from-teal-900/20 dark:to-cyan-900/20"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-10"></div>
          <div className="absolute top-1/4 left-0 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 rounded-full filter blur-2xl"></div>
          <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full filter blur-2xl"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo and user info */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl overflow-hidden mr-4 shadow-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src={
                     defaultProfileImage
                  }
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />

              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {/* {`${user?.FirstName} ${user?.LastName}`} */}
                </p>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
              <FaSearch className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {filteredItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  onMouseEnter={() => setHoveredItem(item.id as any)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all relative overflow-hidden ${activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                >
                  {/* Animated background for active item */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  <span className="mr-3 text-lg z-10">{item.icon}</span>
                  <div className="text-left z-10">
                    <div>{item.name}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>

                  {/* Hover effect */}
                  {hoveredItem === item.id && activeSection !== item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 z-10"
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-center px-4 py-3 mb-3 text-sm font-medium rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <><FaSun className="mr-2" /> Light Mode</> : <><FaMoon className="mr-2" /> Dark Mode</>}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen relative z-10">
        {/* Creative Header */}
        <AdminHeader
          activeSection={activeSection}
          darkMode={darkMode}
          user={{}}
          defaultProfileImage={defaultProfileImage}
          headerSearch={headerSearch}
          setHeaderSearch={setHeaderSearch}
        />

        {/* Content area */}
        <main className="p-4 lg:p-8">
          {/* Render sections here */}
        </main>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 p-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          {/* <p>© {`${new Date(user.createdAt).getFullYear()} ${user.FirstName} ${user.LastName}`}. All rights reserved.</p> */}
        </footer>
      </div>
    </div>
  );
}
