import { Bell, User, Moon, Search, Menu } from 'lucide-react';

interface TopbarProps {
    onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
    return (
        <header className="flex items-center justify-between p-2 sm:px-6 py-3 bg-white shadow-sm sticky top-0 z-10">
            {/* Mobile Menu Button */}
            <button 
                onClick={onMenuClick} 
                className="p-2 rounded-md hover:bg-gray-200 lg:hidden"
                aria-label="Toggle menu"
            >
                <Menu size={20} />
            </button>
            
            {/* Search Bar */}
            <div className="flex-1 mx-2 sm:mx-4">
                <div className="relative w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="p-2 pl-10 bg-[#EAEFED] rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300 text-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Search size={16} className="text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
                <button className="p-2 bg-[#EAEFED] rounded-md hover:bg-gray-200" aria-label="Toggle dark mode">
                    <Moon size={18} />
                </button>
                <button className="p-2 bg-[#EAEFED] rounded-md hover:bg-gray-200 relative" aria-label="Notifications">
                    <Bell size={18} />
                </button>
                <button className="p-2 bg-[#EAEFED] rounded-md hover:bg-gray-200" aria-label="User profile">
                    <User size={18} />
                </button>
            </div>
        </header>
    );
}
