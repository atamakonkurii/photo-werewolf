import type { CustomNextPage } from "next";

import { FixedLayout } from "@/component/layout";

const RoomIdPage: CustomNextPage = () => {
  return <h1>tatatat</h1>;
};

RoomIdPage.getLayout = FixedLayout;

export default RoomIdPage;
