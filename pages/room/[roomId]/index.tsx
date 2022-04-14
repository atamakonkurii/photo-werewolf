import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";
import { StartGame } from "@/component/templates/room/roomId";
import { StandByGame } from "@/component/templates/room/roomId/standByGame";

const StartGamePage: CustomNextPage = () => {
  return (
    <>
      <StandByGame />
      <StartGame />
    </>
  );
};

StartGamePage.getLayout = PreGameLayout;

export default StartGamePage;
