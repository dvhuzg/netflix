import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import React from "react";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      {/*@ts-expect-error */}
      <Component {...pageProps} />
    </SessionProvider>
  );
};
export default App;
