// src/interfaces/User.ts

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    birth_date?: string | null;
    address?: string | null;
    email: string;
    phone_number?: string | null;
    profile_image?: string | null;
    role: 'Admin' | 'Driver' | 'Employee';
    description?: string | null;
}
