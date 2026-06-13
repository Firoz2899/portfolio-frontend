
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom"
import { getRoute } from '@/utils/route.helpers';
import { RouteNames } from '@/constants';
export default function Dashboard() {

  const [cardType, setCardType] = useState('plastic');
  const [cardColor, setCardColor] = useState('primary');
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeTab, setActiveTab] = useState('how');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [activeGalleryTab, setActiveGalleryTab] = useState('all');

  const navigate = useNavigate();

  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ocean color palette
  const oceanPalette = {
    name: 'Ocean',
    primary: 'from-blue-500 to-cyan-600',
    light: 'from-blue-50 to-cyan-50',
    dark: 'from-blue-600 to-cyan-700',
    accent: 'bg-blue-600',
    text: 'text-blue-600',
    hover: 'hover:text-blue-600',
    border: 'border-blue-500',
    ring: 'ring-blue-500',
    shadow: 'shadow-blue-500/20',
    cardOptions: {
      plastic: [
        { name: 'Ocean Blue', value: 'primary', class: 'bg-gradient-to-br from-blue-400 to-blue-600' },
        { name: 'Sky Blue', value: 'sky', class: 'bg-gradient-to-br from-sky-400 to-sky-600' },
        { name: 'Deep Sea', value: 'deep', class: 'bg-gradient-to-br from-blue-700 to-blue-900' }
      ],
      metal: [
        { name: 'Silver', value: 'silver', class: 'bg-gradient-to-br from-gray-300 to-gray-500' },
        { name: 'Steel Blue', value: 'steel', class: 'bg-gradient-to-br from-slate-400 to-slate-600' },
        { name: 'Platinum', value: 'platinum', class: 'bg-gradient-to-br from-gray-200 to-gray-400' }
      ]
    }
  };

  // Features data
  const features = [
    { title: "QR Integration", desc: "Instant digital profile sharing with custom QR codes", icon: "📱" },
    { title: "NFC Technology", desc: "One-tap connection with any NFC-enabled device", icon: "📡" },
    { title: "Premium Materials", desc: "Durable plastic & metal options with lasting quality", icon: "💎" },
    { title: "Custom Design", desc: "Tailored to your brand with multiple color options", icon: "🎨" }
  ];

  // How it works steps
  const howItWorks = [
    { step: 1, title: "Sign Up", desc: "Create your TouchYatra account in seconds" },
    { step: 2, title: "Build Profile", desc: "Add your professional details and contact info" },
    { step: 3, title: "Design Card", desc: "Choose material, color and customize your card" },
    { step: 4, title: "Purchase", desc: "Complete your order with secure payment" },
    { step: 5, title: "Receive & Connect", desc: "Get your card and start networking instantly" }
  ];

  // Testimonials
  const testimonials = [
    { name: "Priya Sharma", role: "Marketing Director", content: "TouchYatra transformed how I network. The metal card feels premium and the NFC feature is a game changer!" },
    { name: "Raj Mehta", role: "Tech Entrepreneur", content: "I've handed out hundreds of digital cards. The analytics feature helps me track connections effectively." },
    { name: "Ananya Patel", role: "Sales Executive", content: "The custom design options allowed me to match my company branding perfectly. Highly recommended!" }
  ];

  // Pricing plans
  const pricingPlans = [
    { name: "Plastic Card", price: "₹499", features: ["QR Code", "Basic Design", "Standard Shipping", "6 Month Warranty"], popular: false },
    { name: "Metal Card", price: "₹1,299", features: ["QR & NFC", "Premium Design", "Express Shipping", "1 Year Warranty", "Analytics Dashboard"], popular: true }
  ];

  // Use Cases with ocean colors
  const useCases = [
    {
      title: "Business Conferences",
      desc: "Make memorable connections at events without the hassle of paper cards",
      icon: "🤝",
      color: oceanPalette.primary,
      image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Sales Teams",
      desc: "Empower your sales force with digital cards that track engagement",
      icon: "💼",
      color: oceanPalette.primary,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Entrepreneurs",
      desc: "Stand out from the crowd with premium digital networking",
      icon: "🚀",
      color: oceanPalette.primary,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Freelancers",
      desc: "Share your portfolio and contact details in one tap",
      icon: "🎨",
      color: oceanPalette.primary,
      image: "https://images.unsplash.com/photo-1559028006-44a36f1143d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Security Features
  const securityFeatures = [
    { title: "Data Encryption", desc: "All your information is securely encrypted", icon: "🔒" },
    { title: "Privacy Controls", desc: "Choose what information you share and with whom", icon: "👁️" },
    { title: "Secure Payments", desc: "Bank-level security for all transactions", icon: "💳" },
    { title: "GDPR Compliant", desc: "Fully compliant with data protection regulations", icon: "📜" }
  ];

  // Stats
  const stats = [
    { value: "50K+", label: "Happy Users" },
    { value: "120K+", label: "Cards Created" },
    { value: "1M+", label: "Connections Made" },
    { value: "24/7", label: "Support Available" }
  ];

  // Comparison data
  const comparisonData = [
    { feature: "Instant Sharing", touchYatra: true, traditional: false },
    { feature: "Eco-Friendly", touchYatra: true, traditional: false },
    { feature: "Analytics", touchYatra: true, traditional: false },
    { feature: "Easy Updates", touchYatra: true, traditional: false },
    { feature: "Premium Feel", touchYatra: true, traditional: false },
    { feature: "Cost Effective", touchYatra: true, traditional: true }
  ];

  // Gallery items
  const galleryItems = [
    {
      id: 1,
      title: "Ocean Blue",
      category: "plastic",
      color: "primary",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Sky Blue",
      category: "plastic",
      color: "sky",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Deep Sea",
      category: "plastic",
      color: "deep",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Silver",
      category: "metal",
      color: "silver",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Steel Blue",
      category: "metal",
      color: "steel",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Platinum",
      category: "metal",
      color: "platinum",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Technology details
  const techDetails = [
    {
      title: "QR Code Technology",
      desc: "Each TouchYatra card comes with a unique QR code that links directly to your digital profile. When scanned, it instantly displays your contact information, social media links, and portfolio.",
      icon: "📱",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "NFC Technology",
      desc: "Near Field Communication (NFC) allows you to share your information with a simple tap. Compatible with all modern smartphones, NFC provides a seamless networking experience.",
      icon: "📡",
      image: "https://images.unsplash.com/photo-1581091226835-a9a0a9b5a2f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Digital Profile",
      desc: "Your TouchYatra profile is your professional hub. Update your information anytime, add links to your social media, portfolio, and even schedule meetings directly from your profile.",
      icon: "👤",
      image: "https://images.unsplash.com/photo-1559028006-44a36f1143d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Amit Patel",
      role: "CEO & Founder",
      bio: "Serial entrepreneur with a passion for innovative networking solutions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      bio: "Tech visionary with 15+ years of experience in digital solutions.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Raj Mehta",
      role: "Head of Design",
      bio: "Creative director focused on user experience and product design.",
      image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Ananya Patel",
      role: "Marketing Director",
      bio: "Marketing strategist with expertise in brand building and growth.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  // Blog posts
  const blogPosts = [
    {
      title: "The Future of Networking: Digital Business Cards",
      excerpt: "Discover why digital business cards are revolutionizing professional networking...",
      date: "May 15, 2023",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "How NFC Technology is Changing Business Interactions",
      excerpt: "Learn how NFC technology is making networking faster and more efficient...",
      date: "April 28, 2023",
      image: "https://images.unsplash.com/photo-1581091226835-a9a0a9b5a2f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Eco-Friendly Networking: The Environmental Impact of Digital Cards",
      excerpt: "Understand how switching to digital cards can reduce your carbon footprint...",
      date: "April 10, 2023",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Digital Networking Benefits
  const networkingBenefits = [
    {
      title: "Eco-Friendly",
      description: "Reduce paper waste and environmental impact with digital alternatives",
      icon: "🌱",
      stat: "Save 100+ paper cards per year"
    },
    {
      title: "Always Updated",
      description: "Change your contact information instantly without reprinting",
      icon: "🔄",
      stat: "Update details in real-time"
    },
    {
      title: "Analytics Dashboard",
      description: "Track who views your card and when with detailed analytics",
      icon: "📊",
      stat: "Monitor engagement metrics"
    },
    {
      title: "Multi-Platform",
      description: "Share your profile across all devices and platforms seamlessly",
      icon: "📱",
      stat: "Works on iOS, Android & Web"
    },
    {
      title: "Enhanced Security",
      description: "Protect your data with advanced encryption and privacy controls",
      icon: "🔒",
      stat: "Bank-level security standards"
    },
    {
      title: "Cost Effective",
      description: "Save money in the long run with no reprinting costs",
      icon: "💰",
      stat: "Reduce networking costs by 70%"
    }
  ];

  // Filter gallery items based on active tab
  const filteredGalleryItems = activeGalleryTab === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeGalleryTab);

    const signinRoute = getRoute(RouteNames.auth.SignIn);
    const signupRoute = getRoute(RouteNames.auth.SignUp);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${oceanPalette.primary} flex items-center justify-center text-white font-bold mr-3`}>
              T
            </div>
            <span className="text-xl font-bold text-gray-900">TouchYatra</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Features', 'Benefits', 'Gallery', 'Technology', 'How It Works', 'Use Cases', 'Pricing', 'Testimonials', 'Team', 'Blog'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-gray-600 ${oceanPalette.hover} font-medium transition-colors`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`text-gray-700 ${oceanPalette.hover} font-medium transition-colors`}
              onClick={() => navigate(signinRoute?.path || "")}
              {...signinRoute?.preloadProps}
            >
              Log In
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 bg-gradient-to-r ${oceanPalette.primary} text-white rounded-lg font-medium shadow-md`}
              onClick={() => navigate(signupRoute?.path || "")}
              {...signupRoute?.preloadProps}
              >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-3">
              {['Home', 'Features', 'Benefits', 'Gallery', 'Technology', 'How It Works', 'Use Cases', 'Pricing', 'Testimonials', 'Team', 'Blog'].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`text-gray-600 ${oceanPalette.hover} font-medium py-2 transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <button className={`text-gray-700 ${oceanPalette.hover} font-medium py-2 transition-colors`}
                 {...signinRoute.preloadProps}
                  onClick={() => navigate(signinRoute?.path || "")}
                >
                  Log In
                </button>
                <button className={`px-5 py-2 bg-gradient-to-r ${oceanPalette.primary} text-white rounded-lg font-medium shadow-md`}
                    {...signupRoute.preloadProps}
                  onClick={() => navigate(signupRoute?.path || "")}>
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden pt-24">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid bg-repeat" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Ocean wave shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full transform -translate-x-1/2 translate-y-1/2 opacity-50"></div>

        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-32">
            <path fill="#dbeafe" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 bg-white shadow-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-blue-600"></span>
                <span className="text-sm font-medium text-gray-700">PREMIUM DIGITAL CARDS</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Transform Your <span className="text-blue-600">Networking</span> with TouchYatra
              </h1>

              <p className="text-lg text-gray-600 mb-10 max-w-lg">
                Create your digital profile, customize your premium card, and share your details instantly with QR and NFC technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 bg-gradient-to-r ${oceanPalette.primary} text-white rounded-lg font-semibold text-lg flex items-center justify-center shadow-lg`}
                  {...signupRoute.preloadProps}
                  onClick={() => navigate(signupRoute?.path || "")}
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg flex items-center justify-center"
                >
                  Watch Demo
                </motion.button>
              </div>

              {/* Feature tabs */}
              <div className="bg-white rounded-xl p-1 inline-flex mb-6 shadow-sm">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeFeature === index ? `bg-gradient-to-r ${oceanPalette.primary} text-white shadow-sm` : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {feature.title}
                  </button>
                ))}
              </div>

              {/* Active feature display */}
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{features[activeFeature].icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">{features[activeFeature].title}</h3>
                    <p className="text-gray-600">{features[activeFeature].desc}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Card Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                {/* Card material selector */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex p-1 bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => setCardType('plastic')}
                      className={`px-6 py-3 rounded-md text-sm font-semibold transition-colors ${cardType === 'plastic' ? `bg-gradient-to-r ${oceanPalette.primary} text-white` : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Plastic Card
                    </button>
                    <button
                      onClick={() => setCardType('metal')}
                      className={`px-6 py-3 rounded-md text-sm font-semibold transition-colors ${cardType === 'metal' ? `bg-gradient-to-r ${oceanPalette.primary} text-white` : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Metal Card
                    </button>
                  </div>
                </div>

                {/* Card display */}
                <div className="relative mx-auto" style={{ width: '420px', height: '260px' }}>
                  {/* Card shadow */}
                  <div className="absolute inset-0 rounded-2xl shadow-lg" style={{
                    backgroundColor: cardType === 'metal' ? '#e5e7eb' : '#dbeafe',
                    transform: 'translate(8px, 8px)'
                  }}></div>

                  {/* Main card */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl overflow-hidden shadow-lg ${oceanPalette.cardOptions[cardType].find(c => c.value === cardColor)?.class}`}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card content */}
                    <div className="p-8 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-bold mb-1 text-white">
                              TouchYatra
                            </h3>
                            <p className="text-sm text-white/80">
                              {cardType === 'metal' ? 'Metal Edition' : 'Plastic Edition'}
                            </p>
                          </div>
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
                          </div>
                        </div>

                        {/* Tech features row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-white">
                              QR Ready
                            </span>
                          </div>

                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-white">
                              NFC Enabled
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs mb-1 text-white/80">
                            Scan or tap to connect
                          </p>
                          <p className="text-xs font-semibold text-white">
                            yourname.touchyatra.com
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs mb-1 text-white/80">
                            Premium Quality
                          </p>
                          <div className="flex items-center justify-end">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating tech badges */}
                  <motion.div
                    className={`absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r ${oceanPalette.primary} text-white rounded-full text-xs font-semibold shadow-lg`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    DIGITAL NETWORKING
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 px-4 py-2 bg-gray-800 text-white rounded-full text-xs font-semibold shadow-lg"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    PREMIUM QUALITY
                  </motion.div>
                </div>

                {/* Color selector */}
                <div className="mt-8">
                  <h3 className="text-center font-medium text-gray-700 mb-3">Choose Color</h3>
                  <div className="flex justify-center space-x-4">
                    {oceanPalette.cardOptions[cardType].map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setCardColor(color.value)}
                        className={`w-10 h-10 rounded-full ${color.class} ${cardColor === color.value ? `ring-2 ring-offset-2 ${oceanPalette.ring}` : ''}`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 bg-gradient-to-r ${oceanPalette.dark} text-white`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Networking Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Digital Networking Benefits</h2>
            <p className="text-lg text-gray-600">Why digital business cards are the future of professional networking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networkingBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {benefit.stat}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 bg-gradient-to-r ${oceanPalette.primary} text-white rounded-lg font-medium`}
            >
              Explore All Benefits
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Premium Features</h2>
            <p className="text-lg text-gray-600">Everything you need to elevate your networking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Card Gallery</h2>
            <p className="text-lg text-gray-600">Explore our premium card designs and materials</p>
          </div>

          {/* Gallery Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-gray-100 rounded-lg">
              {['all', 'plastic', 'metal'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveGalleryTab(tab)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${activeGalleryTab === tab ? `bg-white ${oceanPalette.text} shadow-sm` : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {tab === 'all' ? 'All Cards' : tab.charAt(0).toUpperCase() + tab.slice(1) + ' Cards'}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.category === 'plastic' ? 'Plastic Card' : 'Metal Card'}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Technology</h2>
            <p className="text-lg text-gray-600">Innovative solutions powering your digital networking experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techDetails.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{tech.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">{tech.title}</h3>
                  </div>
                  <p className="text-gray-600">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How TouchYatra Works</h2>
            <p className="text-lg text-gray-600">Get your premium digital card in five simple steps</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 to-cyan-200"></div>

            <div className="space-y-12">
              {howItWorks.map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0 md:pr-12">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-xl shadow-md max-w-md border border-gray-100"
                    >
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${oceanPalette.primary} flex items-center justify-center text-white font-bold mr-3`}>
                          {step.step}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.desc}</p>
                    </motion.div>
                  </div>

                  <div className="md:w-1/2 flex justify-center md:justify-start md:pl-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${oceanPalette.primary} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                    >
                      {step.step}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Perfect For Every Professional</h2>
            <p className="text-lg text-gray-600">Discover how TouchYatra fits your networking needs</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {useCases.map((useCase, index) => (
              <button
                key={index}
                onClick={() => setActiveUseCase(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${activeUseCase === index ? `bg-gradient-to-r ${useCase.color} text-white shadow-md` : 'bg-white text-gray-600 hover:text-gray-900 shadow-sm'}`}
              >
                {useCase.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeUseCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className={`md:w-2/5 p-8 flex items-center justify-center bg-gradient-to-br ${useCases[activeUseCase].color} text-white`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{useCases[activeUseCase].icon}</div>
                  <h3 className="text-2xl font-bold">{useCases[activeUseCase].title}</h3>
                </div>
              </div>
              <div className="md:w-3/5 p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{useCases[activeUseCase].title}</h3>
                <p className="text-gray-600 mb-6">{useCases[activeUseCase].desc}</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="shrink-0 mt-1">
                      <svg className={`h-5 w-5 ${oceanPalette.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">Share your digital profile instantly with anyone</p>
                  </div>
                  <div className="flex items-start">
                    <div className="shrink-0 mt-1">
                      <svg className={`h-5 w-5 ${oceanPalette.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">Track who views your card and when</p>
                  </div>
                  <div className="flex items-start">
                    <div className="shrink-0 mt-1">
                      <svg className={`h-5 w-5 ${oceanPalette.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">Update your information anytime, anywhere</p>
                  </div>
                </div>

                <button className={`mt-8 px-6 py-3 bg-gradient-to-r ${oceanPalette.primary} text-white rounded-lg font-medium`}>
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Your Security is Our Priority</h2>
            <p className="text-lg text-gray-600">We've built TouchYatra with industry-leading security features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Digital vs Traditional</h2>
            <p className="text-lg text-gray-600">See why TouchYatra is the future of networking</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-12 border-b">
              <div className="col-span-5 p-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Features</h3>
              </div>
              <div className="col-span-3 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-l">
                <h3 className="text-lg font-bold text-center text-blue-600">TouchYatra</h3>
              </div>
              <div className="col-span-4 p-6 bg-gray-50 border-l">
                <h3 className="text-lg font-bold text-center text-gray-700">Traditional Cards</h3>
              </div>
            </div>

            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-6">
                  <p className="text-gray-700">{item.feature}</p>
                </div>
                <div className="col-span-3 p-6 border-l flex justify-center">
                  {item.touchYatra ? (
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="col-span-4 p-6 border-l flex justify-center">
                  {item.traditional ? (
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the perfect plan for your networking needs</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`w-full max-w-md rounded-2xl overflow-hidden shadow-lg ${plan.popular ? 'ring-2 ring-blue-500 relative transform scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className={`bg-gradient-to-r ${oceanPalette.primary} text-white text-center py-2 text-sm font-semibold`}>
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600"> / card</span>
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className={`h-5 w-5 ${oceanPalette.text} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.popular ? `bg-gradient-to-r ${oceanPalette.primary} text-white hover:shadow-lg` : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    {...signupRoute.preloadProps}
                    onClick={() => navigate(signupRoute?.path || "")}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Premium Card Designs</h2>
            <p className="text-lg text-gray-600">Choose from our collection of professional card designs</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setCardType('plastic')}
                  className={`px-6 py-3 rounded-md text-sm font-semibold transition-colors ${cardType === 'plastic' ? `bg-gradient-to-r ${oceanPalette.primary} text-white` : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Plastic Cards
                </button>
                <button
                  onClick={() => setCardType('metal')}
                  className={`px-6 py-3 rounded-md text-sm font-semibold transition-colors ${cardType === 'metal' ? `bg-gradient-to-r ${oceanPalette.primary} text-white` : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Metal Cards
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {oceanPalette.cardOptions[cardType].map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 shadow-sm"
                >
                  <div className="mb-4">
                    <div className="relative mx-auto" style={{ width: '320px', height: '200px' }}>
                      {/* Card shadow */}
                      <div className="absolute inset-0 rounded-xl shadow-md" style={{
                        backgroundColor: cardType === 'metal' ? '#e5e7eb' : '#dbeafe',
                        transform: 'translate(6px, 6px)'
                      }}></div>

                      {/* Card */}
                      <div className={`absolute inset-0 rounded-xl overflow-hidden shadow-md ${color.class}`}>
                        <div className="p-6 h-full flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-bold mb-1 text-white">
                                  TouchYatra
                                </h3>
                                <p className="text-xs text-white/80">
                                  {cardType === 'metal' ? 'Metal Edition' : 'Plastic Edition'}
                                </p>
                              </div>
                              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-white/80">
                                Scan or tap to connect
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/80">
                                Premium Quality
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-center text-gray-900">{color.name}</h3>
                  <p className="text-sm text-center text-gray-600 mt-1">
                    {cardType === 'metal' ? 'Premium metal finish' : 'Durable plastic material'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind TouchYatra</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className={`${oceanPalette.text} mb-3`}>{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Join thousands of professionals who transformed their networking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center text-blue-800 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Latest from Our Blog</h2>
            <p className="text-lg text-gray-600">Insights, tips, and trends in digital networking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a href="#" className={`${oceanPalette.text} font-medium ${oceanPalette.hover} transition-colors`}>
                    Read More →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className={`px-6 py-3 bg-gradient-to-r ${oceanPalette.primary} text-white rounded-lg font-medium`}>
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-r ${oceanPalette.dark} text-white`}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Networking?</h2>
            <p className="text-xl text-blue-100 mb-10">Join thousands of professionals using TouchYatra to make meaningful connections</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg shadow-lg"
              >
                Create Your Card
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg"
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${oceanPalette.primary} flex items-center justify-center text-white font-bold mr-3`}>
                  T
                </div>
                <span className="text-xl font-bold text-white">TouchYatra</span>
              </div>
              <p className="mb-4">Premium digital cards for modern professionals.</p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Design Gallery', 'FAQ'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <address className="not-italic space-y-2">
                <p>123 Business Avenue</p>
                <p>Mumbai, Maharashtra 400001</p>
                <p>Email: info@touchyatra.com</p>
                <p>Phone: +91 98765 43210</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} TouchYatra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};