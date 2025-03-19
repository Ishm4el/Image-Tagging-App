import { useNavigate, useParams } from "react-router-dom";
import styles from "./LevelFramework.module.css";
import imageSources from "../imageSourceConfig";
import { useEffect, useState } from "react";

export default function LevelFramework(): React.ReactElement {
  const { stage } = useParams();
  if (stage !== undefined) {
    const navigate = useNavigate();
    const arraySplitStage: readonly string[] = stage.split("_");
    const stageNumber: string = arraySplitStage[1];
    const levelTitle: string = arraySplitStage[0] + " " + arraySplitStage[1];
    const [letters, setLetters] = useState<any>(null);
    const [focusedLetter, setFocusedLetter] = useState<any>(null);
    const [error, setError] = useState(null);
    const [levelToken, setLevelToken] = useState(null);
    const [completed, setCompleted] = useState<any>(null);

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
          setLetters(
            response.map((letter, index) => {
              console.log("letter: ", letter);
              if (index !== 0)
                return {
                  active: false,
                  found: false,
                  letter: letter.letter,
                  token: "",
                  levelTitle: letter.levelTitle,
                };
              else
                return {
                  active: true,
                  found: false,
                  letter: letter.letter,
                  token: "",
                  levelTitle: letter.levelTitle,
                };
            })
          );
          setFocusedLetter(response[0].letter);
        })
        .catch((error) => setError(error));

      fetch(`http://localhost:3000/tagging_game/start`, {
        method: "POST",
        mode: "cors",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ levelTitle }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLevelToken(res);
        });
    }, []);

    useEffect(() => {
      console.log("checking if the game is completed");
      if (Array.isArray(letters)) {
        for (let i = 0; i < letters.length; i++) {
          if (letters[i].found === false) return;
        }

        const tokens = letters.map((letter) => {
          return letter.token;
        });

        // console.log("tokens: ", JSON.stringify(tokens));

        fetch(`http://localhost:3000/tagging_game/confirm_victory`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokens,
            levelToken: levelToken,
          }),
        })
          .then((response) => {
            if (response.status >= 400) throw new Error("server error");
            console.log(response);
            return response.json();
          })
          .then((response) => {
            console.log(response);
            setCompleted(response);
          });
      }
    }, [letters]);

    if (error) {
      return <p>Server Error! {error}</p>;
    }

    if (
      completed &&
      typeof completed === "object" &&
      "finalToken" in completed
    ) {
      return (
        <main className={styles["container-main"]}>
          <h1>{levelTitle}</h1>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();

              fetch("http://localhost:3000/tagging_game/complete", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  finalToken: completed.finalToken,
                  userName: (ev.target as HTMLFormElement).userName.value,
                }),
              }).then(() => {
                navigate(-1);
              });
            }}
          >
            <label htmlFor="userName">Enter Name</label>
            <input type="text" id="userName" name="userName" maxLength={4} />
            <input type="submit" value="Submit" />
          </form>
        </main>
      );
    }

    if (
      Array.isArray(letters) &&
      letters.length &&
      "active" in letters[0] &&
      "letter" in letters[0] &&
      "found" in letters[0]
    ) {
      return (
        <main className={styles["container-main"]}>
          <h1>{levelTitle}</h1>
          <div className={styles["image-container"]}>
            <img
              className={styles["image-level"]}
              src={"/images/level_images/large_level_" + stageNumber + ".jpg"}
              alt={
                "wooden blocks with letters; source: " +
                imageSources[stageNumber]
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
                            if (letter.letter !== theLetter)
                              letter.active = false;
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
    }
  }
  return <main className={styles["container-main"]}>LOADING</main>;
}
