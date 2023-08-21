import Header from "./Header";
import Footer from "./Footer";
import { Html } from "next/document";
import Head from "next/head";
import TopBar from "./Base/TopBar";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div className="content">
        {/* <Header /> */}
        <TopBar />
        <div className="h-[calc(100vh-60px)] ">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
