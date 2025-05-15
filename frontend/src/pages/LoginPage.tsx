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
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - Logo section */}
            <div className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-0 bg-gradient-to-br from-green-200 via-blue-100 to-blue-300">
                <div className="text-center px-4">
                    <img
                        src="https://www.algerietelecom.dz/assets/front/img/logo.svg"
                        alt="Algérie Télécom Logo"
                        className="mx-auto w-32 sm:w-40 md:w-48 h-auto object-contain mb-4"
                    />
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50 md:bg-white">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm p-5 sm:p-8 border border-blue-500 rounded-lg shadow-lg bg-white"
                >
                    <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-center font-cursive">E-mon Parc</h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm sm:text-base">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-sm sm:text-base"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-5 sm:mb-6">
                        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Mot de Passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-sm sm:text-base"
                            placeholder="Mot de Passe"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition duration-200 text-sm sm:text-base"
                    >
                        {loading ? 'Connexion...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}