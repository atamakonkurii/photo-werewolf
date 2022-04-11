import type { CustomNextPage } from "next";

import { FixedLayout } from "@/component/layout";
import { About } from "@/component/templates/about";

const AboutPage: CustomNextPage = () => {
  return <About />;
};

AboutPage.getLayout = FixedLayout;

export default AboutPage;
