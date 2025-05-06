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
        <aside className="w-64 min-h-screen bg-[#EAEFED] p-6 flex flex-col justify-between">
            {/* Logo Section */}
            <div>
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-cursive">E-mon parc</h1>
                </div>

                {/* Separator Line */}
                <div className="border-t-2 border-white w-full mb-8"></div>

                {/* Navigation */}
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
                    className="flex items-center gap-2 text-black hover:text-gray-700 font-medium"
                >
                    <LogOut size={20} />
                    Déconnecter
                </button>
            </div>
        </aside>
    );
}

// Sub-component for Sidebar Link
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
            className={`flex items-center gap-3 p-3 rounded-lg ${
                active 
                ? 'bg-white text-black font-bold' 
                : 'text-black hover:font-bold'
            }`}
        >
            <Icon size={20} />
            {label}
        </Link>
    );
}
