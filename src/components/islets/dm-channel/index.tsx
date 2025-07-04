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
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  // Check if device=computer is in URL
  const isComputerDevice = searchParams.get('device') === 'computer';
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

  const handleSubmit = () => {
    const newMessageObj = {
      id: messages.length + 1,
      userId: currentUser?.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessageText("");

    // If device=computer and this is Cece's chat, send a response from Cece after a short delay
    if (isComputerDevice && isCeceChat) {
      setTimeout(() => {
        const ceceResponse = {
          id: messages.length + 2,
          userId: CECE_USER.id,
          text: "Thanks for the message! I'm responding from the computer.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, ceceResponse]);
      }, 1500);
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

                    {/* Slide-out Menu */}
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-midground border-r border-gray-800 flex flex-col">
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

                      {/* Footer */}
                      <VoiceStatusFooter />
                    </div>
                  </div>
              )}

              <PageHeader
                  user={user}
                  handleAudioVideoCall={handleAudioVideoCall}
                  showAudioVideoCall={showAudioVideoCall}
              >
                <div className="flex items-center gap-4">
                  {/* Mobile Back Button */}
                  <button
                      onClick={handleBackToChannels}
                      className="md:hidden text-gray-400 hover:text-gray-200 p-1"
                  >
                    <BsArrowLeft fontSize={20} />
                  </button>

                  {/* Mobile Menu Button */}
                  <button
                      onClick={() => setShowMobileMenu(true)}
                      className="md:hidden text-gray-400 hover:text-gray-200 p-1"
                  >
                    <BsList fontSize={24} />
                  </button>

                  <div className="flex flex-none items-center gap-3 text-sm font-semibold">
                    <Avatar
                        size="sm"
                        src={user?.avatar}
                        alt="avatar"
                        status={user?.status}
                    />
                    {user?.name}
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

              <PageContent className="h-full w-full flex-col pl-6 pr-1 ">
                <div className="max-h-[86vh] !overflow-y-auto ">
                  <UserProfileInfo
                      user={user}
                      handleAddDelete={handleAddDelete}
                      isFriend={isFriend}
                  />
                  <div className="flex items-center">
                    <Divider className="h-[1px] w-full" />
                    <p className="flex  whitespace-nowrap px-1 text-xs font-semibold text-gray-400">
                      {formattedDate}
                    </p>
                    <Divider className="h-[1px] w-full" />
                  </div>

                  <ChatDM
                      messages={messages}
                      user={user}
                      currentUser={currentUser}
                  />
                </div>
                <InputField
                    startIcon={
                      <AiFillPlusCircle
                          className="cursor-pointer hover:text-gray-200"
                          size={22}
                      />
                    }
                    endIcon={
                      <div className="absolute right-4 top-0  flex h-full cursor-pointer items-center space-x-2.5 text-gray-400 ">
                        <AiFillGift className="hover:text-gray-300" size={22} />
                        <AiOutlineGif className="hover:text-gray-300" size={22} />
                        <AiOutlineFileText
                            className="hover:text-gray-300"
                            size={22}
                        />
                        <CgSmileMouthOpen className="hover:text-gray-300" size={22} />
                      </div>
                    }
                    className="!absolute bottom-0 left-0 right-0 !z-[10] mx-6 mb-4 w-auto bg-foreground"
                >
                  <Input
                      className=" py-2 pl-12 pr-36 !placeholder-gray-600"
                      type="text"
                      placeholder={`write something to @${user.name}`}
                      value={newMessage}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                      onChange={handleInputChange}
                  />
                </InputField>
                <div className=" absolute bottom-0 left-0 right-0 !z-[9]  h-8 bg-foreground" />
              </PageContent>
            </>
        )}
      </>
  );
}