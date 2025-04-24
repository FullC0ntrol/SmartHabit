import { useState } from 'react';
import useRegister from '../hooks/useRegister'; // Zmieniamy ścieżkę na '../hooks/useRegister'


export default function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, isLoading } = useRegister(); // Używamy hooka

  const handleRegister = async () => {
    const isSuccessful = await register(username, password);

    if (isSuccessful) {
      onRegisterSuccess(); // Po udanej rejestracji przełączamy do logowania
      alert('Rejestracja udana! Możesz się zalogować.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl mb-4">Rejestracja</h2>
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
        onClick={handleRegister}
        disabled={isLoading}
        className={`bg-green-500 text-white p-2 w-full rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
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
