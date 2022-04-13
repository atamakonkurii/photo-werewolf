import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";
// import { CopyLinkButton } from "@/component/molecules/Button/CopyLinkButton";
import { LinkButton } from "@/component/molecules/Button/LinkButton";
import { Guests } from "@/component/organisms/Guests";

export const RoomIdStandBy: VFC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="待機部屋" />
      TODO:buildできるように変更
      {/* <CopyLinkButton url={`${document.URL}/guests/new`} /> */}
      <div className="mt-8" />
      <Guests />
      <div className="mt-8" />
      <LinkButton url="/room/new" text="ゲームを始める" />
    </div>
  );
};
