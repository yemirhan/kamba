// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";

import { api } from "@acme/api/src/client";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Redirector from "../utils/redirector";

import { useState } from "react";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { RouterTransition } from "@/components/RouterTransition";


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
