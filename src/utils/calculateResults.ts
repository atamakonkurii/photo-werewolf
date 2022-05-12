import { supabase } from "@/utils/supabase";

export const calculateResults = async (roomId: string) => {
  const { data: userVoting } = await supabase
    .from("standard_game_user_progresses")
    .select("user_id, user_id_voted_for, standard_role")
    .match({ room_id: roomId });

  userVoting?.map(async (user) => {
    let result = "UNSETTLLED";

    if (user.standard_role === "WEREWOLF") {
      userVoting.find((v: { user_id_voted_for: string }) => {
        if (v.user_id_voted_for === user.user_id) {
          result = "LOSE";
        }
      });

      if (result === "UNSETTLLED") {
        result = "WIN";
      }
    } else {
      const votingUserRole = userVoting.find((v: { user_id: string }) => {
        return v.user_id === user.user_id_voted_for;
      }).standard_role;

      if (votingUserRole === "WEREWOLF") {
        result = "WIN";
      } else {
        result = "LOSE";
      }
    }

    await supabase
      .from("standard_game_user_progresses")
      .update({
        results: result,
      })
      .match({ room_id: roomId, user_id: user.user_id, round: 1 });
  });
};
