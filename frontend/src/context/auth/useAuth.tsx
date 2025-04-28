import { useContext } from 'react';
import { AuthContext } from './CreateAuthContext';

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}
