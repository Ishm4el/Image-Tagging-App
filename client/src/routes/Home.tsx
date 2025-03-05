import { Link } from "react-router-dom";
import styles from "./Home.module.css";
export default function Home(): React.ReactElement {
  return (
    <main className={styles["container-main"]}>
      <div className={styles["card-home-welcome"]}>
        <div className={styles["card-welcome"]}>
          <h1>
            Welcome<br></br>to<br></br>
            <span>The Tagging Wizard!</span>
          </h1>
          <p>Are you ready to show off your tagging skills?</p>
        </div>
        <div className={styles["card-text"]}>
          <h2>Description</h2>
          <p>
            This is is a image tagging game, where the player is presented an
            image and are timed with the objective of tagging all of the objects
            tasked to be identified
          </p>
        </div>
        <div className={styles["card-text"]}>
          <h2>To Start</h2>
          <p>
            Let's select a stage!: <Link to={"/stages"}>STAGES</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
