import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import useAuth from './hooks/useAuth';
import Home from './pages/Home.jsx';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const { isLoggedIn, login } = useAuth(); 


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!isLoggedIn ? (  //jeżeli nie jesteś zalogowany
        showRegister ? ( 
          <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <LoginForm
            onLoginSuccess={(username) => {
              login(username); // Wywołujemy funkcję login z useAuth
            }}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )
      ) : <Home/>}
    </div>
  );
}

export default App;