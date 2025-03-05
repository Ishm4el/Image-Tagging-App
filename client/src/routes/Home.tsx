import styles from "./Home.module.css";
export default function Home(): React.ReactElement {
  return (
    <main className={styles["container-main"]}>
      <div className={styles["card-home-welcome"]}>
        <h1>Welcome to The Tagging Wizard!</h1>
        <p>Are you ready to show off your tagging skills?</p>
        <div className={styles.something}>a</div>
      </div>
    </main>
  );
}
