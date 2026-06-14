import { useRef, type MouseEvent, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaMoon, FaSun, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useAlert } from "@/components/Common/Alert"
import {AdminHeader} from "@/components/Common/Headers/AdminHeader"
import { navigationItems } from '@/tempData/NavigationItems';
import { authApiHooks, executeMutation, profileApiHooks } from '@/services';
import { useNavigate } from 'react-router-dom';
import { getRoute } from '@/utils/route.helpers';
import { RouteNames } from '@/constants';
import { useAppSelector, useAppActions } from '@/hooks';
import { NavigationSidebarItem } from '@/components/Common';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Loader } from '@/components/Common/Loader';
import AboutMe from '@/components/Views/EditProfile/About'


export default function EditProfile() {
  profileApiHooks.useGetUserProfileQuery();
  const [logoutApi] = authApiHooks.useLogoutMutation()
  const {isDarkMode, toggleTheme: toggleDarkMode} = useThemeMode()
  const {showAlert} = useAlert()
  const navigate = useNavigate()
  const {sidebarOpen, searchQuery} = useAppSelector(x => x.app)
  const {user} = useAppSelector(x => x.auth)
  const {profile, isLoading} = useAppSelector(x => x.profile)
  const {toggleSidebar, setSearchQuery} = useAppActions()
  
  const containerRef = useRef(null);
  
  const dashboardRoute = getRoute(RouteNames.public.Dashboard)
  const defaultProfileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
     

  const filteredItems = navigationItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await executeMutation(logoutApi().unwrap()); 

    showAlert({
      type: res.IsSuccess ? "success" : "error",
      message: res.Message,
    });
    
    if(res.IsSuccess){
      navigate(dashboardRoute?.path || "");
    }
  };

  const userFullName = useMemo(
    () =>  [user?.FirstName, user?.LastName].filter(Boolean).join(" ")
    , [user?.FirstName, user?.LastName]
  )

  // only first time loading will show
  if(isLoading && profile == null){
    return <Loader/>
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`} ref={containerRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-cyan-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <Helmet title={`Admin Panel | ${userFullName}`}>
        <meta name="description" content="Admin panel for managing your profile" />
      </Helmet>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => toggleSidebar()}
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
                    {userFullName}
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
                <NavigationSidebarItem key={item.id} item={item} />
              ))}
            </nav>
          </div>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-center px-4 py-3 mb-3 text-sm font-medium rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <><FaSun className="mr-2" /> Light Mode</> : <><FaMoon className="mr-2" /> Dark Mode</>}
            </button>

            <button
              onClick={handleLogout}
              {...dashboardRoute.preloadProps}
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
          onClick={() => toggleSidebar()}
        ></div>
      )}

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen relative z-10">
        {/* Creative Header */}
        <AdminHeader />

        {/* Content area */}
        <main className="p-4 lg:p-8">
          {/* Render sections here */}
          <AboutMe/>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 p-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {`${new Date(user!.createdAt).getFullYear()} ${userFullName}`}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
