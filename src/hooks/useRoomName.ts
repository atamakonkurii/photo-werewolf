import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { useAllowedFetch } from "@/hooks/useAllowedFetch";
import { supabase } from "@/utils/supabase";

export const useRoomName = (authUserId: string | undefined) => {
  const [roomName, setRoomName] = useState<string>("ローディング中...");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const isAllowedFetch = useAllowedFetch();
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];

  useEffect(() => {
    const getRoomName = async (authUserId: string | undefined) => {
      const { data: rooms } = await supabase
        .from("rooms")
        .select("name, owner_id")
        .eq("room_id", roomId)
        .single();
      if (rooms) {
        setRoomName(rooms.name || "エラー");
        authUserId && setIsOwner(rooms.owner_id === authUserId);
      }
    };

    isAllowedFetch && getRoomName(authUserId);
  }, [isAllowedFetch]);

  return { roomName, isOwner };
};
