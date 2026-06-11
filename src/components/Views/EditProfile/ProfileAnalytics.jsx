// components/ProfileAnalytics.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaUsers, FaChartLine, FaGlobe, FaMobileAlt, FaDesktop, FaTabletAlt, FaFire, FaArrowUp, FaStar, FaCalendarAlt, FaClock, FaDownload, FaFilter } from 'react-icons/fa';

const ProfileAnalytics = ({ darkMode }) => {
  const [timeRange, setTimeRange] = useState('30'); // Default to 30 days
  const [activeTab, setActiveTab] = useState('overview'); // Default tab

  // Mock data for different time ranges
  const timeRangeData = {
    '7': {
      stats: [
        { title: "Views", value: "3.2K", change: "+5%", icon: <FaEye /> },
        { title: "Visitors", value: "2.1K", change: "+3%", icon: <FaUsers /> },
        { title: "Engagement", value: "62%", change: "+2%", icon: <FaChartLine /> },
        { title: "Requests", value: "87", change: "+7%", icon: <FaGlobe /> }
      ],
      quickStats: [
        { label: "Direct Traffic", value: "42%", color: "bg-teal-500" },
        { label: "Social Media", value: "28%", color: "bg-blue-500" },
        { label: "Search", value: "22%", color: "bg-cyan-500" },
        { label: "Referrals", value: "8%", color: "bg-indigo-500" }
      ],
      deviceStats: [
        { device: "Desktop", percent: 62, icon: <FaDesktop /> },
        { device: "Mobile", percent: 32, icon: <FaMobileAlt /> },
        { device: "Tablet", percent: 6, icon: <FaTabletAlt /> }
      ]
    },
    '30': {
      stats: [
        { title: "Views", value: "12.4K", change: "+12%", icon: <FaEye /> },
        { title: "Visitors", value: "8.9K", change: "+8%", icon: <FaUsers /> },
        { title: "Engagement", value: "68%", change: "+5%", icon: <FaChartLine /> },
        { title: "Requests", value: "247", change: "+15%", icon: <FaGlobe /> }
      ],
      quickStats: [
        { label: "Direct Traffic", value: "45%", color: "bg-teal-500" },
        { label: "Social Media", value: "25%", color: "bg-blue-500" },
        { label: "Search", value: "20%", color: "bg-cyan-500" },
        { label: "Referrals", value: "10%", color: "bg-indigo-500" }
      ],
      deviceStats: [
        { device: "Desktop", percent: 65, icon: <FaDesktop /> },
        { device: "Mobile", percent: 30, icon: <FaMobileAlt /> },
        { device: "Tablet", percent: 5, icon: <FaTabletAlt /> }
      ]
    },
    '90': {
      stats: [
        { title: "Views", value: "35.7K", change: "+18%", icon: <FaEye /> },
        { title: "Visitors", value: "24.3K", change: "+14%", icon: <FaUsers /> },
        { title: "Engagement", value: "72%", change: "+7%", icon: <FaChartLine /> },
        { title: "Requests", value: "682", change: "+22%", icon: <FaGlobe /> }
      ],
      quickStats: [
        { label: "Direct Traffic", value: "48%", color: "bg-teal-500" },
        { label: "Social Media", value: "22%", color: "bg-blue-500" },
        { label: "Search", value: "18%", color: "bg-cyan-500" },
        { label: "Referrals", value: "12%", color: "bg-indigo-500" }
      ],
      deviceStats: [
        { device: "Desktop", percent: 60, icon: <FaDesktop /> },
        { device: "Mobile", percent: 35, icon: <FaMobileAlt /> },
        { device: "Tablet", percent: 5, icon: <FaTabletAlt /> }
      ]
    }
  };

  // Get data based on selected time range
  const currentData = timeRangeData[timeRange];

  // Mock data for the engagement chart
  const engagementData = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 68 },
    { day: "Thu", value: 75 },
    { day: "Fri", value: 72 },
    { day: "Sat", value: 60 },
    { day: "Sun", value: 58 }
  ];

  // Mock data for the traffic sources chart
  const trafficData = [
    { source: "Direct", value: 45, color: "bg-teal-500" },
    { source: "Social", value: 25, color: "bg-blue-500" },
    { source: "Search", value: 20, color: "bg-cyan-500" },
    { source: "Referral", value: 10, color: "bg-indigo-500" }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <section id="profile-analytics" className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
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
              className="text-3xl font-bold mb-2 font-playfair text-blue-900 dark:text-blue-100"
            >
              Profile Analytics
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto rounded-full"
            ></motion.div>
          </div>
          
          {/* Time Range Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
              {['7', '30', '90'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    timeRange === range 
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {range} days
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
              {['overview', 'engagement', 'traffic', 'devices'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Main Analytics Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-blue-900/50 mb-8"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <FaStar className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-playfair">Performance Overview</h3>
                    <p className="text-xs text-teal-100 font-poppins">Last {timeRange} days</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-teal-100 font-poppins">Growth Rate</div>
                  <div className="flex items-center justify-end">
                    <FaArrowUp className="mr-1" />
                    <span className="font-bold">+{timeRange === '7' ? '5.2' : timeRange === '30' ? '10.5' : '15.3'}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentData.stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-800"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-3">
                        {stat.icon}
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 font-poppins">{stat.title}</div>
                    </div>
                    <div className="text-2xl font-bold font-playfair text-blue-900 dark:text-blue-100">{stat.value}</div>
                    <div className="flex items-center mt-1">
                      <FaArrowUp className="text-green-500 text-xs mr-1" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-poppins">{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Engagement Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-blue-900/50 mb-8"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <FaChartLine className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold font-playfair">Engagement Trend</h3>
                </div>
                <div className="flex items-center text-sm">
                  <FaCalendarAlt className="mr-1" />
                  <span>Last 7 days</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-end h-40 gap-2">
                {engagementData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-teal-500 to-blue-500 rounded-t-lg"
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className="text-xs mt-2 text-gray-600 dark:text-gray-300 font-poppins">{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 font-poppins">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 mr-2"></div>
                  Engagement Rate
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Traffic Overview Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-blue-900/50 mb-8"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <FaGlobe className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold font-playfair">Traffic Sources</h3>
                </div>
                <div className="flex items-center text-sm">
                  <FaFilter className="mr-1" />
                  <span>Last {timeRange} days</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    {currentData.quickStats.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-poppins text-gray-700 dark:text-gray-300">{stat.label}</span>
                          <span className="font-bold font-poppins text-blue-900 dark:text-blue-100">{stat.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className={`${stat.color} h-2 rounded-full`} style={{ width: stat.value }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48 rounded-full flex items-center justify-center">
                    {/* Pie Chart */}
                    <div className="absolute inset-0 rounded-full" 
                         style={{ 
                           background: `conic-gradient(
                             #0d9488 0% ${trafficData[0].value}%, 
                             #0ea5e9 ${trafficData[0].value}% ${trafficData[0].value + trafficData[1].value}%, 
                             #06b6d4 ${trafficData[0].value + trafficData[1].value}% ${trafficData[0].value + trafficData[1].value + trafficData[2].value}%, 
                             #6366f1 ${trafficData[0].value + trafficData[1].value + trafficData[2].value}% 100%
                           )` 
                         }}
                    ></div>
                    <div className="absolute w-32 h-32 bg-white dark:bg-gray-800 rounded-full"></div>
                    <div className="absolute text-center">
                      <div className="text-xl font-bold font-playfair text-blue-900 dark:text-blue-100">100%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 font-poppins">Total Traffic</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Device Breakdown Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-blue-900/50"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <FaDesktop className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold font-playfair">Device Breakdown</h3>
                </div>
                <div className="flex items-center text-sm">
                  <FaClock className="mr-1" />
                  <span>Last {timeRange} days</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-6">
                {currentData.deviceStats.map((item, index) => (
                  <div key={index} className="flex-1 min-w-[120px]">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-3">
                        {item.icon}
                      </div>
                      <span className="font-poppins text-gray-700 dark:text-gray-300">{item.device}</span>
                    </div>
                    <div className="text-2xl font-bold font-playfair text-blue-900 dark:text-blue-100">{item.percent}%</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Device Trend Visualization */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-bold mb-4 font-playfair text-blue-900 dark:text-blue-100">Device Trend Over Time</h4>
                <div className="h-32 flex items-end gap-4">
                  {[
                    { day: "Mon", desktop: 60, mobile: 35, tablet: 5 },
                    { day: "Tue", desktop: 62, mobile: 33, tablet: 5 },
                    { day: "Wed", desktop: 58, mobile: 36, tablet: 6 },
                    { day: "Thu", desktop: 65, mobile: 30, tablet: 5 },
                    { day: "Fri", desktop: 63, mobile: 32, tablet: 5 },
                    { day: "Sat", desktop: 55, mobile: 40, tablet: 5 },
                    { day: "Sun", desktop: 50, mobile: 45, tablet: 5 }
                  ].map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="flex items-end w-full justify-center gap-1" style={{ height: '100px' }}>
                        <div 
                          className="w-3/12 bg-gradient-to-t from-teal-500 to-blue-500 rounded-t"
                          style={{ height: `${item.desktop}%` }}
                        ></div>
                        <div 
                          className="w-3/12 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t"
                          style={{ height: `${item.mobile}%` }}
                        ></div>
                        <div 
                          className="w-3/12 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t"
                          style={{ height: `${item.tablet}%` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-2 text-gray-600 dark:text-gray-300 font-poppins">{item.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 font-poppins">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 mr-2"></div>
                    Desktop
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 font-poppins">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 mr-2"></div>
                    Mobile
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 font-poppins">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mr-2"></div>
                    Tablet
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Export Options */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8"
          >
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-poppins shadow-md hover:shadow-lg transition-all">
              <FaDownload className="mr-2" />
              Export Analytics Report
            </button>
          </motion.div>
          
          {/* Premium Analytics Notice */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-poppins">
              <FaStar className="mr-2" />
              Premium Analytics Available
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProfileAnalytics;