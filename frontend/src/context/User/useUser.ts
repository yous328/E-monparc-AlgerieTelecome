import { useContext } from 'react';
import { UserContext } from './CreateUserContext';

export function useUser() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser must be used inside a UserProvider');
    }

    return context;
}
