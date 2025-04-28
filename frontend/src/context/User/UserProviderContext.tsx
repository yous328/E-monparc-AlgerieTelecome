import { useState } from 'react';
import { UserContext } from './CreateUserContext';
import { IUser } from '../../interfaces/IUser';

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
