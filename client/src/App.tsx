import NavigationBar from "./components/NavigationBar";
import appLogo from "/personal-svgrepo-com.svg";

function App() {
  return (
    <>
      <NavigationBar
        links={[
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
      <h1>Hello World</h1>
    </>
  );
}

export default App;
