import { Sidebar } from '../components/Dashboard/Sidebare';
import { Topbar } from '../components/Dashboard/Topbar';

export function DashboardPage() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                {/* Dashboard content here */}
            </div>
        </div>
    );
}
