/* eslint-disable jsx-a11y/alt-text */

import { Modal } from "@mantine/core";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { useFetchOwnRole } from "@/hooks/useFetchOwnRole";
import { supabase } from "@/utils/supabase";

/* eslint-disable @next/next/no-img-element */
type Props = {
  user_name: string;
  exchanged_photo_url: string;
  votedUserId: string;
};

const handleClick = (setOpened: {
  (value: SetStateAction<boolean>): void;
  (arg0: boolean): void;
}) => {
  setOpened(true);
};

const handleVote = async (
  setOpened: Dispatch<SetStateAction<boolean>>,
  setIsVoted: Dispatch<SetStateAction<boolean>>,
  user_name: string,
  userId: string,
  roomId: string,
  votedUserId: string
) => {
  await supabase
    .from("standard_game_user_progresses")
    .update({ user_id_voted_for: votedUserId, user_name_voted_for: user_name })
    .match({ room_id: roomId, user_id: userId, round: 1 });
  setOpened(false);
  setIsVoted(true);
};

export const StandardGameVoteClick = (props: Props) => {
  const [isOpened, setOpened] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?uid=")[0];
  const userId = roomId_tmp.split("?uid=")[1];
  const { exchanged_photo_url, user_name, votedUserId } = props;
  const ownRole = useFetchOwnRole(roomId, userId, 1);
  return (
    <div className="mb-8">
      <Modal
        opened={isOpened}
        onClose={() => {
          return setOpened(false);
        }}
        title="投票タイム"
      >
        {ownRole === "WEREWOLF" ? (
          <>
            <p className="mb-4">人狼に投票権はありません。</p>
          </>
        ) : userId === votedUserId ? (
          <>
            <p className="mb-4">自分には投票できません。</p>
          </>
        ) : (
          <>
            <p className="mb-4">{user_name}さんに投票しますか？</p>
            <Button
              color="violet"
              radius="md"
              size="sm"
              onClick={() => {
                handleVote(
                  setOpened,
                  setIsVoted,
                  user_name,
                  userId,
                  roomId,
                  votedUserId
                );
              }}
            >
              はい
            </Button>
          </>
        )}
      </Modal>
      <img
        src={exchanged_photo_url}
        onClick={() => {
          return !isVoted && handleClick(setOpened);
        }}
      />
      <div className="text-2xl text-center text-white">{user_name}</div>
    </div>
  );
};
