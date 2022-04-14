import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";
import { GuestsNew } from "@/component/templates/room/roomId/standby/guests";

const RoomIdStandByNewGuestPage: CustomNextPage = () => {
  return <GuestsNew />;
};

RoomIdStandByNewGuestPage.getLayout = PreGameLayout;

export default RoomIdStandByNewGuestPage;
