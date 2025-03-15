import { useParams } from "react-router-dom";
import styles from "./LevelFramework.module.css";
import imageSources from "../imageSourceConfig";
import { useEffect, useState } from "react";

export default function LevelFramework(): React.ReactElement {
  const { stage } = useParams();
  if (stage !== undefined) {
    const arraySplitStage: readonly string[] = stage.split("_");
    const stageNumber: string = arraySplitStage[1];
    const [letters, setLetters] = useState<any>(null);
    const [focusedLetter, setFocusedLetter] = useState<any>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch(`http://localhost:3000/levels/basic/${stage}`, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => {
          if (response.status >= 400) throw new Error("server error");
          console.log(response);
          return response.json();
        })
        .then((response: Array<any>) => {
          console.log("setting letters to: ", response);
          setLetters(
            response.map((letter, index) => {
              if (index !== 0)
                return {
                  active: false,
                  letter: letter.letter,
                };
              else return { active: true, letter: letter.letter };
            })
          );
          setFocusedLetter(response[0].letter);
        })
        .catch((error) => setError(error));
    }, []);

    if (error) {
      return <p>Server Error! {error}</p>;
    }

    if (
      Array.isArray(letters) &&
      letters.length &&
      "active" in letters[0] &&
      "letter" in letters[0]
    ) {
      return (
        <main className={styles["container-main"]}>
          <h1>{arraySplitStage[0] + " " + arraySplitStage[1]}</h1>
          <div className={styles["image-container"]}>
            <img
              className={styles["image-level"]}
              src={"/images/level_images/large_level_" + stageNumber + ".jpg"}
              alt={
                "wooden blocks with letters; source: " +
                imageSources[stageNumber]
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
                  const theLetter: string = (ev.target as HTMLElement)
                    .innerHTML;
                  setLetters(
                    (prevLetters: { letter: string; active: boolean }[]) => {
                      const newLetters = prevLetters.map((letter) => {
                        if (letter.letter !== theLetter) letter.active = false;
                        else {
                          letter.active = true;
                          setFocusedLetter(letter.letter);
                        }
                        return letter;
                      });
                      return newLetters;
                    }
                  );
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
  }
  return <main className={styles["container-main"]}>LOADING</main>;
}
