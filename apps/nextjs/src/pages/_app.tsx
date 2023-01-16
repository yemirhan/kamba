// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";

import { api } from "@acme/api/src/client";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Redirector from "../utils/redirector";

import "raf/polyfill";
import { useState } from "react";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { RouterTransition } from "../components/RouterTransition";

const fixReanimatedIssue = () => {
  // FIXME remove this once this reanimated fix gets released
  // https://github.com/software-mansion/react-native-reanimated/issues/3355
  if (process.browser) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window._frameTimestamp = null;
  }
};

fixReanimatedIssue();

const publicPages = [
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/",
] as string[];

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname, push } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ClerkProvider
      {...pageProps}
      navigate={to => push(to)}
    >
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: colorScheme,
            primaryColor: "teal",
            fontFamily: "Montserrat !important",
          }}
        >
          <NotificationsProvider>
            <RouterTransition />
            {isPublicPage ? (
              <Component {...pageProps} />
            ) : (
              <>
                <SignedIn>
                  <Component {...pageProps} />
                </SignedIn>
                <SignedOut>
                  <Redirector />
                </SignedOut>
              </>
            )}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>

    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
