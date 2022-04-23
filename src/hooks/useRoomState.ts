import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { supabase } from "@/utils/supabase";

export const useRoomState = () => {
  const [state, setState] = useState<"STANDBY" | "GAME" | "VOTE" | "FINISHED">(
    "STANDBY"
  );
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];

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
    getRoomState();
  }, [roomId]);

  return state;
};
