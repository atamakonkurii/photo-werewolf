import { Modal } from "@mantine/core";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction, VFC } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Title } from "@/component/atoms/Title";
import { StandardGamePhotoGallery } from "@/component/organisms/StandardGamePhotoGallery";
import { useAllowedFetch } from "@/hooks/useAllowedFetch";
import { changeGameType } from "@/utils/changeGameType";
import { supabase } from "@/utils/supabase";

type Props = {
  isOwner: boolean;
  roomId: string;
};

const useCheckOwnRole = (setIsOpened: Dispatch<SetStateAction<boolean>>) => {
  const [isWerewolf, setIsWerewolf] = useState(false);
  const isAllowedFetch = useAllowedFetch();
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?uid=")[0];
  const userId = roomId_tmp.split("?uid=")[1];

  useEffect(() => {
    const getOwnRole = async () => {
      const { data: user } = await supabase
        .from("standard_game_user_progresses")
        .select("standard_role")
        .match({ room_id: roomId, user_id: userId })
        .single();
      if (user) {
        user.standard_role === "WEREWOLF" && setIsWerewolf(true);
        setIsOpened(true);
      }
    };

    isAllowedFetch && getOwnRole();
  }, [isAllowedFetch]);

  return isWerewolf;
};

export const Game: VFC<Props> = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const isWerewolf = useCheckOwnRole(setIsOpened);

  const { isOwner, roomId } = props;
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="話し合い" />
      <Modal
        opened={isOpened}
        onClose={() => {
          return setIsOpened(false);
        }}
        title="役職"
        transition="pop"
        transitionDuration={700}
        transitionTimingFunction="ease-in-out"
        centered
      >
        {isWerewolf ? <>あなたは人狼です。</> : <>あなたは市民です。</>}
      </Modal>
      <StandardGamePhotoGallery />
      {isOwner && (
        <Button
          color="violet"
          radius="md"
          size="lg"
          onClick={() => {
            changeGameType(roomId, "VOTE");
          }}
        >
          投票に移る
        </Button>
      )}
    </div>
  );
};
