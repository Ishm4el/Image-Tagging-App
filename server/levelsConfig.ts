type CardLevelDescriptionProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  highscore: string;
  letters: { letter: string; x: number; y: number; length: number }[];
};
const stagesLevelsArray: Array<CardLevelDescriptionProps> = [
  {
    difficulty: "Easy",
    title: "Level 1",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
  {
    difficulty: "Easy",
    title: "Level 2",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
  {
    difficulty: "Easy",
    title: "Level 3",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
  {
    difficulty: "Easy",
    title: "Level 4",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
  {
    difficulty: "Easy",
    title: "Level 5",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
  {
    difficulty: "Easy",
    title: "Level 6",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
  {
    difficulty: "Easy",
    title: "Level 7",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
  {
    difficulty: "Easy",
    title: "Level 8",
    highscore: "00:00:00",
    letters: [
      { letter: "g", length: 100, x: 101, y: 102 },
      { letter: "i", length: 100, x: 101, y: 102 },
      { letter: "t", length: 100, x: 101, y: 102 },
    ],
  },
];

export default stagesLevelsArray;
