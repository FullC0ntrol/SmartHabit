import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'; // Nowy komponent
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:3001/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok && data.valid) {
            setIsLoggedIn(true);
            setUsername(data.username);
          } else {
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Błąd weryfikacji tokenu:', err);
          localStorage.removeItem('token');
        }
      }
    };
    verifyToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!isLoggedIn ? (
        showRegister ? (
          <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <LoginForm
            onLoginSuccess={(username) => {
              setIsLoggedIn(true);
              setUsername(username);
            }}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Witaj, {username}!</h1>
          <p className="mb-4">Jesteś zalogowany.</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
}

export default App;