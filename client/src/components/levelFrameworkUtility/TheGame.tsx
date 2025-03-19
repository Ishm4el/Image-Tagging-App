import styles from "../LevelFramework.module.css";
import imageSources from "../../imageSourceConfig";

const TheGame = ({
  levelTitle,
  stageNumber,
  focusedLetter,
  letters,
  setLetters,
  setFocusedLetter,
}: {
  levelTitle: string;
  stageNumber: string;
  focusedLetter: string;
  letters: Array<any>;
  setLetters: React.Dispatch<any>;
  setFocusedLetter: React.Dispatch<any>;
}) => {
  return (
    <main className={styles["container-main"]}>
      <h1>{levelTitle}</h1>
      <div className={styles["image-container"]}>
        <img
          className={styles["image-level"]}
          src={"/images/level_images/large_level_" + stageNumber + ".jpg"}
          alt={
            "wooden blocks with letters; source: " + imageSources[stageNumber]
          }
          onClick={async (ev) => {
            const target = ev.target as HTMLImageElement;
            const rect = target.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            const actualX = xPercent * target.naturalWidth;
            const actualY = yPercent * target.naturalHeight;

            const bodyData = {
              x: actualX,
              y: actualY,
              letter:
                typeof focusedLetter === "string" ? focusedLetter : "ERROR",
              levelTitle,
            };

            const response = await fetch(
              `http://localhost:3000/tagging_game/confirm_coord`,
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
              }
            );

            const responseData = await response.json();
            if (responseData.found === true) {
              const prevLetters: {
                letter: string;
                found: boolean;
                active: boolean;
                token: string;
              }[] = letters;

              console.log("declaring newLetters and UPDATED AGAIN");
              const newLetters = prevLetters.map((letter) => {
                if (letter.active === true) {
                  console.log(letter.letter);

                  letter.token =
                    typeof responseData.token === "string"
                      ? responseData.token
                      : "ERROR";
                  letter.found = true;
                  letter.active = false;
                }
                return letter;
              });

              const indexOfNextFocus = newLetters.findIndex(
                (value) => value.active === false && value.found === false
              );
              if (indexOfNextFocus !== -1) {
                console.log("in if without -1");
                newLetters[indexOfNextFocus].active = true;
                setFocusedLetter(newLetters[indexOfNextFocus].letter);
                setLetters([...newLetters]);
              } else setLetters([...newLetters]);
            }
          }}
        />
      </div>
      <div>
        {letters.map((letter) => {
          if (!letter.found)
            return (
              <button
                onClick={(ev) => {
                  const theLetter: string = (ev.target as HTMLElement)
                    .innerHTML;
                  setLetters(
                    (
                      prevLetters: {
                        letter: string;
                        active: boolean;
                        found: boolean;
                        token: string;
                      }[]
                    ) => {
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
            );
          else
            return (
              <button
                key={letter.letter}
                className={styles["letter-button-found"]}
              >
                {letter.letter}
              </button>
            );
        })}
      </div>
    </main>
  );
};

export default TheGame;
