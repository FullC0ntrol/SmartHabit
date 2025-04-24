import { useState } from 'react';

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        onLoginSuccess(data.username);
      } else {
        setError(data.error || 'Błąd logowania');
      }
    } catch (err) {
      setError('Błąd serwera. Spróbuj ponownie.', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl mb-4">Logowanie</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
        onClick={login}
        disabled={isLoading}
        className={`bg-blue-500 text-white p-2 w-full rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Logowanie...' : 'Zaloguj się'}
      </button>
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