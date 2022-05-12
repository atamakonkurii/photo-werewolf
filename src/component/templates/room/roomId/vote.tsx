import { Button } from "@mantine/core";
import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";
import { StandardGameVote } from "@/component/organisms/StandardGameVote";
import { calculateResults } from "@/utils/calculateResults";
import { changeGameType } from "@/utils/changeGameType";

type Props = {
  isOwner: boolean;
  roomId: string;
};

const handleClick = async (roomId: string) => {
  await calculateResults(roomId);
  await changeGameType(roomId, "FINISHED");
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
            handleClick(roomId);
          }}
        >
          結果発表
        </Button>
      )}
    </div>
  );
};
