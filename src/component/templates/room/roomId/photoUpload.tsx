import { Button } from "@mantine/core";
import { Image } from "@mantine/core";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import { Title } from "@/component/atoms/Title";
import { changeGameType } from "@/utils/changeGameType";
import { supabase } from "@/utils/supabase";

type Props = {
  isOwner: boolean;
};

const removeBucketPath = (key: string, bucketName: string) => {
  return key.slice(bucketName.length + 1);
};

const handleChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  roomId: string,
  userId: string,
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>,
  setPhotoUrl: React.Dispatch<React.SetStateAction<string>>
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

  setIsUploaded(true);
  publicURL && setPhotoUrl(publicURL);
};

export const PhotoUpload: VFC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const router = useRouter();
  // eslint-disable-next-line react/destructuring-assignment
  const isOwner = props.isOwner;

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
    <div className="flex flex-col justify-center items-center p-4">
      <Title title="写真人狼遊び方" />
      <Title title="①テーマ決め：話し合ってテーマを決める。" />
      <Title title="②写真選択：スマホのカメラロールから、テーマに沿った画像を一枚選ぶ。" />
      <Title title="③話し合い：自分が選んだ画像について語る。ただし、人狼は人狼同士で画像が交換されている。" />
      <Title title="④投票：話し合い終了後人狼だと思った人に投票する。投票権は市民にしかない。人狼は選ばれなかったら大勝利、市民は人狼を当てたら小勝利。個人戦。" />
      {!isUploaded ? (
        <>
          <Image
            width={200}
            height={300}
            src={""}
            alt="With default placeholder"
            withPlaceholder
          />
          <div className="mb-8"></div>
          <Button color="violet" onClick={fileUpload}>
            画像を選ぶ
          </Button>
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
              handleChange(event, roomId, userId, setIsUploaded, setPhotoUrl);
            }}
          />
        </>
      ) : (
        <>
          <div className="mb-2.5 sm:mr-2.5 sm:mb-0">
            <Image
              width={200}
              height={300}
              src={photoUrl}
              alt="With default placeholder"
              withPlaceholder
            />
            <div className="mb-8"></div>
            <div className="text-white">ホストの操作をお待ちください</div>
          </div>
        </>
      )}

      <div className="mb-8"></div>
      {isOwner ? (
        <Button
          color="violet"
          radius="md"
          size="lg"
          onClick={() => {
            changeGameType(roomId, "PHOTO_UPLOAD");
          }}
        >
          ゲームスタート
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
