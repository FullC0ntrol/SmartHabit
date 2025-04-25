import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faListOl,
    faDumbbell,
    faLightbulb,
    faCog,
    faSignOutAlt,
    faBars, // Ikona menu
} from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth.jsx';
import CalendarPage from './CalendarPage.jsx';


const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState('home'); // Domyślnie "strona główna"
    const { logout } = useAuth();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateTo = (path) => {
        setActivePage(path);
        setIsMenuOpen(false);
        
    };

    const handleLogout = () => {
        logout();
        
    };

    return (
        <div className="relative min-h-screen bg-gray-900 text-white">
            {/* Pływające menu boczne */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 bg-opacity-75 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-6 flex flex-col h-full">
                    <h2 className="text-2xl font-bold mb-8 text-center">SmartHabit</h2>
                    <nav className="flex-grow">
                        <ul className="space-y-4">
                            <li onClick={() => navigateTo('calendar')} className={`cursor-pointer hover:bg-gray-700 rounded-md p-3 flex items-center ${activePage === 'calendar' ? 'bg-blue-600' : ''}`}>
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                                Kalendarz
                            </li>
                            <li onClick={() => navigateTo('exercises')} className={`cursor-pointer hover:bg-gray-700 rounded-md p-3 flex items-center ${activePage === 'exercises' ? 'bg-blue-600' : ''}`}>
                                <FontAwesomeIcon icon={faListOl} className="mr-3" />
                                Spis Ćwiczeń
                            </li>
                            <li onClick={() => navigateTo('workout')} className={`cursor-pointer hover:bg-gray-700 rounded-md p-3 flex items-center ${activePage === 'workout' ? 'bg-blue-600' : ''}`}>
                                <FontAwesomeIcon icon={faDumbbell} className="mr-3" />
                                Trening
                            </li>
                            <li onClick={() => navigateTo('ideas')} className={`cursor-pointer hover:bg-gray-700 rounded-md p-3 flex items-center ${activePage === 'ideas' ? 'bg-blue-600' : ''}`}>
                                <FontAwesomeIcon icon={faLightbulb} className="mr-3" />
                                Pomysły
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-8 border-t border-gray-700 pt-4">
                        <ul className="space-y-4">
                            <li onClick={() => navigateTo('settings')} className={`cursor-pointer hover:bg-gray-700 rounded-md p-3 flex items-center ${activePage === 'settings' ? 'bg-blue-600' : ''}`}>
                                <FontAwesomeIcon icon={faCog} className="mr-3" />
                                Ustawienia
                            </li>
                            <li onClick={handleLogout} className="cursor-pointer hover:bg-red-700 rounded-md p-3 flex items-center">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                                Wyloguj
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Przycisk otwierania menu (ikona hamburgera) */}
            <button
                onClick={toggleMenu}
                className="fixed top-4 left-4 bg-gray-800 bg-opacity-50 backdrop-blur-md text-white p-2 rounded-md z-50 hover:bg-gray-700 transition-colors duration-200"
            >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>

            {/* Główna zawartość strony z animacją w tle */}
            <div className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'ml-64' : 'ml-0'} p-8`}>
                <h1 className="text-3xl font-bold mb-6 text-center">Witaj w SmartHabit!</h1>
                {/* Animacja na środku (możesz tutaj dodać swoją niestandardową animację) */}
                <div className="flex justify-center items-center h-64 bg-gray-800 rounded-lg shadow-md">
                    <div className="animate-pulse text-blue-400 text-4xl">
                        {/* Możesz tutaj umieścić ikony związane z nawykami, które pulsują */}
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-4" />
                        <FontAwesomeIcon icon={faDumbbell} className="mr-4" />
                        <FontAwesomeIcon icon={faLightbulb} />
                        {/* Dodaj więcej ikon */}
                    </div>
                </div>

                {/* Tutaj będzie renderowana zawartość poszczególnych zakładek */}
                {activePage === 'calendar' && <div className="mt-8"><CalendarPage /></div>}
                {activePage === 'exercises' && <div className="mt-8"><ExerciseList /></div>}
                {activePage === 'workout' && <div className="mt-8"><WorkoutPage /></div>}
                {activePage === 'ideas' && <div className="mt-8"><IdeasPage /></div>}
                {activePage === 'settings' && <div className="mt-8"><SettingsPage /></div>}
                {activePage === 'home' && (
                    <div className="mt-8 text-center text-gray-300">
                        <p>Przegląd Twoich postępów i nadchodzących zadań pojawi się tutaj.</p>
                        {/* Możesz dodać dodatkowe elementy strony głównej */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;