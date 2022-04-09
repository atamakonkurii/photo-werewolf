import type { CustomNextPage } from "next";
import { Index } from "src/pages/index";

import { FluidLayout } from "@/component/layout";

const IndexPage: CustomNextPage = () => {
  return <Index />;
};

IndexPage.getLayout = FluidLayout;

export default IndexPage;
