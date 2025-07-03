"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ServerChannelCategory, ChannelType } from "@/lib/entities/server-channel";
import { List, ListItem } from "@/components/ui/list";
import { BsHash, BsVolumeUp, BsSpeaker, BsChevronDown, BsChevronRight } from "react-icons/bs";
import Badge from "@/components/ui/badge";
import {DetailedServer} from "@/lib/entities/server";

interface ServerChannelListProps {
    server: DetailedServer;
}

interface ChannelCategoryProps {
    category: ServerChannelCategory;
}

const ChannelIcon = ({ type }: { type: ChannelType }) => {
    switch (type) {
        case ChannelType.Text:
            return <BsHash className="text-gray-400" fontSize={16} />;
        case ChannelType.Voice:
            return <BsVolumeUp className="text-gray-400" fontSize={14} />;
        case ChannelType.Announcement:
            return <BsSpeaker className="text-gray-400" fontSize={14} />;
        default:
            return <BsHash className="text-gray-400" fontSize={16} />;
    }
};

const ChannelCategory = ({ category }: ChannelCategoryProps) => {
    const [collapsed, setCollapsed] = React.useState(category.collapsed || false);
    const params = useParams();

    return (
        <div className="mb-2">
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex w-full items-center gap-1 px-2 py-1 text-xs font-semibold uppercase text-gray-400 hover:text-gray-300"
            >
                {collapsed ? (
                    <BsChevronRight fontSize={10} />
                ) : (
                    <BsChevronDown fontSize={10} />
                )}
                {category.name}
            </button>

            {!collapsed && (
                <List className="ml-2">
                    {category.channels.map((channel) => (
                        <ListItem
                            key={channel.id}
                            href={`/servers/${params.serverId}/${channel.id}`}
                            active={params.channelId === channel.id}
                            className="group gap-2 py-1.5 pl-2"
                            noVerticalPadding
                        >
                            <ChannelIcon type={channel.type} />
                            <span className="flex-1 truncate text-sm">{channel.name}</span>
                            {channel.unreadCount && (
                                <Badge count={channel.unreadCount} className="ml-auto" />
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default function ServerChannelList({ server }: ServerChannelListProps) {
    return (
        <div className="px-2">
            {server.categories.map((category) => (
                <ChannelCategory key={category.id} category={category} />
            ))}
        </div>
    );
}