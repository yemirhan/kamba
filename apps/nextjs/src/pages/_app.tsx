// src/pages/_app.tsx
import { api } from "@acme/api/src/client";
import { ClerkProvider } from "@clerk/nextjs";
import "@tremor/react/dist/esm/tremor.css";
import type { AppType } from "next/app";
import "../styles/globals.css";
// import { Open_Sans, Fira_Mono } from "@next/font/google";
import { RouterTransition } from "@/components/RouterTransition";
import { dark } from "@clerk/themes";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ThemeProvider, useTheme } from "next-themes";
import { useRouter } from "next/router";

// const opensans = Open_Sans({
//   subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
//   style: ["italic", "normal"],
//   weight: ["300", "400", "500", "600", "700", "800"],
// });

// const firamono = Fira_Mono({
//   subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
//   style: ["normal"],
//   weight: "400",
// });

const MyApp: AppType = ({ Component, pageProps }) => {
  const { push } = useRouter();
  const { theme, setTheme } = useTheme();
  const toggleColorScheme = (value?: ColorScheme) => setTheme(value || "dark");
  return (
    <ThemeProvider defaultTheme="dark" themes={["dark", "light"]}>
      <ColorSchemeProvider
        colorScheme={(theme || "dark") as "dark" | "light"}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: (theme || "dark") as "dark" | "light",
            primaryColor: "teal",
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
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
