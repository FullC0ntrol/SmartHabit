import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Weryfikowanie tokenu:', token);
      if (token) {
        try {
          const res = await fetch('http://localhost:3001/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          console.log('Odpowiedź z serwera:', data);
          if (res.ok && data.valid) {
            setIsLoggedIn(true);
            setUsername(data.username);
          } else {
            console.log('Token niepoprawny lub wygasł');
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Błąd weryfikacji tokenu:', err);
          localStorage.removeItem('token');
        }
      } else {
        console.log('Brak tokenu');
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    window.location.reload();
  };

  return { isLoggedIn, username, login, logout, loading };
};

export default useAuth;