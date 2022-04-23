/* eslint-disable react/destructuring-assignment */
import type { User } from "@supabase/supabase-js";
import type { VFC } from "react";

import {
  Finished,
  Game,
  StandBy,
  Vote,
} from "@/component/templates/room/roomId/";
import { useRoomName } from "@/hooks/useRoomName";
import { useRoomState } from "@/hooks/useRoomState";
import { useRoomUsers } from "@/hooks/useRoomUsers";

type Props = {
  authUser: User | null;
};

export const MasterGame: VFC<Props> = (props) => {
  const state = useRoomState();
  const { isOwner, roomName } = useRoomName(props.authUser?.id);
  const roomUsers = useRoomUsers();

  const GameType = () => {
    switch (state) {
      case "STANDBY":
        return (
          <StandBy
            roomName={roomName}
            isOwner={isOwner}
            user={props.authUser}
            roomUsers={roomUsers}
          />
        );
      case "GAME":
        return <Game />;
      case "VOTE":
        return <Vote />;
      case "FINISHED":
        return <Finished />;
      default:
        return <div>不正なゲームタイプです。</div>;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <GameType />
    </div>
  );
};
