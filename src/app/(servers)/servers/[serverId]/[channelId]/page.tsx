import ServerChannel from "@/components/islets/server-channel";
import { Page } from "@/components/layout/page";
import { delay } from "@/lib/utils";
import { MOCK_DELAY, MOCK_MESSAGES } from "@/lib/utils/mock-server-data";
import { MOCK_SERVER_DATA } from "@/lib/utils/mock-server-data";

const getServerChannelData = async (serverId: string, channelId: string) => {
    if (!serverId || !channelId) throw new Error("Invalid server or channel ID");

    const server = MOCK_SERVER_DATA;
    const channel = server.categories
        .flatMap(cat => cat.channels)
        .find(ch => ch.id === channelId);

    if (!channel) throw new Error("Channel not found");

    await delay(MOCK_DELAY);
    return { server, channel, messages: MOCK_MESSAGES };
};

export default async function ServerChannelPage({
                                                    params,
                                                }: {
    params: { serverId: string; channelId: string };
}) {
    const { server, channel, messages } = await getServerChannelData(
        params.serverId,
        params.channelId
    );

    return (
        <Page>
            <ServerChannel
                server={server}
                channel={channel}
                messages={messages}
            />
        </Page>
    );
}