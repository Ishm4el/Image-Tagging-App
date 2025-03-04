import { ReactElement } from "react";
import NavigationBar from "./components/NavigationBar";
import appLogo from "/personal-svgrepo-com.svg";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App(): ReactElement {
  return (
    <>
      <NavigationBar
        links={[
          { linkTitle: "Home", linkAddress: "/" },
          { linkTitle: "Stages", linkAddress: "/Stages" },
          { linkTitle: "Scoresboards", linkAddress: "/Scoreboards" },
          { linkTitle: "About", linkAddress: "/About" },
        ]}
        webTitle={{
          title: "The Tagging Wizard",
          svgLink: appLogo,
          homeRoute: "/",
        }}
      />
      <main className={styles["container-main"]}>
        <Outlet />
      </main>
      <footer className={styles["container-footer"]}>
        <span>Author: Ismael Valenzuela</span>
        <a href="https://github.com/Ishm4el">Github Profile</a>
        <a href="https://github.com/Ishm4el/Image-Tagging-App">
          This Apps Repo
        </a>
      </footer>
    </>
  );
}

export default App;
