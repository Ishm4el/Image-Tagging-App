import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./Stages.module.css";
import { useEffect, useState } from "react";

type CardLevelDescriptionProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  highscore: string;
};
function CardLevelDescription({
  title,
  difficulty,
  highscore,
}: CardLevelDescriptionProps): React.ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const arraySplitTitle: readonly string[] = title.split(" ");
  const stageNumber: string = arraySplitTitle[1];
  const thumbnailLink: string =
    "images/level_thumbnails/small_level_" + stageNumber + ".jpg";
  const href: string = arraySplitTitle[0] + "_" + arraySplitTitle[1];

  return (
    <div className={styles["card-stage"]}>
      <div className={styles["card-stage-left"]}>
        <dl>
          <dt>Title</dt>
          <dd>{title}</dd>
          <dt>Difficulty</dt>
          <dd>{difficulty}</dd>
          <dt>Highscore</dt>
          <dd>{highscore}</dd>
        </dl>
      </div>
      <div className={styles["card-stage-right"]}>
        <img src={thumbnailLink} alt={thumbnailLink} />
        <button
          onClick={() => {
            navigate(href);
          }}
        >
          Play
        </button>
      </div>
    </div>
  );
}

type StagesProps = {
  levels: Array<CardLevelDescriptionProps>;
};
export default function Stages(): React.ReactElement {
  const [levels, setLevels] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/levels/stages", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        console.log(response);
        return response.json();
      })
      .then((response: StagesProps) => {
        console.log("setting levels to: ", response);
        setLevels(response);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) return <p>A network error occured!</p>;
  if (levels) {
    const levelCards = levels.map((level: CardLevelDescriptionProps) => (
      <CardLevelDescription
        difficulty={level.difficulty}
        title={level.title}
        highscore={level.highscore}
        key={level.title}
      />
    ));

    return (
      <main className={styles["container-main"]}>
        <header>
          <h1 className={styles["header-stage"]}>STAGES</h1>
        </header>
        <section className={styles["dashboard-stages"]}>{levelCards}</section>
      </main>
    );
  }
  return <p>Loading!</p>;
}
