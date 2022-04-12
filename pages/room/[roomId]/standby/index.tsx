import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";
import { RoomIdStandBy } from "@/component/templates/room/roomId/standby";

const RoomIdStandByPage: CustomNextPage = () => {
  return <RoomIdStandBy />;
};

RoomIdStandByPage.getLayout = PreGameLayout;

export default RoomIdStandByPage;
