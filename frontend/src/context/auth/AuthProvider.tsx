import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './CreateAuthContext';
import { IAuthContext } from '../../interfaces/IAuthContext';
import { IUser } from '../../interfaces/IUser';
import api from '../../lib/axios';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, []);

    async function login(email: string, password: string) {
        try {
            const response = await api.post('/login', { email, password });
            const { access_token, user } = response.data;

            localStorage.setItem('token', access_token);
            setToken(access_token);
            setUser(user);

            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Login failed:', error.message);
            } else {
                console.error('Unknown login error');
            }
            throw error;
        }
    }

    async function logout() {
        try {
            await api.post('/logout');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.warn('Logout failed:', error.message);
            } else {
                console.warn('Unknown logout error');
            }
        } finally {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            delete api.defaults.headers.common['Authorization'];
        }
    }

    const value: IAuthContext = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        setUser,
        setToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
