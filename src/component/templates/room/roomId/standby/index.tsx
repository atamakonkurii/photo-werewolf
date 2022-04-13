import { Button } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import type { VFC } from "react";

export const RoomIdStandBy: VFC = () => {
  const clipboard = useClipboard({ timeout: 800 });
  return (
    <>
      <h1 className="text-white">待機部屋</h1>
      <Button
        color={clipboard.copied ? "teal" : "blue"}
        onClick={() => {
          //TODO:ドメインを取得できるようにする
          return clipboard.copy(`${document.URL}/guests/new`);
        }}
      >
        {clipboard.copied ? "コピーしました" : "招待URL"}
      </Button>
    </>
  );
};
