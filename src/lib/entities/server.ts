import {ServerChannelCategory} from "@/lib/entities/server-channel";

export type ListedServer = {
  id: string;
  name: string;
  photo: string;
  messages?: number;
};

export interface DetailedServer {
  id: string;
  name: string;
  photo: string;
  description?: string;
  memberCount?: number;
  boostLevel?: number;
  categories: ServerChannelCategory[];
}