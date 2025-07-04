// src/components/islets/server-layout/index.tsx
"use client";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import ServerChannelList from "@/components/islets/server-channel-list";
import VoiceStatusFooter from "@/components/islets/voice-status-footer";
import { MOCK_SERVER_DATA } from "@/lib/utils/mock-server-data";
import { delay } from "@/lib/utils";
import { MOCK_DELAY } from "@/lib/utils/mock-server-data";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { BsList, BsX } from "react-icons/bs";
import { DetailedServer } from "@/lib/entities/server";

export const getServerData = async () => {
    await delay(MOCK_DELAY);
    return { server: MOCK_SERVER_DATA };
};

interface ServerLayoutProps {
    children: React.PropsWithChildren["children"];
    server: DetailedServer;
}

function ServerLayoutClient({ children, server }: ServerLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [autoCollapseDisabled, setAutoCollapseDisabled] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const params = useParams();
    const previousChannelRef = useRef<string | null>(null);

    // Auto-collapse logic when channel changes
    useEffect(() => {
        const currentChannelId = params.channelId as string;

        // Only trigger auto-collapse if we actually changed channels and it's not disabled
        if (currentChannelId &&
            currentChannelId !== previousChannelRef.current &&
            !autoCollapseDisabled &&
            sidebarOpen) {

            // Clear any existing timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Set new timer for auto-collapse
            timerRef.current = setTimeout(() => {
                setSidebarOpen(false);
            }, 2500); // 2.5 seconds
        }

        previousChannelRef.current = currentChannelId;

        // Cleanup timer on unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [params.channelId, autoCollapseDisabled, sidebarOpen]);

    const handleToggleSidebar = () => {
        // Clear auto-collapse timer when user manually toggles
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Disable auto-collapse for this session
        setAutoCollapseDisabled(true);

        // Toggle sidebar
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            {/* Desktop Sidebar - Collapsible */}
            <div className="hidden md:block">
                <Sidebar
                    className={`bottom-0 flex flex-col transition-transform duration-300 ease-in-out ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <Header verticalPadding="2" className="bg-midground border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                S
                            </div>
                            <span className="font-semibold text-white">{server.name}</span>
                            {server.boostLevel && (
                                <div className="flex items-center gap-1 text-xs text-purple-400">
                                    <span>✨</span>
                                    <span>Lvl {server.boostLevel}</span>
                                </div>
                            )}
                        </div>
                    </Header>

                    <div className="hover-scrollbar flex-1 overflow-y-auto py-2">
                        <ServerChannelList server={server} />
                    </div>

                    {/* User Status Footer */}
                    <VoiceStatusFooter />
                </Sidebar>

                {/* Toggle Button - only show when sidebar is collapsed */}
                {!sidebarOpen && (
                    <button
                        onClick={handleToggleSidebar}
                        className="fixed left-[70px] top-4 z-20 p-2 bg-midground border border-gray-600 rounded-md shadow-lg hover:bg-gray-700 transition-colors"
                        title="Open channels"
                    >
                        <BsList className="text-gray-300" fontSize={20} />
                    </button>
                )}

                {/* Close button when sidebar is open */}
                {sidebarOpen && (
                    <button
                        onClick={handleToggleSidebar}
                        className="fixed left-[290px] top-4 z-20 p-1 bg-midground border border-gray-600 rounded-md shadow-lg hover:bg-gray-700 transition-colors"
                        title="Close channels"
                    >
                        <BsX className="text-gray-300" fontSize={16} />
                    </button>
                )}
            </div>

            {/* Main content area - adjust margin based on sidebar state */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'md:ml-[310px]' : 'md:ml-[70px]'
                }`}
            >
                {children}
            </div>
        </>
    );
}

export default function ServerLayout({ children }: React.PropsWithChildren) {
    return <ServerLayoutContent>{children}</ServerLayoutContent>;
}

async function ServerLayoutContent({ children }: React.PropsWithChildren) {
    const { server } = await getServerData();
    return <ServerLayoutClient server={server}>{children}</ServerLayoutClient>;
}