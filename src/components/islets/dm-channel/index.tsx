"use client";
import { PageContent, PageHeader } from "@/components/layout/page";
import Avatar from "@/components/ui/avatar";
import Divider from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import {
  AiFillGift,
  AiFillPlusCircle,
  AiOutlineFileText,
  AiOutlineGif,
} from "react-icons/ai";
import { CgSmileMouthOpen } from "react-icons/cg";
import { BsList, BsX, BsArrowLeft } from "react-icons/bs";
import { useChannelStore } from "@/state/channel-list";
import React from "react";
import InputField from "@/components/ui/input/input-field";
import { useCurrentUserStore } from "@/state/user";
import { useFriendStore } from "@/state/friend-list";
import { ChatDM } from "@/components/islets/dm-chat";
import { UserProfileInfo } from "@/components/islets/user-info-in-chat";
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
  const { friends, setFriends } = useFriendStore();
  const { currentUser } = useCurrentUserStore();
  const [showAudioVideoCall, setShowAudioVideoCall] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const router = useRouter();

  // Check if this is Cece's chat
  const isCeceChat = user?.id === CECE_USER.id;

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
      "default",
      { month: "long" },
  )} ${currentDate.getFullYear()}`;
  const [newMessage, setNewMessageText] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      userId: user?.id,
      text: user?.id === CECE_USER.id ? "Hey there! I'm Cece 👋" : "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
  ]);

  // Hardcoded message sequence for Cece
  const ceceSequence = ["mB2", "mB1", "mB3", "mB4", "mB5", "mB6", "mB7", "mB8"];

  const handleSubmit = () => {
    const newMessageObj = {
      id: messages.length + 1,
      userId: currentUser?.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObj]);

    // Check if this triggers the Cece sequence
    if (isCeceChat && newMessage.trim() === "mA1") {
      // Start the sequence after 5 seconds
      setTimeout(() => {
        sendCeceMessage(0);
      }, 5000);
    }

    setNewMessageText("");
  };

  const sendCeceMessage = (stepIndex: number) => {
    if (stepIndex < ceceSequence.length) {
      const ceceMessageObj = {
        id: Date.now() + stepIndex, // Unique ID
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

  const intersection = channels?.filter(
      (channel) => friends?.includes(channel),
  );
  const isFriend = intersection?.some((friend) => friend.id === user?.id);

  const handleAddDelete = () => {
    if (friends !== null) {
      if (isFriend) {
        setFriends(friends.filter((friend) => friend.id !== user?.id));
      } else {
        const newFriend = channels?.find((channel) => channel.id === user?.id);
        if (newFriend) {
          setFriends([newFriend, ...friends]);
        }
      }
    }
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
                    <span className="truncate">{user?.name}</span>
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
                <div className="max-h-[calc(100vh-160px)] sm:max-h-[86vh] !overflow-y-auto pb-2">
                  <div className="px-1 sm:px-0">
                    <UserProfileInfo
                        user={user}
                        handleAddDelete={handleAddDelete}
                        isFriend={isFriend}
                    />
                  </div>
                  <div className="flex items-center px-1 sm:px-0">
                    <Divider className="h-[1px] w-full" />
                    <p className="flex whitespace-nowrap px-1 text-xs font-semibold text-gray-400">
                      {formattedDate}
                    </p>
                    <Divider className="h-[1px] w-full" />
                  </div>

                  <div className="px-1 sm:px-0">
                    <ChatDM
                        messages={messages}
                        user={user}
                        currentUser={currentUser}
                    />
                  </div>
                </div>
                <InputField
                    startIcon={
                      <AiFillPlusCircle
                          className="cursor-pointer hover:text-gray-200 touch-manipulation"
                          size={20}
                      />
                    }
                    endIcon={
                      <div className="absolute right-3 sm:right-4 top-0 flex h-full cursor-pointer items-center space-x-2 text-gray-400">
                        <AiFillGift className="hover:text-gray-300 touch-manipulation" size={18} />
                        <AiOutlineGif className="hover:text-gray-300 touch-manipulation" size={18} />
                        <AiOutlineFileText className="hover:text-gray-300 touch-manipulation" size={18} />
                        <CgSmileMouthOpen className="hover:text-gray-300 touch-manipulation" size={18} />
                      </div>
                    }
                    className="!absolute bottom-0 left-0 right-0 !z-[10] mx-3 sm:mx-6 mb-4 w-auto bg-foreground"
                >
                  <Input
                      className="py-3 sm:py-2 pl-10 sm:pl-12 pr-24 sm:pr-36 !placeholder-gray-600 text-base sm:text-sm"
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
                <div className=" absolute bottom-20 md:bottom-0 left-0 right-0 !z-[9]  h-8 bg-foreground" />
              </PageContent>
            </>
        )}
      </>
  );
}