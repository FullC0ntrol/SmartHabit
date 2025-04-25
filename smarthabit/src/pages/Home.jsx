import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.jsx';
import CalendarPage from './CalendarPage.jsx';

const Home = () => {
    const [showAaa, setShowAaa] = useState(false);
    const [activeTab, setActiveTab] = useState('Kalendarz');
    const [error, setError] = useState(null);
    const { logout } = useAuth();

    const handleCheckboxChange = (event) => {
        setShowAaa(event.target.checked);
    };

    const tabs = ['Kalendarz', 'Spis Ćwiczeń', 'Trening', 'Pomysły', 'Ustawienia', 'Wyloguj'];

    const handleTabClick = (tab) => {
        if (tab === 'Wyloguj') {
            logout();
        } else {
            setActiveTab(tab);
            setError(null); // Reset błędu przy zmianie zakładki
        }
    };

    // Particle animation setup
    useEffect(() => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return; // Zabezpieczenie przed brakiem canvasa

        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        const numberOfParticles = 100;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };
        initParticles();

        // Animation loop
        const animate = () => {
            if (!ctx) return; // Zabezpieczenie przed brakiem kontekstu
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                // Connect particles
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[j].x);
                        ctx.lineTo(particlesArray[i].y, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    // Komponent z obsługą błędów
    const renderContent = () => {
        try {
            switch (activeTab) {
                case 'Kalendarz':
                    return (
                        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <CalendarPage />
                        </div>
                    );
                case 'Spis Ćwiczeń':
                    return <div className="text-white text-2xl">Spis Ćwiczeń - W budowie</div>;
                case 'Trening':
                    return <div className="text-white text-2xl">Trening - W budowie</div>;
                case 'Pomysły':
                    return <div className="text-white text-2xl">Pomysły - W budowie</div>;
                case 'Ustawienia':
                    return <div className="text-white text-2xl">Ustawienia - W budowie</div>;
                default:
                    return <div className="text-white text-2xl">Wybierz zakładkę</div>;
            }
        } catch (err) {
            setError('Wystąpił błąd podczas renderowania treści. Spróbuj ponownie.');
            return null;
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
            {/* Particle Canvas Background */}
            <canvas
                id="particle-canvas"
                className="absolute inset-0 z-0"
            ></canvas>

            {/* Glassmorphism Navigation Bar */}
            <nav className="relative z-10 flex justify-center pt-6">
                <div className="flex space-x-4 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-white/20">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-4 py-2 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                                activeTab === tab && tab !== 'Wyloguj'
                                    ? 'bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                    : 'hover:bg-blue-500/50'
                            } ${tab === 'Wyloguj' ? 'text-red-400 hover:bg-red-500/50' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-80px)]">
                {error ? (
                    <div className="text-red-400 text-xl">{error}</div>
                ) : (
                    renderContent()
                )}
            </div>
        </div>
    );
};

export default Home;