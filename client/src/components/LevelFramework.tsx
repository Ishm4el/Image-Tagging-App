import { useParams } from "react-router-dom";
import styles from "./LevelFramework.module.css";
import imageSources from "../imageSourceConfig";
export default function LevelFramework(): React.ReactElement {
  const { stage } = useParams();
  if (stage !== undefined) {
    const arraySplitStage: readonly string[] = stage.split("_");
    const stageNumber: string = arraySplitStage[1];
    const imageLink: string =
      "/level_images/large_level_" + stageNumber + ".jpg";
    return (
      <main className={styles["container-main"]}>
        <img
          src={imageLink}
          alt={
            "wooden blocks with letters; source: " + imageSources[stageNumber]
          }
        />
        <p>{stage}</p>
        <p>Hello!</p>
      </main>
    );
  }
  return <main className={styles["container-main"]}>ERROR IN STAGE</main>;
}
