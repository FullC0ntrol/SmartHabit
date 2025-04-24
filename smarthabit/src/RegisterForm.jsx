import { useState } from 'react';

export default function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onRegisterSuccess();
        alert('Rejestracja udana! Możesz się zalogować.');
      } else {
        setError(data.error || 'Błąd rejestracji');
      }
    } catch (err) {
      setError('Błąd serwera. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl mb-4">Rejestracja HUJA TAM</h2>
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
        onClick={register}
        disabled={isLoading}
        className={`bg-green-500 text-white p-2 w-full rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
        }`}
      >
        {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
      </button>
      <p className="mt-4 text-center">
        Masz już konto?{' '}
        <button
          onClick={onRegisterSuccess}
          className="text-blue-500 hover:underline"
          disabled={isLoading}
        >
          Zaloguj się
        </button>
      </p>
    </div>
  );
}