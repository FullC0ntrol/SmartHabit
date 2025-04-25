import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import useAuth from '../hooks/useAuth';

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password); // Wywołujemy login z useLogin
    if (result) {
      const token = localStorage.getItem('token'); // Pobieramy token zapisany przez useLogin
      authLogin(result, token); // Ustawiamy stan w useAuth
      onLoginSuccess({ username: result, token }); // Przekazujemy username i token
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl mb-4">Logowanie</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 text-white p-2 w-full rounded ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Nie masz konta?{' '}
        <button
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:underline"
          disabled={isLoading}
        >
          Zarejestruj się
        </button>
      </p>
    </div>
  );
}