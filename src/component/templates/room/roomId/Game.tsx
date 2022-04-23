import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";

export const Game: VFC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="話し合い" />
    </div>
  );
};
