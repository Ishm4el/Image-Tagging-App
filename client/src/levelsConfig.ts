type CardLevelDescriptionProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  href: string;
  thumbnailLink: string;
  highscore: string;
};
const stagesLevelsArray: Array<CardLevelDescriptionProps> = [
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 1",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00",
  },
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 2",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00",
  },
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 3",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00",
  },
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 4",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00",
  },
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 5",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00",
  },
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 6",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00",
  },
];

export default stagesLevelsArray;