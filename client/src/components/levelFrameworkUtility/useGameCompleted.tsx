import { useEffect } from "react";

const useGameCompleted = ({
  letters,
  levelToken,
  setCompleted,
}: {
  letters: Array<any>;
  levelToken: string;
  setCompleted: React.Dispatch<any>;
}) => {
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
};

export default useGameCompleted;
