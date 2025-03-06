import {
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styles from "./Stages.module.css";

export default function Stages(): React.ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const hideParentPath = ["/Stages/level_1"];
  const shouldHideParent = hideParentPath.includes(location.pathname);

  if (shouldHideParent) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return (
    <main className={styles["container-main"]}>
      <header>
        <h1>STAGES</h1>
      </header>
      <section className={styles["dashboard-stages"]}>
        <div className={styles["card-stage"]}>
          <dl>
            <dt>Title</dt>
            <dd>Level 1</dd>
            <dt>Difficulty</dt>
            <dd>Easy</dd>
          </dl>
          <button
            onClick={() => {
              navigate("level_1");
            }}
          >
            Play
          </button>
        </div>
        <div className={styles["card-stage"]}>
          <dl>
            <dt>Title</dt>
            <dd>Level 1</dd>
            <dt>Difficulty</dt>
            <dd>Easy</dd>
          </dl>
        </div>
        <div className={styles["card-stage"]}>
          <dl>
            <dt>Title</dt>
            <dd>Level 1</dd>
            <dt>Difficulty</dt>
            <dd>Easy</dd>
          </dl>
        </div>
        <div className={styles["card-stage"]}>
          <dl>
            <dt>Title</dt>
            <dd>Level 1</dd>
            <dt>Difficulty</dt>
            <dd>Easy</dd>
          </dl>
        </div>
        <div className={styles["card-stage"]}>
          <dl>
            <dt>Title</dt>
            <dd>Level 1</dd>
            <dt>Difficulty</dt>
            <dd>Easy</dd>
          </dl>
        </div>
        <div className={styles["card-stage"]}>
          <dl>
            <dt>Title</dt>
            <dd>Level 1</dd>
            <dt>Difficulty</dt>
            <dd>Easy</dd>
          </dl>
        </div>
      </section>
    </main>
  );
}
