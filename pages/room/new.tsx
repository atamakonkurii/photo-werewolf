/* eslint-disable react-hooks/rules-of-hooks */
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { PreGameLayout } from "@/component/layout";
import { RoomNew } from "@/component/templates/room/new";
import { UserContext } from "@/utils/UserContext";

const CreateRoomPage: CustomNextPage = () => {
  const { user } = useContext(UserContext);
  const { replace } = useRouter();

  useEffect(() => {
    if (!user) {
      replace("/users/sign_in");
    }
  }, [replace, user]);

  return <>{user && <RoomNew user={user} />}</>;
};

CreateRoomPage.getLayout = PreGameLayout;

export default CreateRoomPage;
