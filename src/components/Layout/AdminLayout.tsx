import { useMemo, type PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';
import {AdminHeader} from "@/components/Common/Headers/AdminHeader"
import { useAppSelector } from '@/hooks';
import { useThemeMode } from '@/hooks/useThemeMode';
import AdminSidebar from '@/components/Common/Sidebar/AdminSidebar';

export default function AdminLayout({children} : PropsWithChildren) {
    const {isDarkMode} = useThemeMode()
    const {user} = useAppSelector(x => x.auth)

    
    const userFullName = useMemo(
        () =>  [user?.FirstName, user?.LastName].filter(Boolean).join(" ")
        , [user?.FirstName, user?.LastName]
    )
    
  return (
      <div className={`min-h-screen relative overflow-hidden ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-cyan-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full filter blur-3xl"></div>
        </div>
  
        <Helmet title={`Admin Panel | ${userFullName}`}>
          <meta name="description" content="Admin panel for managing your profile" />
        </Helmet>
  
        <AdminSidebar/>
  
        {/* Main content */}
        <div className="lg:ml-64 min-h-screen relative z-10">
          {/* Creative Header */}
          <AdminHeader />
  
          {/* Content area */}
          <main className="p-4 lg:p-8">
            {/* Render sections here */}
            {children}
          </main>
  
          {/* Footer */}
          <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 p-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© {`${new Date(user!.createdAt).getFullYear()} ${userFullName}`}. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
}
