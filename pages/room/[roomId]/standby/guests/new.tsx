import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";

const RoomIdStandByNewGuestPage: CustomNextPage = () => {
  return <h1 className="text-white">名前を入力しよう</h1>;
};

RoomIdStandByNewGuestPage.getLayout = PreGameLayout;

export default RoomIdStandByNewGuestPage;
