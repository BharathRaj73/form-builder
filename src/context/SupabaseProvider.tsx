// src/context/SupabaseProvider.tsx
import { createContext, useContext } from "react";
import { supabase } from "../utils/supabaseClient";

const SupabaseContext = createContext(supabase);

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <SupabaseContext.Provider value={supabase}>
    {children}
  </SupabaseContext.Provider>
);

export const useSupabase = () => useContext(SupabaseContext);
