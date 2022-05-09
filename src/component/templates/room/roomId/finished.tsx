import { useRouter } from "next/router";
import type { VFC } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Title } from "@/component/atoms/Title";
import { useAllowedFetch } from "@/hooks/useAllowedFetch";
import { supabase } from "@/utils/supabase";

export const Finished: VFC = () => {
  const router = useRouter();
  const gamePath = router.asPath;
  const roomId_tmp = gamePath.split("/")[2];
  const roomId = roomId_tmp.split("?")[0];
  const isAllowedFetch = useAllowedFetch();
  const [results, setResults] = useState<any[] | null>();

  useEffect(() => {
    const getRoomState = async () => {
      const { data: results } = await supabase
        .from("standard_game_user_progresses")
        .select("user_name, user_name_voted_for, standard_role, results")
        .match({ room_id: roomId });
      setResults(results);
    };
    isAllowedFetch && getRoomState();
  }, [isAllowedFetch]);

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <Title title="結果" />
      {results ? (
        <table className="text-sm text-white whitespace-nowrap table-auto sm:text-lg">
          <thead className="border-b">
            <tr>
              <th className="py-4 px-6">名前</th>
              <th className="py-4 px-6">投票した人</th>
              <th className="py-4 px-6">勝敗</th>
              <th className="py-4 px-6">役職</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => {
              return (
                <tr key="2" className="border-b">
                  <td className="py-4 px-6">{result.user_name}</td>
                  <td className="py-4 px-6">{result.user_name_voted_for}</td>
                  <td className="py-4 px-6">{result.results}</td>
                  <td className="py-4 px-6">{result.standard_role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>集計中</div>
      )}
    </div>
  );
};
