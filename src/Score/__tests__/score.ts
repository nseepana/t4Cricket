import Bowling, { Team } from "./../../Team/Bowling";
import Batsman from "../../Team/Batsman";

describe("Score:", () => {
  const scoreProbability = [0.05, 0.3, 0.25, 0.1, 0.15, 0.01, 0.09, 0.05];
  test("bowling", () => {
    let bowling: Bowling = new Bowling(4, Team.Chennai);
    expect(bowling.remainingBalls).toBe(24);
    expect(bowling.team).toBe(Team.Chennai);
  });
  test("batting", () => {
    let batsmen = new Batsman("Kirat Boli", Team.Bengaluru, [5, 30, 25, 10, 15, 1, 9, 5]);
    expect(batsmen.name).toEqual("Kirat Boli");
    expect(batsmen.scoreProbability).toStrictEqual(scoreProbability);
  });
});
