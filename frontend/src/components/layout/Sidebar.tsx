import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/useAuth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LogoutIcon from '@mui/icons-material/Logout';

export function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    function isActive(path: string) {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    }

    return (
        <aside className="w-full h-full flex flex-col bg-white border-r border-gray-100 justify-between overflow-y-auto">
            {/* Logo Section */}
            <div>
                <div className="text-center py-5">
                    <h1 className="text-xl sm:text-3xl font-cursive italic">E-mon parc</h1>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 mt-8 px-4">
                    <SidebarLink to="/dashboard" label="Dashboard" Icon={DashboardIcon} active={isActive('/dashboard')} />
                    <SidebarLink to="/vehicles" label="Gestion des vihcules" Icon={DirectionsCarIcon} active={isActive('/vehicles')} />
                    <SidebarLink to="/missions" label="Gestion des Missions" Icon={TravelExploreIcon} active={isActive('/missions')} />
                    <SidebarLink to="/accounts" label="Gestion des Comptes" Icon={GroupIcon} active={isActive('/accounts')} />
                </nav>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-100 mt-auto">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 text-gray-600 hover:text-gray-900 font-medium px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <LogoutIcon fontSize="small" />
                    <span>Déconnecter</span>
                </button>
            </div>
        </aside>
    );
}

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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <Icon fontSize="small" className={active ? 'text-blue-600' : 'text-gray-500'} />
            <span className="truncate">{label}</span>
        </Link>
    );
}
