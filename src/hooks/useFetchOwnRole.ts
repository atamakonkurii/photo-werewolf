import { useEffect, useState } from "react";

import { useAllowedFetch } from "@/hooks/useAllowedFetch";
import { supabase } from "@/utils/supabase";

export const useFetchOwnRole = (
  roomId: string,
  userId: string,
  round: number
) => {
  const isAllowedFetch = useAllowedFetch();
  const [ownRole, setOwnRole] = useState<string>("WEREWOLF");
  useEffect(() => {
    const getOwnRole = async () => {
      const { data: ownRole } = await supabase
        .from("standard_game_user_progresses")
        .select("standard_role")
        .match({ room_id: roomId, user_id: userId, round: round })
        .single();
      setOwnRole(ownRole.standard_role);
    };
    isAllowedFetch && getOwnRole();
  }, [isAllowedFetch]);

  return ownRole;
};
