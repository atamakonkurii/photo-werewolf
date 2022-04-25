import { Button } from "@mantine/core";
import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";
import { StandardGameVote } from "@/component/organisms/StandardGameVote";
import { changeGameType } from "@/utils/changeGameType";

type Props = {
  isOwner: boolean;
  roomId: string;
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
            changeGameType(roomId, "FINISHED");
          }}
        >
          結果発表
        </Button>
      )}
    </div>
  );
};
