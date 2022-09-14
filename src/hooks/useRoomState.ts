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
  }, [isAllowedFetch]);

  const changeRoomStatus = supabase
    .from(`rooms`)
    .on("UPDATE", (payload) => {
      setState(payload.new.room_status);
    })
    .subscribe();

  changeRoomStatus.on;

  return state;
};
