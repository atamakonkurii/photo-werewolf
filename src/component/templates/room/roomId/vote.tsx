import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";

export const Vote: VFC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="投票タイム" />
    </div>
  );
};
