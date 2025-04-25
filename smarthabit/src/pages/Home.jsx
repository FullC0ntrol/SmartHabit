import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion';
import { 
  RiCalendarLine, 
  RiRunLine, 
  RiLightbulbLine,
  RiSettingsLine,
  RiLogoutCircleLine,
  RiHomeLine 
} from 'react-icons/ri';
import useAuth from '../hooks/useAuth.jsx';
import CalendarPage from './CalendarPage.jsx';


const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAaa, setShowAaa] = useState(false);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 400 });
  const { logout } = useAuth();

  const tabs = [
    { id: 'home', icon: <RiHomeLine size={24} />, label: 'Pulpit', color: 'text-blue-400' },
    { id: 'calendar', icon: <RiCalendarLine size={24} />, label: 'Kalendarz', color: 'text-purple-400' },
    { id: 'training', icon: <RiRunLine size={24} />, label: 'Trening', color: 'text-green-400' },
    { id: 'ideas', icon: <RiLightbulbLine size={24} />, label: 'Pomysły', color: 'text-yellow-400' },
    { id: 'settings', icon: <RiSettingsLine size={24} />, label: 'Ustawienia', color: 'text-gray-400' },
    { id: 'logout', icon: <RiLogoutCircleLine size={24} />, label: 'Wyloguj', color: 'text-red-400' },
  ];

  const handleMouseMove = (e) => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    }
  };

  const handleTabClick = (tabId) => {
    if (tabId === 'logout') {
      logout();
    } else {
      setActiveTab(tabId);
      setError(null);
      // Play sound on click
      const audio = new Audio('https://www.soundjay.com/buttons/button-1.mp3');
      audio.play().catch(() => {});
    }
  };

  const handleCheckboxChange = (event) => {
    setShowAaa(event.target.checked);
  };

  useEffect(() => {
    if (hoveredIndex !== null) {
      animate('#liquid-blob', { scale: 1.2 }, { duration: 0.3 });
    } else {
      animate('#liquid-blob', { scale: 1 }, { duration: 0.5 });
    }
  }, [hoveredIndex]);

  // Generowanie cząsteczek
  const particles = Array.from({ length: 15 }).map(() => ({
    width: Math.random() * 100 + 50,
    height: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 100,
    duration: Math.random() * 10 + 10,
  }));

  // Komponent z obsługą błędów
  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'home':
          return <DashboardContent />;
        case 'calendar':
          return (
            <div className="w-full h-full flex justify-center items-center">
              <CalendarPage />
            </div>
          );
        case 'training':
          return <TrainingContent />;
        case 'ideas':
          return <IdeasContent />;
        case 'settings':
          return <SettingsContent />;
        default:
          return <div className="text-white text-2xl">Wybierz zakładkę</div>;
      }
    } catch (err) {
      setError('Wystąpił błąd podczas renderowania treści. Spróbuj ponownie.');
      return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Efekt holograficznego tła */}
      <div className="absolute inset-0 opacity-20">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              x: [0, particle.x, 0],
              y: [0, particle.y, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Główne menu */}
      <motion.nav
        ref={menuRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative z-10 w-64 h-full bg-gray-800/50 backdrop-blur-lg border-r border-gray-700/50 p-6"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Logo */}
        <div className="text-white text-2xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          SmartHabit
        </div>

        {/* Liquid Cursor Blob */}
        <motion.div
          id="liquid-blob"
          className="absolute w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl pointer-events-none"
          style={{ x: springX, y: springY }}
        />

        {/* Menu Items */}
        {tabs.map((tab, index) => (
          <motion.div
            key={tab.id}
            className={`flex items-center space-x-4 p-3 rounded-lg mb-2 cursor-pointer relative overflow-hidden ${
              activeTab === tab.id ? 'bg-gray-700/50' : ''
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => handleTabClick(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`text-2xl ${tab.color}`}>{tab.icon}</div>
            <span className={`text-lg font-medium ${tab.color}`}>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 border-l-4 border-blue-500"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </motion.nav>

      {/* Główna zawartość */}
      <main className="absolute left-64 right-0 top-0 bottom-0 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {error ? (
              <div className="text-red-400 text-xl">{error}</div>
            ) : (
              renderContent()
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Komponenty placeholderowe
const DashboardContent = () => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center max-w-2xl">
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Witaj w SmartHabit
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Twoje narzędzie do śledzenia nawyków i osiągania celów
      </p>
    </div>
  </div>
);

const TrainingContent = () => <div className="p-8 text-white">Trening - W budowie</div>;
const IdeasContent = () => <div className="p-8 text-white">Pomysły - W budowie</div>;
const SettingsContent = () => <div className="p-8 text-white">Ustawienia - W budowie</div>;

export default Home;