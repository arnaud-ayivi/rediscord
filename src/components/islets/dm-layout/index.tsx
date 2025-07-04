// src/components/islets/dm-layout/index.tsx
"use client";
import Sidebar from "@/components/layout/sidebar";
import FindChatButton from "@/components/islets/find-chat-button";
import Header from "@/components/layout/header";
import DMHeaderMenu from "@/components/islets/dm-header-menu";
import DMChannelList from "@/components/islets/dm-channel-list";
import VoiceStatusFooter from "@/components/islets/voice-status-footer";
import { ListedDMChannel } from "@/lib/entities/channel";
import {
  MOCK_DELAY,
  MOCK_CHANNELS,
  generateRandomFakeChannels,
} from "@/lib/utils/mock";
import { delay } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { BsList, BsX } from "react-icons/bs";

export const getData = async (): Promise<{ channels: ListedDMChannel[] }> => {
  const channels: ListedDMChannel[] = generateRandomFakeChannels(MOCK_CHANNELS);
  await delay(MOCK_DELAY);
  return { channels };
};

interface DMLayoutProps {
  children: React.PropsWithChildren["children"];
  channels: ListedDMChannel[];
}

function DMLayoutClient({ children, channels }: DMLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoCollapseDisabled, setAutoCollapseDisabled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const params = useParams();
  const previousChannelRef = useRef<string | null>(null);

  // Auto-collapse logic when channel changes
  useEffect(() => {
    const currentChannelId = params.id as string;

    // Only trigger auto-collapse if we actually changed channels and it's not disabled
    if (currentChannelId &&
        currentChannelId !== previousChannelRef.current &&
        !autoCollapseDisabled &&
        sidebarOpen) {

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set immediate collapse (no timer)
      setSidebarOpen(false);
    }

    previousChannelRef.current = currentChannelId;

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [params.id, autoCollapseDisabled, sidebarOpen]);

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
            <Header verticalPadding="2" className="bg-midground">
              <FindChatButton />
            </Header>
            <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
              <DMHeaderMenu />
              <DMChannelList channelsData={channels} />
            </div>
            <VoiceStatusFooter />
          </Sidebar>

          {/* Toggle Button - only show when sidebar is collapsed */}
          {!sidebarOpen && (
              <button
                  onClick={handleToggleSidebar}
                  className="fixed left-[70px] top-4 z-20 p-2 bg-midground border border-gray-600 rounded-md shadow-lg hover:bg-gray-700 transition-colors"
                  title="Open sidebar"
              >
                <BsList className="text-gray-300" fontSize={20} />
              </button>
          )}

          {/* Close button when sidebar is open */}
          {sidebarOpen && (
              <button
                  onClick={handleToggleSidebar}
                  className="fixed left-[290px] top-4 z-20 p-1 bg-midground border border-gray-600 rounded-md shadow-lg hover:bg-gray-700 transition-colors"
                  title="Close sidebar"
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

export default function DMLayout({ children }: React.PropsWithChildren) {
  return <DMLayoutContent>{children}</DMLayoutContent>;
}

async function DMLayoutContent({ children }: React.PropsWithChildren) {
  const { channels } = await getData();
  return <DMLayoutClient channels={channels}>{children}</DMLayoutClient>;
}