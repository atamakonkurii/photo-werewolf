import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";
import { RoomNew } from "@/component/templates/room";

const CreateRoomPage: CustomNextPage = () => {
  return <RoomNew />;
};

CreateRoomPage.getLayout = PreGameLayout;

export default CreateRoomPage;
