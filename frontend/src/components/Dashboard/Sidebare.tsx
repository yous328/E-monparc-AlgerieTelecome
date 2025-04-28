import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/useAuth';
import { Home, Car, Map, Users, LogOut } from 'lucide-react';

export function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    function isActive(path: string) {
        return location.pathname === path;
    }

    return (
        <aside className="w-64 min-h-screen bg-green-100 p-4 flex flex-col justify-between">
            {/* Top logo section */}
            <div>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-cursive">E-mon parc</h1>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4">
                    <SidebarLink to="/dashboard" label="Dashboard" Icon={Home} active={isActive('/dashboard')} />
                    <SidebarLink to="/vehicles" label="Gestion des véhicules" Icon={Car} active={isActive('/vehicles')} />
                    <SidebarLink to="/missions" label="Gestion des Missions" Icon={Map} active={isActive('/missions')} />
                    <SidebarLink to="/accounts" label="Gestion des Comptes" Icon={Users} active={isActive('/accounts')} />
                </nav>
            </div>

            {/* Logout Button */}
            <div className="mt-8">
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                >
                    <LogOut size={20} />
                    Déconnecter
                </button>
            </div>
        </aside>
    );
}

// Sub-component for Sidebar Links
interface SidebarLinkProps {
    to: string;
    label: string;
    Icon: React.ElementType;
    active: boolean;
}

function SidebarLink({ to, label, Icon, active }: SidebarLinkProps) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 p-2 rounded-lg ${active ? 'bg-white text-black font-bold' : 'text-gray-700 hover:bg-white hover:text-black'}`}
        >
            <Icon size={20} />
            {label}
        </Link>
    );
}
