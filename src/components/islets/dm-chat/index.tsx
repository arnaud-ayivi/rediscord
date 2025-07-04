import Avatar from "@/components/ui/avatar";
import { User } from "@/lib/entities/user";
import React from "react";
import { MdCall } from "react-icons/md";

interface ChatDMProps {
  user: User | null;
  currentUser: User | null;
  messages: {
    id: number;
    userId?: string;
    text: string;
    timestamp: string;
    bot?: string;
  }[];
}

export function ChatDM({ messages, user, currentUser }: ChatDMProps) {
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
    // Auto-scroll when new messages are added
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100); // Small delay to ensure DOM is updated

    return () => clearTimeout(timeoutId);
  }, [messages]);

  const [showDetailMessage, setShowDetailMessage] = React.useState<{
    [key: number]: boolean;
  }>({});

  // Function to get display name for messages
  const getDisplayName = (messageUserId?: string) => {
    if (messageUserId === currentUser?.id) {
      return currentUser?.name;
    }
    return user?.name;
  };

  // Function to get display avatar for messages
  const getDisplayAvatar = (messageUserId?: string) => {
    if (messageUserId === currentUser?.id) {
      return currentUser?.avatar;
    }
    return user?.avatar;
  };

  return (
      <>
        <div className="space-y-1">
          {messages.map((message, index) => (
              <div
                  key={message.id}
                  className={`  ${
                      index === 0 ||
                      messages[index]?.userId !== messages[index - 1]?.userId
                          ? "my-4"
                          : "my-0 h-fit"
                  } relative flex items-start gap-2`}
              >
                {message.bot === "endCall" ? (
                    <div className="flex items-center space-x-2 py-1 text-xs text-gray-300">
                      <MdCall className="text-lg text-green-500" />
                      <p className="text-white"> {currentUser?.name}</p>
                      <p className=""> {message.text}</p>
                    </div>
                ) : (
                    <>
                      <Avatar
                          className={` ${
                              index === 0 ||
                              messages[index]?.userId !== messages[index - 1]?.userId
                                  ? "opacity-100"
                                  : "!h-0 opacity-0"
                          } z-[1]`}
                          size="sm"
                          src={getDisplayAvatar(message.userId)}
                          alt="Avatar"
                          status={user?.status}
                      />
                      {showDetailMessage[message.id] && (
                          <div className="absolute top-1.5 z-0 text-xs text-gray-400">
                            {/* Timestamp removed */}
                          </div>
                      )}
                      <div className="flex w-full flex-col overflow-hidden">
                        {(index === 0 ||
                            messages[index]?.userId !== messages[index - 1]?.userId) && (
                            <div className="flex items-center justify-start">
                              <div className="text-sm font-semibold">
                                {getDisplayName(message.userId)}
                              </div>
                            </div>
                        )}
                        <div
                            onMouseEnter={() => {
                              setShowDetailMessage((prev) => ({
                                ...prev,
                                [message.id]: true,
                              }));
                            }}
                            onMouseLeave={() => {
                              setShowDetailMessage((prev) => ({
                                ...prev,
                                [message.id]: false,
                              }));
                            }}
                            className="break-words pr-12"
                        >
                          {message.text}
                        </div>
                      </div>
                    </>
                )}
              </div>
          ))}
          {/* Scroll anchor - always at the bottom */}
          <div ref={chatContainerRef} className="h-1" />
        </div>
      </>
  );
}