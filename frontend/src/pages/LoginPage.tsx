import { FormEvent, useState } from 'react';
import { useAuth } from '../context/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch {
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-blue-300">
                <div className="text-center">
                    <img
                        src="https://www.algerietelecom.dz/assets/front/img/logo.svg"
                        alt="Algérie Télécom Logo"
                        className="mx-auto w-48 h-48 object-contain mb-4"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex-1 flex items-center justify-center p-8">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm p-8 border border-blue-500 rounded-lg shadow-lg bg-white"
                >
                    <h2 className="text-3xl mb-8 text-center font-cursive">E-mon Parc</h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Mot de Passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Mot de Passe"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition duration-200"
                    >
                        {loading ? 'Connexion...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}