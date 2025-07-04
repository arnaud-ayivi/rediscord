import FriendsTabGroup from "@/components/islets/friends-tab-group";
import Divider from "@/components/ui/divider";
import { BsPersonFill } from "react-icons/bs";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import FriendList from "@/components/islets/friend-list";
import { delay } from "@/lib/utils";
import {
  MOCK_DELAY,
  MOCK_FRIENDS,
  generateRandomFakeUsers,
} from "@/lib/utils/mock";
import { User } from "@/lib/entities/user";
import ActiveNowPanel from "@/components/islets/active-now-panel";
import VoiceStatusFooter from "@/components/islets/voice-status-footer";

interface FriendFetchData {
  friends: User[];
  friendRequests: User[];
  blockedFriends: User[];
}
const getData = async (): Promise<FriendFetchData> => {
  /*
   * Generating fake users for test
   */
  const friends: User[] = generateRandomFakeUsers(MOCK_FRIENDS);
  const friendRequests: User[] = generateRandomFakeUsers(6);
  const blockedFriends: User[] = [];

  await delay(MOCK_DELAY);
  return { friends, friendRequests, blockedFriends };
};

export default async function MePage() {
  const data = await getData();
  return (
      <>
        <Page>
          <PageHeader>
            <div className="flex gap-4">
              <div className="flex flex-none items-center gap-2 text-sm font-semibold">
                <BsPersonFill className="text-gray-500" fontSize={22} />
                Friends
              </div>
              <Divider vertical />
              <FriendsTabGroup />
            </div>
          </PageHeader>
          <PageContent className="flex-col lg:flex-row pb-16 md:pb-0" padding="none">
            <div className="flex flex-1 px-6 pt-4">
              <FriendList {...data} />
            </div>
            <div className="flex md:w-[360px]">
              <ActiveNowPanel />
            </div>
          </PageContent>
        </Page>

        {/* Mobile-only User Footer - Only on channels/me page */}
        <div className="md:hidden fixed bottom-0 left-[70px] right-0 z-50 bg-semibackground border-t border-gray-800 shadow-lg">
          <VoiceStatusFooter />
        </div>
      </>
  );
}