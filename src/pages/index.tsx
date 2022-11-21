import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { AppShell, Title } from "@mantine/core";
import { SplashHeader } from "../components/SplashHeader";
import { SplashHero } from "../components/SplashHero";
import { SplashFeatures } from "../components/SplashFeatures";
import { SplashFooter } from "../components/SplashFooter";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Kamba</title>
        <link rel="icon" href="/layout-kanban.svg" />
      </Head>
      <AppShell
        header={<SplashHeader />}
        footer={<SplashFooter links={[]} />}
      >
        <SplashHero />
        <SplashFeatures title={"gdgdgfdgf"} description="desc" />
      </AppShell>
    </>
  );
};

export default Home;

