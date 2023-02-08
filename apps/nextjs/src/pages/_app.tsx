// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { api } from "@acme/api/src/client";
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { dark } from "@clerk/themes";
import { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { RouterTransition } from "@/components/RouterTransition";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { push } = useRouter();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
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
          <ClerkProvider
            {...pageProps}
            appearance={{ baseTheme: dark }}
            navigate={(to) => push(to)}
          >
            <Component {...pageProps} />
          </ClerkProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default api.withTRPC(MyApp);
