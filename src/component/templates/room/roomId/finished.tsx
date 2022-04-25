import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";

export const Finished: VFC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <Title title="工事中" />
      <Title title="集計機能はできていません" />
      <img src="/images/ojigi_animal_inu.png" />
    </div>
  );
};
