import React, { useState } from 'react';
import Aaa from './Aaa.jsx';
import useAuth from '../hooks/useAuth.jsx';
import CalendarPage from './CalendarPage.jsx';
const Home = () => {
    const [showAaa, setShowAaa] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const { logout } = useAuth(); // Używamy hooka do obsługi logowania

    const handleCheckboxChange = (event) => {
        setShowAaa(event.target.checked);
        console.log(showAaa);
    };

    const toggleCalendar  = () => {
        setShowCalendar(!showCalendar);
    }

    

    return (
        <div className="relative">
            
            <button 
                onClick={toggleCalendar}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 absolute"
            >
                {showCalendar ? 'Ukryj Kalendarz' : 'Pokaż Kalendarz'}
            </button>

            {/* Warunkowe renderowanie kalendarza */}
            {showCalendar && (
                <div className="w-screen h-screen bg-gray-00 flex justify-center items-center">
                    <CalendarPage />
                </div>
            )}
        </div>
    );
};

export default Home;
