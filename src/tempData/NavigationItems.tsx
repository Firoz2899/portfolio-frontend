import About from '@/components/Views/EditProfile/About';
import type { INavigationItem } from '@/types/constants.types';
import loadable from '@loadable/component';
import {
  FaUser, FaInfoCircle, FaBriefcase, FaGraduationCap, FaCode, FaProjectDiagram,
  FaCertificate, FaComments, FaBlog, FaYoutube, FaVideo, FaHeartbeat,
  FaPhoneAlt, FaFileAlt, FaChartBar, FaQrcode,
  FaTachometerAlt,  FaMountain,
  FaLeaf, FaTree, FaFeather,
  FaDragon, FaKiwiBird, FaHorse, FaFish, FaSpider, FaBug, FaCat, FaDog, FaCrow,
  FaImages, FaUsers, FaMusic
} from 'react-icons/fa';

export const navigationItems: INavigationItem[] = [
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
      natureIcon: <FaLeaf />,
      component: loadable(x => import("@/components/Views/EditProfile/About"))
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