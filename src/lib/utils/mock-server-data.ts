import { ChannelType } from "@/lib/entities/server-channel";
import { Message } from "@/lib/entities/message";
import {DetailedServer} from "@/lib/entities/server";

export const MOCK_DELAY = 1000; // Add this export

export const MOCK_SERVER_DATA: DetailedServer = {
    id: "maga-forever",
    name: "MAGA Forever",
    photo: "/img123.png",
    description: "Official MAGA Forever server",
    memberCount: 15420,
    boostLevel: 3,
    categories: [
        {
            id: "information",
            name: "Information",
            channels: [
                {
                    id: "welcome-and-rules",
                    name: "welcome-and-rules",
                    type: ChannelType.Text
                },
                {
                    id: "announcements",
                    name: "announcements",
                    type: ChannelType.Announcement,
                    unreadCount: 2
                },
                {
                    id: "introductions",
                    name: "introductions",
                    type: ChannelType.Text
                }
            ]
        },
        {
            id: "help-and-questions",
            name: "Help and Questions",
            channels: [
                {
                    id: "ai-bot-help-v4",
                    name: "ai-bot-help-v4",
                    type: ChannelType.Text
                },
                {
                    id: "strapi-questions",
                    name: "strapi-questions",
                    type: ChannelType.Text,
                    unreadCount: 103
                },
                {
                    id: "frontend-questions",
                    name: "frontend-questions",
                    type: ChannelType.Text,
                    unreadCount: 5
                }
            ]
        },
        {
            id: "general-channels",
            name: "General Channels",
            channels: [
                {
                    id: "off-your-chest",
                    name: "off-your-chest",
                    type: ChannelType.Text
                },
                {
                    id: "open-office-hours",
                    name: "open-office-hours",
                    type: ChannelType.Voice
                }
            ]
        },
        {
            id: "programs-and-activities",
            name: "Programs and Activities",
            channels: [
                {
                    id: "best-practices-archive",
                    name: "best-practices-archive",
                    type: ChannelType.Text
                }
            ]
        },
        {
            id: "voice-channels",
            name: "Voice Channels",
            channels: [
                {
                    id: "voice-hangout-1",
                    name: "voice-hangout-1",
                    type: ChannelType.Voice
                }
            ]
        }
    ]
};

export const MOCK_MESSAGES: Message[] = [
    {
        id: "1",
        userId: "paul-123",
        username: "Paul",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        content: "✨ StrapiConf Call for Papers 🔬🚀\n\nThank you for your interest in submitting a talk for StrapiConf! 🎉\n\n📢 The CFP is now open and will close on February 17th, 2025.\n🔗 Submit your talk here: Google Form\n\n📍 StrapiConf is a one-day conference happening on May 13th, 2025, in Paris.\n🔗 Learn more: conf.strapi.io\n\n💙 Spread the word on Twitter by following @strapijs and using #StrapiConf!\n📍 Have questions? Reach out at conf@strapi.io.\n\n🎤 Speakers of all experience levels are encouraged to apply! 🚀✨",
        timestamp: new Date("2025-02-13T09:21:00Z"),
        reactions: [
            { emoji: "🔥", count: 15, users: ["user1", "user2"] },
            { emoji: "🙌", count: 8, users: ["user3", "user4"] }
        ]
    },
    {
        id: "2",
        userId: "sarah-456",
        username: "Sarah",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=32&h=32&fit=crop&crop=face",
        content: "This is amazing! Can't wait to submit my proposal about GraphQL integration with Strapi 🚀",
        timestamp: new Date("2025-02-13T09:45:00Z")
    },
    {
        id: "3",
        userId: "mike-789",
        username: "Mike",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        content: "Quick question - is there a specific template for the talk proposals?",
        timestamp: new Date("2025-02-13T10:12:00Z")
    },
    {
        id: "4",
        userId: "paul-123",
        username: "Paul",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        content: "Great question @Mike! The Google Form has all the fields you need. Just make sure to include a brief description of your talk and your experience level.",
        timestamp: new Date("2025-02-13T10:15:00Z")
    },
    {
        id: "5",
        userId: "alex-321",
        username: "Alex",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        content: "Love seeing the community grow! The last StrapiConf was incredible. Definitely submitting this year 💪",
        timestamp: new Date("2025-02-13T11:30:00Z")
    },
    {
        id: "6",
        userId: "emma-654",
        username: "Emma",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "For those who haven't been to Paris before, the venue last year was absolutely beautiful! Great location for networking too 🇫🇷",
        timestamp: new Date("2025-02-13T12:15:00Z"),
        reactions: [
            { emoji: "🇫🇷", count: 12, users: ["user5", "user6"] },
            { emoji: "❤️", count: 6, users: ["user7", "user8"] }
        ]
    }
];
