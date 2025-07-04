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
        username: "PatriotHunter",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        content: "We need to take back what is ours!",
        timestamp: new Date("2025-02-13T09:21:00Z"),
        reactions: [
            { emoji: "🔥", count: 15, users: ["user1", "user2"] },
            { emoji: "🙌", count: 8, users: ["user3", "user4"] }
        ]
    },
    {
        id: "2",
        userId: "sarah-456",
        username: "LibertyRifle",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=32&h=32&fit=crop&crop=face",
        content: "Thank God DEI is DEAD!",
        timestamp: new Date("2025-02-13T09:45:00Z")
    },
    {
        id: "3",
        userId: "mike-789",
        username: "DennisforAmerica",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        content: "You know Israel and Iran teamed up to create the cyborg, George Droid (not Floyd). He was sent to the US to cause trouble.",
        timestamp: new Date("2025-02-13T10:12:00Z")
    },
    {
        id: "4",
        userId: "tom-143",
        username: "GuardianGary",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        content: "These schools letting men play in girls sports need to have their funding terminated NOW",
        timestamp: new Date("2025-02-13T10:15:00Z")
    },
    {
        id: "5",
        userId: "alex-321",
        username: "SoverignShooter",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        content: " I hate femanine men and gays",
        timestamp: new Date("2025-02-13T11:30:00Z")
    },
    {
        id: "6",
        userId: "emma-654",
        username: "RedWhiteBoom",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "These damn migrants will eat our pets and even each other!",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    },
    {
        id: "7",
        userId: "Eric-459",
        username: "BullseyeJim",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "We’ve got to put a stop to this take over.",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    },
    {
        id: "8",
        userId: "sarah-456",
        username: "LibertyRifle",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "All these transvestites trying to turn our kids gay, I don’t want my kids to catch it with these woke ass teachers talking about “gender” in class, wtf?!",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    },
    {
        id: "9",
        userId: "Marc-833",
        username: "EagleEyeMark",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "Liberals shouldn’t have rights, how dare they challenge our glorious leader with this BS, No Kings, idiots.",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    },
    {
        id: "10",
        userId: "alex-321",
        username: "SoverignShooter",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "Radical left lunatics!",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    },
    {
        id: "11",
        userId: "emma-654",
        username: "RedWhiteBoom",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "Trump should outlaw protests",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    },
    {
        id: "12",
        userId: "sarah-456",
        username: "LibertyRifle",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "Trumps Reign can only happen if democracy is dismantled.",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    },
    {
        id: "13",
        userId: "paul-123",
        username: "PatriotHunter",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        content: "He’s the daddy of us all, all of us who are TRUE Americans.",
        timestamp: new Date("2025-02-13T12:15:00Z"),

    }
];
