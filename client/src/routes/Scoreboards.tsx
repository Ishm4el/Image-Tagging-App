import { useEffect, useState } from "react";
import styles from "./Scoreboards.module.css";
import { useNavigate } from "react-router-dom";
type stages = { letter: string; title: string }[];

const CardLevelOption = (props: { stages: stages }): React.ReactElement[] => {
  const navigate = useNavigate();
  console.log(JSON.stringify(props.stages));

  const elements = props.stages.map((stageData) => {
    const splitLevelString: Array<string> = stageData.title.split(" ");
    const levelHref = splitLevelString[0] + "_" + splitLevelString[1];
    const levelNumber = splitLevelString[1];
    const thumbnailLink: string =
      "images/level_thumbnails/small_level_" + levelNumber + ".jpg";
    return (
      <div className={styles["card-stage"]} key={stageData.title}>
        <div className={styles["card-stage-top"]}>
          <img src={thumbnailLink} alt={thumbnailLink} />
        </div>
        <div className={styles["card-stage-bottom"]}>
          <h2>{stageData.title}</h2>
          <button
            onClick={() => {
              navigate(levelHref);
            }}
          >
            View Scores
          </button>
        </div>
      </div>
    );
  });
  return elements;
};

export default function Scoreboards(): React.ReactElement {
  const [error, setError] = useState(null);
  const [stages, setStages] = useState<stages>();
  useEffect(() => {
    fetch("http://localhost:3000/levels/only_stages", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("server error");
        }
        console.log(res);
        return res.json();
      })
      .then((res: stages) => {
        setStages(res);
      })
      .catch((error) => setError(error));
  }, []);
  if (error) return <p>A network error occured! {error}</p>;
  if (stages)
    return (
      <main className={styles["container-main"]}>
        <h1>Scoreboards</h1>
        <section className={styles["container-stages"]}>
          <CardLevelOption stages={stages} />
        </section>
      </main>
    );
  return <p>loading</p>;
}
