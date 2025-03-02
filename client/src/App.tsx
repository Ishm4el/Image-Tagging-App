import NavigationBar from "./components/NavigationBar";
import appLogo from "/personal-svgrepo-com.svg";

function App() {
  return (
    <>
      <NavigationBar
        links={[
          { linkTitle: "TEST_TITLE1", linkAddress: "/TEST_ADDRESS1" },
          { linkTitle: "TEST_TITLE2", linkAddress: "/TEST_ADDRESS2" },
        ]}
        webTitle={{
          title: "TEST_WEB_TITLE",
          svgLink: appLogo,
        }}
      />
      <h1>Hello World</h1>
    </>
  );
}

export default App;
