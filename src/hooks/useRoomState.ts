import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { useAllowedFetch } from "@/hooks/useAllowedFetch";
import { supabase } from "@/utils/supabase";

export const useRoomState = () => {
  const [state, setState] = useState<
    "STANDBY" | "PHOTO_UPLOAD" | "GAME" | "VOTE" | "FINISHED"
  >("STANDBY");
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];
  const isAllowedFetch = useAllowedFetch();
  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  useEffect(() => {
    const getRoomState = async () => {
      const { data: rooms } = await supabase
        .from("rooms")
        .select("room_status")
        .eq("room_id", roomId)
        .single();

      if (rooms) {
        setState(rooms.room_status);
      }
    };
    isAllowedFetch && getRoomState();
  }, [isAllowedFetch, isRefetch]);

  const handleRefetchChange = () => {
    console.warn("---------------");
    console.warn(!isRefetch);
    console.warn("---------------");
    setIsRefetch(!isRefetch);
  };

  const changeRoomStatus = supabase
    .from(`rooms:room_id=eq.${roomId}`)
    .on("UPDATE", handleRefetchChange)
    .subscribe();

  changeRoomStatus.on;

  return state;
};
