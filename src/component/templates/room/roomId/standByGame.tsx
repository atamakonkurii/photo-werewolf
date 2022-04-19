import { useRouter } from "next/router";
import type { Dispatch, SetStateAction, VFC } from "react";
import { useState } from "react";

import { Title } from "@/component/atoms/Title";
import { CopyLinkButton } from "@/component/molecules/Button/CopyLinkButton";
import { LinkButton } from "@/component/molecules/Button/LinkButton";
import { Guests } from "@/component/organisms/Guests";
import { supabase } from "@/utils/supabase";

const getRoomName = async (
  roomId: string,
  setRoomName: Dispatch<SetStateAction<string>>
) => {
  const { data: rooms } = await supabase
    .from("rooms")
    .select("name")
    .eq("room_id", roomId);

  if (rooms) {
    setRoomName(rooms[0].name);
  } else {
    setRoomName("");
  }
};

export const StandByGame: VFC = () => {
  const [roomName, setRoomName] = useState("name");
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];

  getRoomName(roomId, setRoomName);

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title={roomName} />
      <CopyLinkButton
        url={`${process.env.NEXT_PUBLIC_DOMAIN}${gamePath}/guests/new`}
      />
      <div className="mt-8" />
      <Guests />
      <div className="mt-8" />
      <LinkButton url={gamePath} text="ゲームを始める" />
    </div>
  );
};
