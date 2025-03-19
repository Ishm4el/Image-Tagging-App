import { useNavigate } from "react-router-dom";
import styles from "../LevelFramework.module.css";
const Completed = ({
  levelTitle,
  finalToken,
}: {
  levelTitle: string;
  finalToken: string;
}) => {
  const navigate = useNavigate();
  return (
    <main className={styles["container-main"]}>
      <h1>{levelTitle}</h1>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          fetch("http://localhost:3000/tagging_game/complete", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              finalToken: finalToken,
              userName: (ev.target as HTMLFormElement).userName.value,
            }),
          }).then(() => {
            navigate(-1);
          });
        }}
      >
        <label htmlFor="userName">Enter Name</label>
        <input type="text" id="userName" name="userName" maxLength={4} />
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
};

export default Completed;
