import { Button } from "@mantine/core";
import type { VFC } from "react";
import { useRef } from "react";

import { Title } from "@/component/atoms/Title";
import { supabase } from "@/utils/supabase";

export const PhotoUpload: VFC = () => {
  const inputRef = useRef(null);

  const test = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { data } = await supabase.storage
      .from("photos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // eslint-disable-next-line no-console
    console.log(data?.Key);
  };

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
          onChange={test}
        />
      </div>
    </div>
  );
};
