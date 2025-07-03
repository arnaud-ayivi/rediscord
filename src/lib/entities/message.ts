export interface Message {
    id: string;
    userId: string;
    username: string;
    avatar?: string;
    content: string;
    timestamp: Date;
    reactions?: Reaction[];
    attachments?: Attachment[];
    edited?: boolean;
}

export interface Reaction {
    emoji: string;
    count: number;
    users: string[];
}

export interface Attachment {
    id: string;
    filename: string;
    url: string;
    type: 'image' | 'file' | 'video';
}