import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

type Value = {
  user: User | null;
  session: Session | null;
};
export const UserContext = createContext<Value>({ user: null, session: null });
