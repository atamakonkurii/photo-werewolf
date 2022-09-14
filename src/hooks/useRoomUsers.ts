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
  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  useEffect(() => {
    const getRoomUsers = async () => {
      const { data: roomUsers } = await supabase
        .from("game_results")
        .select("users (name, user_id)")
        .eq("room_id", roomId);
      setRoomUsers(roomUsers);
    };
    isAllowedFetch && getRoomUsers();
  }, [isAllowedFetch, isRefetch]);

  const handleRefetchChange = () => {
    console.warn("---------------");
    console.warn(!isRefetch);
    console.warn("---------------");
    setIsRefetch(!isRefetch);
  };

  const changeRoomUsers = supabase
    .from(`game_results:room_id=eq.${roomId}`)
    .on("INSERT", handleRefetchChange)
    .subscribe();

  changeRoomUsers.on;

  return { roomId, roomUsers };
};
