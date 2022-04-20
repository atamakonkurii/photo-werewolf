import { useRouter } from "next/router";
import type { Dispatch, SetStateAction, VFC } from "react";
import { useEffect } from "react";
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
    setRoomName(rooms[0]?.name);
  } else {
    setRoomName("");
  }
};

const getRoomUsers = async (
  roomId: string,
  setData: Dispatch<SetStateAction<any[]>>
) => {
  const { data } = await supabase
    .from("game_results")
    .select("users (name)")
    .eq("room_id", roomId);

  if (data) {
    setData(data);
  } else {
    setData([]);
  }
};

export const StandByGame: VFC = () => {
  const [roomName, setRoomName] = useState("name");
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];

  useEffect(() => {
    getRoomName(roomId, setRoomName);
    getRoomUsers(roomId, setData);
  }, [roomId]);

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title={roomName} />
      <CopyLinkButton
        url={`${process.env.NEXT_PUBLIC_DOMAIN}${gamePath}/guests/new`}
      />
      <div className="mt-8" />
      {data ? <Guests users={data} /> : <div>ひとりもいません</div>}
      <div className="mt-8" />
      <LinkButton url={gamePath} text="ゲームを始める" />
    </div>
  );
};
