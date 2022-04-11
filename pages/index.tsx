import type { CustomNextPage } from "next";

import { FluidLayout } from "@/component/layout";
import { Index } from "@/component/pages/index/index";

const IndexPage: CustomNextPage = () => {
  return <Index />;
};

IndexPage.getLayout = FluidLayout;

export default IndexPage;
