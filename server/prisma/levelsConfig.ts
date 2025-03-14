import { readFileSync } from "fs";
type CardLevelDescriptionProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  highscore: string;
  letters: { letter: string; x: number; y: number; length: number }[];
};

const stagesLevelsArray: Array<CardLevelDescriptionProps> = JSON.parse(
  readFileSync("./../levelConfig.json", "utf-8")
);

export default stagesLevelsArray;
