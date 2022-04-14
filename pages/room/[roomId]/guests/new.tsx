import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";
import { GuestsNew } from "@/component/templates/room/roomId/guests";

const RoomIdStandByNewGuestPage: CustomNextPage = () => {
  return <GuestsNew />;
};

RoomIdStandByNewGuestPage.getLayout = PreGameLayout;

export default RoomIdStandByNewGuestPage;
