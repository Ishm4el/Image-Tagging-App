type CardLevelDescriptionProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  href: string;
  highscore: string;
  letters: { letter: string }[];
};
const stagesLevelsArray: Array<CardLevelDescriptionProps> = [
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 1",
    highscore: "00:00:00",
    letters: [{ letter: "G" }, { letter: "I" }, { letter: "T" }],
  },
  {
    difficulty: "Easy",
    href: "Level_2",
    title: "Level 2",
    highscore: "00:00:00",
    letters: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
  },
  {
    difficulty: "Easy",
    href: "Level_3",
    title: "Level 3",
    highscore: "00:00:00",
    letters: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
  },
  {
    difficulty: "Easy",
    href: "Level_4",
    title: "Level 4",
    highscore: "00:00:00",
    letters: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
  },
  {
    difficulty: "Easy",
    href: "Level_5",
    title: "Level 5",
    highscore: "00:00:00",
    letters: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
  },
  {
    difficulty: "Easy",
    href: "Level_6",
    title: "Level 6",
    highscore: "00:00:00",
    letters: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
  },
  {
    difficulty: "Easy",
    href: "Level_7",
    title: "Level 7",
    highscore: "00:00:00",
    letters: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
  },
  {
    difficulty: "Easy",
    href: "Level_8",
    title: "Level 8",
    highscore: "00:00:00",
    letters: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
  },
];

export default stagesLevelsArray;
