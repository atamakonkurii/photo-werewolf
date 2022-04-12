import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";

const RoomIdStandByUsersNewPage: CustomNextPage = () => {
  return <h1 className="text-white">待機部屋</h1>;
};

RoomIdStandByUsersNewPage.getLayout = PreGameLayout;

export default RoomIdStandByUsersNewPage;
