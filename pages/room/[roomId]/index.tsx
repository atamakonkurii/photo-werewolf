import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";
import { StartGame } from "@/component/templates/room";

const StartGamePage: CustomNextPage = () => {
  return <StartGame />;
};

StartGamePage.getLayout = PreGameLayout;

export default StartGamePage;
