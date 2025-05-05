import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Right side */}
            <div className="flex-1 flex flex-col">
                <Topbar />
                {/* Page Content goes here */}
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
