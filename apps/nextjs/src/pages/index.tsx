import { type NextPage } from "next";
import Head from "next/head";
import { AppShell } from "@mantine/core";
import { SplashHeader } from "../components/SplashHeader";
import { SplashHero } from "../components/SplashHero";
import { SplashFeatures } from "../components/SplashFeatures";
import { SplashFooter } from "../components/SplashFooter";

const Home: NextPage = () => {

  return (
    <>

      <Head>
        <title>Kamba</title>

      </Head>
      <AppShell
        header={<SplashHeader />}
        footer={<SplashFooter links={[]} />}
      >
        <SplashHero />
        <SplashFeatures title={"title"} description="desc" />
      </AppShell>
    </>
  );
};

export default Home;

