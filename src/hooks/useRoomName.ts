import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { supabase } from "@/utils/supabase";

export const useRoomName = (authUserId: string | undefined) => {
  const [roomName, setRoomName] = useState<string>("待機部屋");
  const [hasButton, setHasButton] = useState<boolean>(false);
  const [isAllowedFetch, setIsAllowedFetch] = useState<boolean>(false);
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];

  useEffect(() => {
    if (router.asPath !== router.route) {
      setIsAllowedFetch(true);
    }
  }, [router]);

  useEffect(() => {
    const getRoomName = async (authUserId: string | undefined) => {
      const { data: rooms } = await supabase
        .from("rooms")
        .select("name, owner_id")
        .eq("room_id", roomId)
        .single();
      if (rooms) {
        setRoomName(rooms.name || "待機部屋");
        authUserId && setHasButton(rooms.owner_id === authUserId);
      }
    };

    isAllowedFetch && getRoomName(authUserId);
  }, [isAllowedFetch]);

  return { roomName, hasButton };
};
