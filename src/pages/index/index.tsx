import type { VFC } from "react";

import { NormalButton } from "@/component/atoms/Button";

export const Index: VFC = () => {
  return (
    <div>
      <h2>Index</h2>
      <NormalButton>Click me!</NormalButton>
    </div>
  );
};
