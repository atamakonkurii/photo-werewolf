import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";

export const PhotoUpload: VFC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="①話し合ってテーマを決める。" />
      <Title title="②スマホのカメラロールから、テーマに沿った画像を一枚選ぶ。" />
    </div>
  );
};
