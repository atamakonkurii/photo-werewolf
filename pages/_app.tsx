import "@/style/index.css";

import type { Session, User } from "@supabase/supabase-js";
import type { CustomAppPage } from "next/app";
import Head from "next/head";
import { memo } from "react";
import { useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";
import { UserContext } from "@/utils/UserContext";

const App: CustomAppPage = ({ Component, pageProps }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <>
      <Head>
        <title>photo werewolf</title>
      </Head>
      <UserContext.Provider value={{ user, session }}>
        <div className="bg-gray-900">
          {getLayout(<Component {...pageProps} />)}
        </div>
      </UserContext.Provider>
    </>
  );
};

export default memo(App);
