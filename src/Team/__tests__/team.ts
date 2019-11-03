import { Cricketer } from "./../../Simulator/Playcricket";
import { Simulator } from "./../../Simulator/Simulator";
import Bowling, { Team } from "../Bowling";
import Batsman from "../Batsman";

describe("Team:", () => {
  test("simulator", () => {
    let bowling = new Bowling(4, Team.Chennai);
    let batsmen: Batsman[] = [
      new Batsman(Cricketer.Kirat, Team.Bengaluru, [5, 30, 25, 10, 15, 1, 9, 5])
    ];
    expect(() => {
      new Simulator(bowling, batsmen, 40);
    }).toThrow();

    batsmen.push(new Batsman(Cricketer.Nodhi, Team.Bengaluru, [10, 40, 20, 5, 10, 1, 4, 10]));
    let simulator = new Simulator(bowling, batsmen, 40);
    let val = expect(simulator.play);
    val.toBeTruthy();
  });
});
