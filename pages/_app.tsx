import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const MainComponent = Component as any;
  return (
    <SessionProvider session={session}>
      <MainComponent {...pageProps} />
    </SessionProvider>
  );
}
