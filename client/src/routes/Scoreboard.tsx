import { useParams } from "react-router-dom";
import styles from "./Scoreboard.module.css";
import { useEffect, useState } from "react";

type res =
  | ({
      scoreboard: {
        leveltitle: string;
        score: string;
        createdAt: Date;
        endTime: Date;
        startTime: Date;
        id: number;
        userName: string;
      }[];
    } & {
      title: string;
      difficulty: string;
    })
  | null;

export default function Scoreboard(): React.ReactElement {
  const [error, setError] = useState(null);
  const [scoreboard, setScoreboard] = useState<res>();
  const { stage } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/levels/scoreboard/${stage}`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        if (res.status >= 400) throw new Error("server error");
        return res.json();
      })
      .then((res: res) => {
        console.log(res);

        setScoreboard(res);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) return <p>A network error occured! {error}</p>;
  if (scoreboard?.scoreboard.length === 0) {
    return (
      <main className={styles["container-main"]}>
        <p>There are no scores at the moment for this level...</p>
      </main>
    );
  }
  if (scoreboard)
    return (
      <>
        <main className={styles["container-main"]}>
          <header>
            <h1>{stage!.replace("_", " ")} Scoreboard</h1>
          </header>
          <section>
            <div className={styles["container-table"]}>
              <table className={styles["table-scoreboard"]}>
                <caption>Scores</caption>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreboard.scoreboard.map((score) => {
                    return (
                      <tr>
                        <td>{score.userName}</td>
                        <td>{score.score}</td>
                        <td>
                          {score.createdAt
                            .toString()
                            .substring(0, 19)
                            .replace("T", " ")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <div className={styles.filler}></div>
      </>
    );
  return <p>loading</p>;
}
