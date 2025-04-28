import { Bell, User, RefreshCcw } from 'lucide-react';

export function Topbar() {
    return (
        <header className="flex items-center justify-between p-4 bg-green-50 shadow-sm">
            {/* Search Bar */}
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="p-2 rounded-lg w-full max-w-md border focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 ml-6">
                <button className="p-2 rounded-full hover:bg-green-100">
                    <RefreshCcw size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-green-100 relative">
                    <Bell size={20} />
                    {/* Optional: Notification badge */}
                    {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
                </button>
                <button className="p-2 rounded-full hover:bg-green-100">
                    <User size={20} />
                </button>
            </div>
        </header>
    );
}
