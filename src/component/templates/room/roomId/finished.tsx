import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";

export const Finished: VFC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="終了" />
    </div>
  );
};
