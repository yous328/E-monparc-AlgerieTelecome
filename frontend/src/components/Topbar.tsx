import { Bell, User, Moon, Search } from 'lucide-react'; // <== import Search here

export function Topbar() {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
            {/* Search Bar */}
            <div className="flex-1">
                <div className="relative w-full max-w-8xl">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="p-2 pl-10 bg-[#EAEFED] rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {/* Real Black Search Icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#EAEFED]">
                        <Search size={14} />
                    </div>
                </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3 ml-6">
                <button className="p-2 bg-[#EAEFED] rounded-md hover:bg-gray-200">
                    <Moon size={20} />
                </button>
                <button className="p-2 bg-[#EAEFED] rounded-md hover:bg-gray-200 relative">
                    <Bell size={20} />
                </button>
                <button className="p-2 bg-[#EAEFED] rounded-md hover:bg-gray-200">
                    <User size={20} />
                </button>
            </div>
        </header>
    );
}
