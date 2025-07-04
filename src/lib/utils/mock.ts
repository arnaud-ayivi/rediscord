import { faker } from "@faker-js/faker";
import { User, StaticUserStatuses } from "@/lib/entities/user";
import { Activity, ActivityTypes } from "@/lib/entities/activity";
import { ListedServer } from "../entities/server";
import { ListedDMChannel } from "../entities/channel";

export const MOCK_DELAY = 2000;
export const MOCK_FRIENDS = 18;
export const MOCK_CHANNELS = 18;
export const MOCK_SERVERS = 18;

const generateRandomDiscordID = () =>
    faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString();

export const generateFakeCurrentUser = () => ({
    id: generateRandomDiscordID(),
    name: "BullseyeJim",
    // avatar: "https://avatars.githubusercontent.com/u/16727448?v=4",
    status: StaticUserStatuses.DND,
    username: "Reepep",
});

// Hardcoded Cece user
export const CECE_USER: User = {
    id: "cece-12345",
    name: "Cece",
    username: "cece_user",
    // avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=32&h=32&fit=crop&crop=face",
    status: StaticUserStatuses.Online,
    activity: null,
    type: "user" as const,
};

const generatePastHoursDate = (hours: number) =>
    new Date(Date.now() - hours * 60 * 60 * 1000);

const currentActivity: Activity = {
    type: ActivityTypes.Playing,
    name: "Dead by Daylight",
    since: generatePastHoursDate(5),
};

export const generateRandomFakeChannels = (length: number): ListedDMChannel[] => {
    const channels = Array.from({ length }, (_, i) => ({
        id: generateRandomDiscordID(),
        status:
            i === 0
                ? StaticUserStatuses.Online
                : faker.helpers.arrayElement(Object.values(StaticUserStatuses)),
        name: faker.person.fullName(),
        avatar: i === 6 ? undefined : faker.image.avatarGitHub(),
        activity: i === 0 ? currentActivity : undefined,
        username: faker.internet.userName().toLowerCase(),
    }));

    // Add Cece as the first channel
    const ceceChannel: ListedDMChannel = {
        id: CECE_USER.id,
        name: CECE_USER.name,
        status: CECE_USER.status,
        activity: CECE_USER.activity,
        avatar: CECE_USER.avatar,
        username: CECE_USER.username,
    };

    return [ceceChannel, ...channels];
};

export const generateRandomFakeServers = (length: number): ListedServer[] =>
    Array.from({ length }, (_, i) => ({
        id: generateRandomDiscordID(),
        name: faker.animal.cow(),
        photo: faker.image.urlPicsumPhotos({
            width: 64,
            height: 64,
        }),
        messages: i === 0 ? 3 : undefined,
    }));

export const generateRandomFakeUsers = (length: number): User[] => {
    const users = Array.from({ length }, (_, i) => ({
        id: generateRandomDiscordID(),
        name: faker.person.fullName(),
        username: faker.internet.userName().toLowerCase(),
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatarGitHub(),
        status: faker.helpers.arrayElement(Object.values(StaticUserStatuses)),
        activity: i === 0 ? currentActivity : undefined,
        type: "user" as const,
    }));

    // Add Cece as the first user
    return [CECE_USER, ...users];
};

export const getRandomUserById = (id: string) => {
    // Return Cece if the ID matches
    if (id === CECE_USER.id) {
        return CECE_USER;
    }
    return { ...generateRandomFakeUsers(1)[0], id };
};