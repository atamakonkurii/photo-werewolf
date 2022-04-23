import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { useAllowedFetch } from "@/hooks/useAllowedFetch";
import { supabase } from "@/utils/supabase";

export const useRoomUsers = () => {
  const [roomUsers, setRoomUsers] = useState<any[] | null>([]);
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];
  const isAllowedFetch = useAllowedFetch();

  useEffect(() => {
    const getRoomUsers = async () => {
      const { data: roomUsers } = await supabase
        .from("game_results")
        .select("users (name)")
        .eq("room_id", roomId);
      setRoomUsers(roomUsers);
    };
    isAllowedFetch && getRoomUsers();
  }, [isAllowedFetch]);

  return roomUsers;
};
