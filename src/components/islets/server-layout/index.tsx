import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import ServerChannelList from "@/components/islets/server-channel-list";
import { MOCK_SERVER_DATA } from "@/lib/utils/mock-server-data";
import { delay } from "@/lib/utils";
import { MOCK_DELAY } from "@/lib/utils/mock-server-data";

export const getServerData = async () => {
    await delay(MOCK_DELAY);
    return { server: MOCK_SERVER_DATA };
};

export default async function ServerLayout({ children }: React.PropsWithChildren) {
    const { server } = await getServerData();

    return (
        <>
            {/* Desktop Sidebar - Hidden on mobile */}
            <Sidebar className="bottom-0 hidden md:flex flex-col">
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
            </Sidebar>
            {children}
        </>
    );
}