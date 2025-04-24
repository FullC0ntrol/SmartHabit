import React, { useState } from 'react';
import Aaa from './Aaa.jsx';
import useAuth from '../hooks/useAuth.jsx';
import MyCalendar from '../components/MyCalendar.jsx';

const Home = () => {
    const [showAaa, setShowAaa] = useState(false);
    const { logout } = useAuth(); // Używamy hooka do obsługi logowania


    const handleCheckboxChange = (event) => {
        setShowAaa(event.target.checked);
        console.log(showAaa);
    };
    return (
        <div>
            <h1>Home Component</h1>
            <p>This is where the calendar will be displayed.</p>
            <input 
                    type="checkbox" 
                    id="box"
                    onChange={handleCheckboxChange}
                    checked={showAaa}
            />
            {showAaa ? ( <MyCalendar/> ) : null}
            <button
                    onClick={logout}
            >LOGNIJ</button>
        </div>
    );
};

export default Home;
