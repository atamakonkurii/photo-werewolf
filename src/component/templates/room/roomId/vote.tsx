import { Button } from "@mantine/core";
import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";
import { StandardGameVote } from "@/component/organisms/StandardGameVote";
import { changeGameType } from "@/utils/changeGameType";
import { supabase } from "@/utils/supabase";

type Props = {
  isOwner: boolean;
  roomId: string;
};

const calculateResults = async (roomId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [result, setResult] = useState<"UNSETTLED" | "WIN" | "LOSE">("UNSETTLED");

  const { data: userVoting } = await supabase
    .from("standard_game_user_progresses")
    .select("user_id, user_id_voted_for, standard_role")
    .match({ room_id: roomId });

  // console.log(userVoting);

  userVoting?.map(async (user) => {
    let result = "UNSETTLLED";

    if (user.standard_role === "WEREWOLF") {
      // console.log("I am werewolf");
    } else {
      const votingUserRole = userVoting.find((v: { user_id: any }) => {
        return v.user_id === user.user_id_voted_for;
      }).standard_role;

      if (votingUserRole === "WEREWOLF") {
        result = "WIN";
      } else {
        result = "LOSE";
      }
    }

    await supabase
      .from("standard_game_user_progresses")
      .update({
        results: result,
      })
      .match({ room_id: roomId, user_id: user.user_id, round: 1 });
  });
};

export const Vote: VFC<Props> = (props) => {
  const { isOwner, roomId } = props;
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <Title title="投票タイム" />
      <StandardGameVote />
      {isOwner && (
        <Button
          color="violet"
          radius="md"
          size="lg"
          onClick={() => {
            calculateResults(roomId);
            changeGameType(roomId, "FINISHED");
          }}
        >
          結果発表
        </Button>
      )}
    </div>
  );
};
