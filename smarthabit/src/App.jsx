import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import useAuth from './hooks/useAuth';
import Home from './pages/Home.jsx';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const { isLoggedIn, login, logout, loading: authLoading } = useAuth();

  if (authLoading) {
    return <p>Ładowanie autoryzacji...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!isLoggedIn ? (
        showRegister ? (
          <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <LoginForm
            onLoginSuccess={({ username, token }) => {
              login(username, token); // Wywołujemy funkcję login z useAuth
            }}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )
      ) : (
        <div className="w-full">
          <div className="flex justify-end p-4">
            <button
              onClick={logout}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Wyloguj
            </button>
          </div>
          <Home />
        </div>
      )}
    </div>
  );
}

export default App;