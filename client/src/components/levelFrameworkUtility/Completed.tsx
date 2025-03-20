import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../LevelFramework.module.css";
const Completed = ({
  levelTitle,
  finalToken,
}: {
  levelTitle: string;
  finalToken: string;
}) => {
  const [results, setResults] = useState<any>();
  return (
    <main className={styles["container-main"]}>
      <h1>{levelTitle}</h1>
      {results ? (
        <section className={styles["section-results"]}>
          <table>
            <caption>Results</caption>
            <thead>
              <tr>
                <th>Placement</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{results.indexOfUserScore}</td>
                <td>{results.row.userName}</td>
                <td>{results.row.score}</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              <Link to={"/stages"}>Return to Stage Selection</Link>
            </li>
            <li>
              <Link
                reloadDocument
                to={`/stages/${levelTitle.replace(" ", "_")}`}
              >
                Replay Level
              </Link>
            </li>
            <li>
              <Link to={"/scoreboards"}>Scoreboards</Link>
            </li>
          </ul>
        </section>
      ) : (
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
            })
              .then((res) => {
                if (res.status >= 400) {
                  throw new Error("Server Error");
                }
                return res.json();
              })
              .then((res) => {
                setResults(res);
              });
          }}
        >
          <label htmlFor="userName">Enter Name</label>
          <input type="text" id="userName" name="userName" maxLength={4} />
          <input type="submit" value="Submit" />
        </form>
      )}
    </main>
  );
};

export default Completed;
