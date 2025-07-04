// src/components/islets/dm-channel/index.tsx
"use client";
import { PageContent, PageHeader } from "@/components/layout/page";
import Avatar from "@/components/ui/avatar";
import Divider from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import {
  AiFillGift,
  AiOutlineFileText,
  AiOutlineGif,
} from "react-icons/ai";
import { CgSmileMouthOpen } from "react-icons/cg";
import { BsList, BsX, BsArrowLeft } from "react-icons/bs";
import { useChannelStore } from "@/state/channel-list";
import React from "react";
import InputField from "@/components/ui/input/input-field";
import { useCurrentUserStore } from "@/state/user";
import { ChatDM } from "@/components/islets/dm-chat";
import { User } from "@/lib/entities/user";
import AudioVideoCall from "@/components/ui/audio-video-calls";
import DMHeaderMenu from "@/components/islets/dm-header-menu";
import DMChannelList from "@/components/islets/dm-channel-list";
import VoiceStatusFooter from "@/components/islets/voice-status-footer";
import FindChatButton from "@/components/islets/find-chat-button";
import Header from "@/components/layout/header";
import { useRouter } from "next/navigation";
import { CECE_USER } from "@/lib/utils/mock";

interface Message {
  id: number;
  userId?: string;
  text: string;
  timestamp: string;
  bot?: string;
}

