import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./Stages.module.css";

type CardLevelDescriptionProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  href: string;
  highscore: string;
};
function CardLevelDescription({
  title,
  difficulty,
  href,
  highscore,
}: CardLevelDescriptionProps): React.ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const arraySplitHref: readonly string[] = href.split("_");
  const stageNumber: string = arraySplitHref[1];
  const thumbnailLink: string =
    "../../public/small_level_" + stageNumber + ".jpg";

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
      <div className={styles["card-stage  -right"]}>
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
export default function Stages({ levels }: StagesProps): React.ReactElement {
  const levelCards = levels.map((level) => (
    <CardLevelDescription
      difficulty={level.difficulty}
      href={level.href}
      title={level.title}
      highscore={level.highscore}
      key={level.title}
    />
  ));

  return (
    <main className={styles["container-main"]}>
      <header>
        <h1>STAGES</h1>
      </header>
      <section className={styles["dashboard-stages"]}>{levelCards}</section>
    </main>
  );
}
