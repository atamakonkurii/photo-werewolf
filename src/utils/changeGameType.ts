import { supabase } from "@/utils/supabase";

export const changeGameType = async (roomId: string, toRoomStatus: string) => {
  await supabase
    .from("rooms")
    .update({ room_status: toRoomStatus })
    .match({ room_id: roomId });
};