export default function ChannelDM({ user }: { user: User | undefined }) {
  const { channels } = useChannelStore();
  const { currentUser } = useCurrentUserStore();
  const [showAudioVideoCall, setShowAudioVideoCall] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [sequenceTriggered, setSequenceTriggered] = React.useState(false);
  const router = useRouter();

  // Check if this is Cece's chat
  const isCeceChat = user?.id === CECE_USER.id;

  const formattedDate = "July 07th 2025";
  const [newMessage, setNewMessageText] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      userId: user?.id,
      text: user?.id === CECE_USER.id ? "Hey! This is Cece" : "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
  ]);

  // Hardcoded message sequence for Cece
  const ceceSequence = ["What do you mean?", "Where are you?", "Think about Claira!", "Think about Claira!", "I know things are tough right now,", "maybe you could reach out to someone who could help?", "You don't want to mess things up for Claira, right?","Try this number, 988","Please!!" ];

  // BullseyeJim sequence
  const bullseyeJimSequence = ["Hello", "Not well"];

  const handleSubmit = () => {
    const newMessageObj = {
      id: messages.length + 1,
      userId: currentUser?.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObj]);

    // Check if this is Cece's chat and sequence hasn't been triggered yet
    if (isCeceChat && !sequenceTriggered) {
      setSequenceTriggered(true);
      // Start BullseyeJim's sequence immediately
      setTimeout(() => {
        sendBullseyeJimMessage(0);
      }, 1000); // 1 second delay
    }

    setNewMessageText("");
  };

  const sendBullseyeJimMessage = (stepIndex: number) => {
    if (stepIndex < bullseyeJimSequence.length) {
      const bullseyeJimMessageObj = {
        id: Date.now() + stepIndex, // Unique ID
        userId: currentUser?.id,
        text: bullseyeJimSequence[stepIndex],
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, bullseyeJimMessageObj]);

      // Schedule next BullseyeJim message if there are more
      if (stepIndex + 1 < bullseyeJimSequence.length) {
        setTimeout(() => {
          sendBullseyeJimMessage(stepIndex + 1);
        }, 5000); // 5 seconds between BullseyeJim messages
      } else {
        // BullseyeJim sequence complete, wait 3 seconds then start Cece's sequence
        setTimeout(() => {
          sendCeceMessage(0);
        }, 3000);
      }
    }
  };

  const sendCeceMessage = (stepIndex: number) => {
    if (stepIndex < ceceSequence.length) {
      const ceceMessageObj = {
        id: Date.now() + stepIndex + 1000, // Unique ID
        userId: CECE_USER.id,
        text: ceceSequence[stepIndex],
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, ceceMessageObj]);

      // Schedule next message if there are more in sequence
      if (stepIndex + 1 < ceceSequence.length) {
        setTimeout(() => {
          sendCeceMessage(stepIndex + 1);
        }, 5000);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(e.target.value);
  };

  const handleAudioVideoCall = () => {
    if (user) {
      setShowAudioVideoCall(true);
    }
  };

  const handleVideoCallEnd = () => {
    setShowAudioVideoCall(false);

    const endedMessage = {
      id: messages.length + 1,
      bot: "endCall",
      text: "He/She initiated a conversation, which lasted for a few seconds.",
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, endedMessage]);
  };



  const handleBackToChannels = () => {
    router.push("/channels/me");
  };

  return (
      <>
        {!user?.id ? (
            <div className="p-4 text-base text-gray-400">
              Ups probably we cannot find your conversation please back to main page
            </div>
        ) : (
            <>
              {/* Mobile Channel List Overlay */}
              {showMobileMenu && (
                  <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setShowMobileMenu(false)}
                    />

                    {/* Slide-out Menu - Optimized for iPhone */}
                    <div className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-[320px] bg-midground border-r border-gray-800 flex flex-col">
                      {/* Header */}
                      <Header verticalPadding="2" className="bg-midground flex items-center justify-between">
                        <FindChatButton />
                        <button
                            onClick={() => setShowMobileMenu(false)}
                            className="text-gray-400 hover:text-gray-200 p-1"
                        >
                          <BsX fontSize={24} />
                        </button>
                      </Header>

                      {/* Channel List */}
                      <div className="flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
                        <div onClick={() => setShowMobileMenu(false)}>
                          <DMHeaderMenu />
                          <DMChannelList channelsData={channels || []} />
                        </div>
                      </div>

                      {/* User Footer */}
                      <VoiceStatusFooter />
                    </div>
                  </div>
              )}

              {/* Mobile-only User Footer - Only show when in channel list view (channels/me), not in individual DM */}
              {!showMobileMenu && (
                  <div className="md:hidden fixed bottom-0 left-[70px] right-0 z-50 bg-semibackground border-t border-gray-800 shadow-lg">
                    {/* This will be handled by the main channels/me page, not individual DM pages */}
                  </div>
              )}

              <PageHeader
                  user={user}
                  handleAudioVideoCall={handleAudioVideoCall}
                  showAudioVideoCall={showAudioVideoCall}
                  className="h-16" // Made header bigger
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Mobile Back Button */}
                  <button
                      onClick={handleBackToChannels}
                      className="md:hidden text-gray-400 hover:text-gray-200 p-1 touch-manipulation"
                  >
                    <BsArrowLeft fontSize={18} />
                  </button>

                  {/* Mobile Menu Button */}
                  <button
                      onClick={() => setShowMobileMenu(true)}
                      className="md:hidden text-gray-400 hover:text-gray-200 p-1 touch-manipulation"
                  >
                    <BsList fontSize={20} />
                  </button>

                  <div className="flex flex-none items-center gap-2 sm:gap-3 text-sm font-semibold min-w-0">
                    <Avatar
                        size="sm"
                        src={user?.avatar}
                        alt="avatar"
                        status={user?.status}
                        className="flex-shrink-0"
                    />
                    <span className="truncate text-xl">{user?.name}</span> {/* Made font 100% bigger */}
                  </div>
                </div>
              </PageHeader>

              {showAudioVideoCall && (
                  <AudioVideoCall
                      user={user}
                      currentUser={currentUser}
                      handleVideoCallEnd={handleVideoCallEnd}
                  />
              )}

              <PageContent className="h-full w-full flex-col pl-3 sm:pl-6 pr-1">
                <div className="flex-1 overflow-y-auto pb-2 scroll-smooth">
                  <div className="flex items-center px-1 sm:px-0">
                    <Divider className="h-[1px] w-full" />
                    <p className="flex whitespace-nowrap px-1 text-xs font-semibold text-gray-400">
                      {formattedDate}
                    </p>
                    <Divider className="h-[1px] w-full" />
                  </div>

                  <div className="px-1 sm:px-0 min-h-[200px] pb-20">
                    <ChatDM
                        messages={messages}
                        user={user}
                        currentUser={currentUser}
                    />
                  </div>
                </div>

                {/* Input Field - Now in normal document flow */}
                <div className="border-t border-gray-800 bg-foreground p-3 sm:p-4">
                  <InputField
                      endIcon={
                        <div className="absolute right-3 sm:right-4 top-0 flex h-full cursor-pointer items-center space-x-2 text-gray-400">
                          <AiFillGift className="hover:text-gray-300 touch-manipulation" size={18} />
                          <AiOutlineGif className="hover:text-gray-300 touch-manipulation" size={18} />
                          <AiOutlineFileText className="hover:text-gray-300 touch-manipulation" size={18} />
                          <CgSmileMouthOpen className="hover:text-gray-300 touch-manipulation" size={18} />
                        </div>
                      }
                      className="w-full"
                  >
                    <Input
                        className="py-3 sm:py-2 pl-3 sm:pl-4 pr-24 sm:pr-36 !placeholder-gray-600 text-base sm:text-sm border border-gray-700 bg-gray-800 focus:ring-gray-500"
                        type="text"
                        placeholder={`Message ${user.name}`}
                        value={newMessage}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleSubmit();
                          }
                        }}
                        onChange={handleInputChange}
                    />
                  </InputField>
                </div>
              </PageContent>
            </>
        )}
      </>
  );
}