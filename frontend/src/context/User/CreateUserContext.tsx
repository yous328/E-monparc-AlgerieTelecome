import { createContext, useContext } from 'react';
import { IAuthContext } from '../../interfaces/IAuthContext';

// Create the Auth Context
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

// useAuth Hook to access context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}
