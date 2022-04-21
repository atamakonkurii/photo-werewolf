import type { CustomNextPage } from "next";
import { useContext } from "react";

import { PreGameLayout } from "@/component/layout";
import { StartGame } from "@/component/templates/room/roomId";
import { StandByGame } from "@/component/templates/room/roomId/standByGame";
import { UserContext } from "@/utils/UserContext";

const StartGamePage: CustomNextPage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <StandByGame user={user} />
      <StartGame />
    </>
  );
};

StartGamePage.getLayout = PreGameLayout;

export default StartGamePage;
