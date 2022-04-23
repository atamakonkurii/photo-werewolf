import type { CustomNextPage } from "next";
import { useContext } from "react";

import { PreGameLayout } from "@/component/layout";
import { MasterGame } from "@/component/templates/room/roomId";
import { UserContext } from "@/utils/UserContext";

const StartGamePage: CustomNextPage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <MasterGame authUser={user} />
    </>
  );
};

StartGamePage.getLayout = PreGameLayout;

export default StartGamePage;
