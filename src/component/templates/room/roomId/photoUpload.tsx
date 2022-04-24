import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import { Title } from "@/component/atoms/Title";
import { supabase } from "@/utils/supabase";

const removeBucketPath = (key: string, bucketName: string) => {
  return key.slice(bucketName.length + 1);
};

const handleChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  roomId: string,
  userId: string
) => {
  if (event.target.files === null || event.target.files.length === 0) {
    return;
  }

  const file = event.target.files[0];
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;
  const { data: inputData } = await supabase.storage
    .from("photos")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  const key = inputData?.Key;

  if (!key) {
    throw new Error("Error");
  }

  const { publicURL } = supabase.storage
    .from("photos")
    .getPublicUrl(removeBucketPath(key, "photos"));

  await supabase
    .from("standard_game_user_progresses")
    .update([
      {
        photo_key: key,
        photo_url: publicURL,
      },
    ])
    .match({ room_id: roomId, user_id: userId });
};

export const PhotoUpload: VFC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== router.route) {
      const roomId_tmp = router.asPath.split("/")[2];
      const roomIdPath = roomId_tmp.split("?uid=")[0];
      const userIdPath = roomId_tmp.split("?uid=")[1];
      setUserId(userIdPath);
      setRoomId(roomIdPath);
    }
  }, [router.asPath]);

  const fileUpload = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="①話し合ってテーマを決める。" />
      <Title title="②スマホのカメラロールから、テーマに沿った画像を一枚選ぶ。" />
      <div>
        <Button onClick={fileUpload}>画像を選択する</Button>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          ref={inputRef}
          id="single"
          accept="image/*"
          onChange={(event) => {
            handleChange(event, roomId, userId);
          }}
        />
      </div>
    </div>
  );
};
