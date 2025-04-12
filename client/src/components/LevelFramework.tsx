import { useParams } from "react-router-dom";
import styles from "./LevelFramework.module.css";
import { useState } from "react";
import useGameCompleted from "./levelFrameworkUtility/useGameCompleted";
import Completed from "./levelFrameworkUtility/Completed";
import TheGame from "./levelFrameworkUtility/TheGame";
import useInitialSetup from "./levelFrameworkUtility/useInitialSetup";

export default function LevelFramework(): React.ReactElement {
  const { stage } = useParams();
  if (stage !== undefined) {
    const arraySplitStage: readonly string[] = stage.split("_");
    const stageNumber: string = arraySplitStage[1];
    const levelTitle: string = arraySplitStage[0] + " " + arraySplitStage[1];
    const [letters, setLetters] = useState<any>(null);
    const [focusedLetter, setFocusedLetter] = useState<any>(null);
    const [error, setError] = useState(null);
    const [levelToken, setLevelToken] = useState<any>(null);
    const [completed, setCompleted] = useState<any>(null);

    useInitialSetup({
      setLetters,
      setFocusedLetter,
      setError,
      stage,
      levelTitle,
      setLevelToken,
    });

    useGameCompleted({ letters, levelToken, setCompleted, setError });

    // display if there is an error
    if (error) {
      return <p>Server Error! {error}</p>;
    }

    //  display if the game is completed
    if (
      completed &&
      typeof completed === "object" &&
      "finalToken" in completed
    ) {
      return (
        <Completed finalToken={completed.finalToken} levelTitle={levelTitle} />
      );
    }

    // display the game
    if (
      Array.isArray(letters) &&
      letters.length &&
      "active" in letters[0] &&
      "letter" in letters[0] &&
      "found" in letters[0]
    ) {
      return (
        <TheGame
          focusedLetter={focusedLetter}
          letters={letters}
          levelTitle={levelTitle}
          setFocusedLetter={setFocusedLetter}
          setLetters={setLetters}
          stageNumber={stageNumber}
        />
      );
    }
  }

  // display loading screen
  return <main className={styles["container-main"]}>LOADING</main>;
}
