"use client";
import React from "react";
import { Message } from "@/lib/entities/message";
import Avatar from "@/components/ui/avatar";

interface ServerMessagesProps {
    messages: Message[];
}

interface MessageReactionProps {
    emoji: string;
    count: number;
    onClick?: () => void;
}

const MessageReaction = ({ emoji, count, onClick }: MessageReactionProps) => (
    <button
        onClick={onClick}
        className="flex items-center gap-1 rounded-md bg-gray-800/50 px-2 py-1 text-xs hover:bg-gray-700/50 transition-colors"
    >
        <span>{emoji}</span>
        <span className="text-gray-300">{count}</span>
    </button>
);

export default function ServerMessages({ messages }: ServerMessagesProps) {
    const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const shouldShowAvatar = (index: number) => {
        if (index === 0) return true;
        const currentMessage = messages[index];
        const previousMessage = messages[index - 1];

        // Show avatar if different user or if more than 5 minutes between messages
        return (
            currentMessage.userId !== previousMessage.userId ||
            new Date(currentMessage.timestamp).getTime() - new Date(previousMessage.timestamp).getTime() > 5 * 60 * 1000
        );
    };

    return (
        <div className="space-y-1">
            {messages.map((message, index) => {
                const showAvatar = shouldShowAvatar(index);

                return (
                    <div
                        key={message.id}
                        ref={index === messages.length - 1 ? chatContainerRef : null}
                        className={`group relative flex items-start gap-3 px-4 py-1 hover:bg-gray-800/20 ${
                            showAvatar ? "mt-4" : "mt-0"
                        }`}
                    >
                        {/* Avatar */}
                        <div className="w-10 flex-none">
                            {showAvatar ? (
                                <Avatar
                                    src={message.avatar}
                                    alt={message.username}
                                    size="md"
                                    className="h-10 w-10"
                                />
                            ) : (
                                <div className="h-10 w-10 flex items-center justify-center">
                                    {/* Empty space where avatar would be */}
                                </div>
                            )}
                        </div>

                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                            {showAvatar && (
                                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-white hover:underline cursor-pointer">
                    {message.username}
                  </span>
                                    {message.edited && (
                                        <span className="text-xs text-gray-500">(edited)</span>
                                    )}
                                </div>
                            )}

                            <div className="break-words text-gray-100 leading-relaxed">
                                {message.content.split('\n').map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                        {line}
                                        {lineIndex < message.content.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Reactions */}
                            {message.reactions && message.reactions.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {message.reactions.map((reaction, reactionIndex) => (
                                        <MessageReaction
                                            key={reactionIndex}
                                            emoji={reaction.emoji}
                                            count={reaction.count}
                                            onClick={() => {
                                                // Handle reaction click
                                                console.log(`Clicked reaction ${reaction.emoji}`);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Attachments */}
                            {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                    {message.attachments.map((attachment) => (
                                        <div
                                            key={attachment.id}
                                            className="rounded-md border border-gray-700 p-3 bg-gray-800/30"
                                        >
                                            <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">
                          📎 {attachment.filename}
                        </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Message Actions (visible on hover) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-2 bg-gray-800 rounded border border-gray-700 flex">
                            <button className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-gray-200">
                                ➕
                            </button>
                            <button className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-gray-200">
                                😀
                            </button>
                            <button className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-gray-200">
                                💬
                            </button>
                            <button className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-gray-200">
                                ⋯
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}