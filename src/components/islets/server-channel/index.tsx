"use client";
import React from "react";
import { PageContent, PageHeader } from "@/components/layout/page";
import { ServerChannel, ChannelType } from "@/lib/entities/server-channel";
import { Message } from "@/lib/entities/message";
import { BsHash, BsSpeaker, BsVolumeUp, BsPinAngle, BsList, BsX } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import { AiFillGift, AiFillPlusCircle, AiOutlineFileText, AiOutlineGif } from "react-icons/ai";
import { CgSmileMouthOpen } from "react-icons/cg";
import ServerMessages from "./server-messages";
import ServerChannelList from "@/components/islets/server-channel-list";
import { MOCK_SERVER_DATA } from "@/lib/utils/mock-server-data";
import {DetailedServer} from "@/lib/entities/server";

interface ServerChannelProps {
    server: DetailedServer;
    channel: ServerChannel;
    messages: Message[];
}

const ChannelIcon = ({ type }: { type: ChannelType }) => {
    switch (type) {
        case ChannelType.Text:
            return <BsHash className="text-gray-400" fontSize={20} />;
        case ChannelType.Voice:
            return <BsVolumeUp className="text-gray-400" fontSize={18} />;
        case ChannelType.Announcement:
            return <BsSpeaker className="text-gray-400" fontSize={18} />;
        default:
            return <BsHash className="text-gray-400" fontSize={20} />;
    }
};

export default function ServerChannel({ server, channel, messages }: ServerChannelProps) {
    const [newMessage, setNewMessage] = React.useState("");
    const [displayMessages, setDisplayMessages] = React.useState<Message[]>(messages);
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    const handleSubmit = () => {
        if (!newMessage.trim()) return;

        const message: Message = {
            id: Date.now().toString(),
            userId: "current-user",
            username: "You",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
            content: newMessage,
            timestamp: new Date()
        };

        setDisplayMessages(prev => [...prev, message]);
        setNewMessage("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    const getChannelDescription = () => {
        switch (channel.id) {
            case "announcements":
                return "Important updates and news from the Strapi team";
            case "introductions":
                return "Welcome! Introduce yourself to the community";
            case "strapi-questions":
                return "Ask questions about Strapi development here";
            case "off-topic":
                return "General discussions and random conversations";
            default:
                return `This is the #${channel.name} channel`;
        }
    };

    return (
        <>
            <PageHeader>
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(true)}
                        className="md:hidden text-gray-400 hover:text-gray-200 p-1"
                    >
                        <BsList fontSize={24} />
                    </button>

                    <ChannelIcon type={channel.type} />
                    <span className="font-semibold text-white">{channel.name}</span>
                    {channel.type === ChannelType.Announcement && (
                        <div className="text-xs text-gray-400 border border-gray-600 rounded px-2 py-0.5">
                            Follow
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-gray-200">
                        <BsPinAngle fontSize={18} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-200">
                        <BsHash fontSize={18} />
                    </button>
                </div>
            </PageHeader>

            {/* Mobile Channel List Overlay */}
            {showMobileMenu && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setShowMobileMenu(false)}
                    />

                    {/* Slide-out Menu */}
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-midground border-r border-gray-800 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                    S
                                </div>
                                <span className="font-semibold text-white">{server.name}</span>
                            </div>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className="text-gray-400 hover:text-gray-200 p-1"
                            >
                                <BsX fontSize={24} />
                            </button>
                        </div>

                        {/* Channel List */}
                        <div className="flex-1 overflow-y-auto py-2">
                            <div onClick={() => setShowMobileMenu(false)}>
                                <ServerChannelList server={MOCK_SERVER_DATA} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <PageContent className="h-full w-full flex-col pl-6 pr-1">
                <div className="max-h-[86vh] overflow-y-auto">
                    {/* Channel Header - Only show on desktop or if no messages yet */}
                    <div className="mb-6 pb-4 border-b border-gray-800 hidden md:block">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                                <ChannelIcon type={channel.type} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    Welcome to #{channel.name}!
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    {getChannelDescription()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <ServerMessages messages={displayMessages} />
                </div>

                {/* Message Input */}
                <InputField
                    startIcon={
                        <AiFillPlusCircle
                            className="cursor-pointer hover:text-gray-200"
                            size={22}
                        />
                    }
                    endIcon={
                        <div className="absolute right-4 top-0 flex h-full cursor-pointer items-center space-x-2.5 text-gray-400">
                            <AiFillGift className="hover:text-gray-300" size={22} />
                            <AiOutlineGif className="hover:text-gray-300" size={22} />
                            <AiOutlineFileText className="hover:text-gray-300" size={22} />
                            <CgSmileMouthOpen className="hover:text-gray-300" size={22} />
                        </div>
                    }
                    className="absolute bottom-0 left-0 right-0 z-10 mx-6 mb-4 w-auto bg-foreground"
                >
                    <Input
                        className="py-2 pl-12 pr-36 placeholder-gray-600"
                        type="text"
                        placeholder={`Message #${channel.name}`}
                        value={newMessage}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        onChange={handleInputChange}
                    />
                </InputField>
                <div className="absolute bottom-0 left-0 right-0 z-[9] h-8 bg-foreground" />
            </PageContent>
        </>
    );
}