import type { CustomNextPage } from "next";

import { Title } from "@/component/atoms/Title";
import { PreGameLayout } from "@/component/layout";

const RoomIdStandByNewGuestPage: CustomNextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="名前を入力しよう" />
    </div>
  );
};

RoomIdStandByNewGuestPage.getLayout = PreGameLayout;

export default RoomIdStandByNewGuestPage;
