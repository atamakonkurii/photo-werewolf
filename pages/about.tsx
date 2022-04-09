import type { CustomNextPage } from "next";
import { About } from "src/pages/about";

import { FixedLayout } from "~/component/layout";

const AboutPage: CustomNextPage = () => {
  return <About />;
};

AboutPage.getLayout = FixedLayout;

export default AboutPage;
