import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";

const RoomIdPage: CustomNextPage = () => {
  return (
    <>
      <h1>ゲーム部屋</h1>
    </>
  );
};

RoomIdPage.getLayout = PreGameLayout;

export default RoomIdPage;
