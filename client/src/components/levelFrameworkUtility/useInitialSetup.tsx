import { Dispatch, useEffect } from "react";

const fetchLetters = ({
  setLetters,
  setFocusedLetter,
  setError,
  stage,
}: {
  setLetters: Dispatch<any>;
  setFocusedLetter: Dispatch<any>;
  setError: Dispatch<any>;
  stage: string;
}) => {
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
};

const fetchLevelStart = ({
  levelTitle,
  setLevelToken,
}: {
  levelTitle: string;
  setLevelToken: Dispatch<any>;
}) => {
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
};

const useInitialSetup = ({
  setLetters,
  setFocusedLetter,
  setError,
  stage,
  levelTitle,
  setLevelToken,
}: {
  setLetters: Dispatch<any>;
  setFocusedLetter: Dispatch<any>;
  setError: Dispatch<any>;
  stage: string;
  levelTitle: string;
  setLevelToken: Dispatch<any>;
}) => {
  useEffect(() => {
    fetchLetters({ setLetters, setFocusedLetter, setError, stage });
    fetchLevelStart({ levelTitle, setLevelToken });
  }, []);
};

export default useInitialSetup;
