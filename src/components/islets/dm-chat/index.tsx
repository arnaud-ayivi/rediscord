import Avatar from "@/components/ui/avatar";
import { User } from "@/lib/entities/user";
import React from "react";
import { MdCall } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { CECE_USER } from "@/lib/utils/mock";

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
  const searchParams = useSearchParams();

  // Check if device=computer is in URL
  const isComputerDevice = searchParams.get('device') === 'computer';
  const isCeceChat = user?.id === CECE_USER.id;

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

  const [showDetailMessage, setShowDetailMessage] = React.useState<{
    [key: number]: boolean;
  }>({});

  // Function to get display name for messages
  const getDisplayName = (messageUserId?: string) => {
    if (messageUserId === currentUser?.id) {
      // If device=computer and this is Cece's chat, show BullseyeJim's messages as from Cece
      if (isComputerDevice && isCeceChat) {
        return CECE_USER.name;
      }
      return currentUser?.name;
    }
    return user?.name;
  };

  // Function to get display avatar for messages
  const getDisplayAvatar = (messageUserId?: string) => {
    if (messageUserId === currentUser?.id) {
      // If device=computer and this is Cece's chat, show Cece's avatar for BullseyeJim's messages
      if (isComputerDevice && isCeceChat) {
        return CECE_USER.avatar;
      }
      return currentUser?.avatar;
    }
    return user?.avatar;
  };

  return (
      <>
        {messages.map((message, index) => (
            <div
                ref={chatContainerRef}
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
                    <div className=" text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
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
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                    )}
                    <div className="flex w-full flex-col overflow-hidden">
                      {(index === 0 ||
                          messages[index]?.userId !== messages[index - 1]?.userId) && (
                          <div className="flex items-center justify-start">
                            <div className="text-sm font-semibold">
                              {getDisplayName(message.userId)}
                            </div>
                            <div className=" ml-2 text-xs text-gray-400">
                              {new Date(message.timestamp).toLocaleTimeString()}
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
      </>
  );
}