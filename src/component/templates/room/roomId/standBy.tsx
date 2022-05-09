/* eslint-disable react/destructuring-assignment */
import { Button } from "@mantine/core";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import QRCodeSVG from "qrcode.react";
import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";
import { CopyLinkButton } from "@/component/molecules/Button/CopyLinkButton";
import { Guests } from "@/component/organisms/Guests";
import { changeGameType } from "@/utils/changeGameType";
import { supabase } from "@/utils/supabase";

type Props = {
  user: User | null;
  roomName: string;
  isOwner: boolean;
  roomUsers: any[] | null;
};

const handleClick = (roomId: string, roomUsers: any[] | null) => {
  const createStandardGame = async (user_id: string, user_name: string) => {
    await supabase
      .from("standard_game_user_progresses")
      .upsert([
        { room_id: roomId, user_id: user_id, user_name: user_name, round: 1 },
      ]);
  };
  roomUsers?.map((roomUser) => {
    createStandardGame(roomUser.users.user_id, roomUser.users.name);
  });
  changeGameType(roomId, "PHOTO_UPLOAD");
};

export const StandBy: VFC<Props> = (props) => {
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];

  return (
    <div className="flex flex-col justify-center items-center m-4">
      <Title title={props.roomName} />
      {props.isOwner && (
        <>
          <QRCodeSVG
            value={`${process.env.NEXT_PUBLIC_DOMAIN}${gamePath}/guests/new`}
            renderAs="canvas"
            includeMargin={true}
          />
          <div className="mb-4"></div>
          <CopyLinkButton
            url={`${process.env.NEXT_PUBLIC_DOMAIN}${gamePath}/guests/new`}
          />
        </>
      )}

      <div className="mt-8" />
      {props.roomUsers ? (
        <Guests users={props.roomUsers} />
      ) : (
        <div>ひとりもいません</div>
      )}
      <div className="mt-8" />

      {props.isOwner ? (
        <Button
          color="violet"
          radius="md"
          size="lg"
          onClick={() => {
            handleClick(roomId, props.roomUsers);
          }}
        >
          ゲームスタート
        </Button>
      ) : (
        <div className="text-white">ホストの操作をお待ちください</div>
      )}
    </div>
  );
};
