import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";

const RoomIdStandByNewGuestPage: CustomNextPage = () => {
  return <h1 className="text-white">ユーザー情報入力</h1>;
};

RoomIdStandByNewGuestPage.getLayout = PreGameLayout;

export default RoomIdStandByNewGuestPage;
