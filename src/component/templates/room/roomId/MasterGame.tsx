/* eslint-disable react/destructuring-assignment */
import type { User } from "@supabase/supabase-js";
import type { VFC } from "react";

import { Finished } from "@/component/templates/room/roomId/finished";
import { Game } from "@/component/templates/room/roomId/Game";
import { StandBy } from "@/component/templates/room/roomId/standBy";
import { Vote } from "@/component/templates/room/roomId/vote";

type Props = {
  user: User | null;
};

export const MasterGame: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <StandBy user={props.user} />
      <Game />
      <Vote />
      <Finished />
    </div>
  );
};
