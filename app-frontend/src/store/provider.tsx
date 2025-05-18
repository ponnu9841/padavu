"use client";

import { Provider as StoreProvider } from "react-redux";
import { store } from "@/store";

export default function Provider({ children }: { children: React.ReactNode }) {
   return <StoreProvider store={store}>{children}</StoreProvider>;
}
