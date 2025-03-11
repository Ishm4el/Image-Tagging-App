import { useParams } from "react-router-dom";
import styles from "./LevelFramework.module.css";
import imageSources from "../imageSourceConfig";
import { useState } from "react";
import levelsInfo from "../levelsConfig";

export default function LevelFramework(): React.ReactElement {
  const { stage } = useParams();
  if (stage !== undefined) {
    const arraySplitStage: readonly string[] = stage.split("_");
    const stageNumber: string = arraySplitStage[1];
    const imageLink: string =
      "/level_images/large_level_" + stageNumber + ".jpg";
    const thisLevelInfo = levelsInfo[Number(stageNumber) - 1];
    const [letters, setLetters] = useState(
      thisLevelInfo.letters.map((letter, index) => {
        if (index !== 0)
          return {
            active: false,
            letter: letter.letter,
          };
        else return { active: true, letter: letter.letter };
      })
    );
    const [focusedLetter, setFocusedLetter] = useState(letters[0].letter);
    return (
      <main className={styles["container-main"]}>
        <h1>{arraySplitStage[0] + " " + arraySplitStage[1]}</h1>
        <div className={styles["image-container"]}>
          <img
            className={styles["image-level"]}
            src={imageLink}
            alt={
              "wooden blocks with letters; source: " + imageSources[stageNumber]
            }
            onClick={(ev) => {
              const target = ev.target as HTMLImageElement;
              const rect = target.getBoundingClientRect();
              const x = ev.clientX - rect.left;
              const y = ev.clientY - rect.top;
              const xPercent = x / rect.width;
              const yPercent = y / rect.height;
              const actualX = xPercent * target.naturalWidth;
              const actualY = yPercent * target.naturalHeight;
              
              // make a fetch request here
              console.log(
                "left? : ",
                actualX,
                "; top: ",
                actualY,
                "; focused letter: ",
                focusedLetter
              );
            }}
          />
        </div>
        <div>
          {letters.map((letter) => (
            <button
              onClick={(ev) => {
                const theLetter: string = (ev.target as HTMLElement).innerHTML;
                setLetters((prevLetters) => {
                  const newLetters = prevLetters.map((letter) => {
                    if (letter.letter !== theLetter) letter.active = false;
                    else {
                      letter.active = true;
                      setFocusedLetter(letter.letter);
                    }
                    return letter;
                  });
                  return newLetters;
                });
              }}
              key={letter.letter}
              className={
                styles[
                  letter.active
                    ? "letter-button-active"
                    : "letter-button-inactive"
                ]
              }
            >
              {letter.letter}
            </button>
          ))}
        </div>
      </main>
    );
  }
  return <main className={styles["container-main"]}>ERROR IN STAGE</main>;
}
