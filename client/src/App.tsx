import { ReactElement } from "react";
import NavigationBar from "./components/NavigationBar";
import appLogo from "/personal-svgrepo-com.svg";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App(): ReactElement {
  return (
    <div className={styles["container-body"]}>
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
      <Outlet />
      <footer className={styles["container-footer"]}>
        <a href="https://github.com/Ishm4el">Author: Ismael Valenzuela</a>
        <a href="https://github.com/Ishm4el/Image-Tagging-App">
          This Apps Repo
        </a>
      </footer>
    </div>
  );
}

export default App;
