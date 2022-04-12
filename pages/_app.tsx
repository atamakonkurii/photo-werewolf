import "@/style/index.css";

import type { CustomAppPage } from "next/app";
import Head from "next/head";
import { memo } from "react";

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <Head>
        <title>photo werewolf</title>
      </Head>
      <div className="bg-gray-900">
        {getLayout(<Component {...pageProps} />)}
      </div>
    </>
  );
};

export default memo(App);
