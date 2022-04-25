import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { useAllowedFetch } from "@/hooks/useAllowedFetch";
import { supabase } from "@/utils/supabase";

export const useFetchExchangedPhotoUrl = () => {
  const [exchangedPhotoUrl, setExchangedPhotoUrl] = useState<any[] | null>(
    null
  );
  const isAllowedFetch = useAllowedFetch();
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?uid=")[0];

  useEffect(() => {
    const fetchExchangedPhotoUrl = async () => {
      const { data: photos } = await supabase
        .from("standard_game_user_progresses")
        .select("user_name, user_id, exchanged_photo_url")
        .match({ room_id: roomId, round: 1 });
      photos && setExchangedPhotoUrl(photos);
    };
    isAllowedFetch && fetchExchangedPhotoUrl();
  }, [isAllowedFetch]);

  return exchangedPhotoUrl;
};
