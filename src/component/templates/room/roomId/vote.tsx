import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";

export const Vote: VFC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="各人画像アップロード→話し合い→投票タイム→結果発表→終了" />
    </div>
  );
};
