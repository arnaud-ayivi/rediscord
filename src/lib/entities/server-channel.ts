export enum ChannelType {
    Text = "text",
    Voice = "voice",
    Announcement = "announcement"
}

export interface ServerChannel {
    id: string;
    name: string;
    type: ChannelType;
    category?: string;
    unreadCount?: number;
}

export interface ServerChannelCategory {
    id: string;
    name: string;
    channels: ServerChannel[];
    collapsed?: boolean;
}