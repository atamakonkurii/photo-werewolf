import type { CustomNextPage } from "next";

import { PreGameLayout } from "@/component/layout";
import { Index } from "@/component/pages/index/index";

const IndexPage: CustomNextPage = () => {
  return <Index />;
};

IndexPage.getLayout = PreGameLayout;

export default IndexPage;
