import React, { useState } from 'react';
import Aaa from './Aaa.jsx';
const Home = () => {
    const [showAaa, setShowAaa] = useState(false);
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
            {showAaa ? ( <Aaa/> ) : null}
            
        </div>
    );
};

export default Home;