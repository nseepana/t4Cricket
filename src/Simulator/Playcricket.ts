import Bowling, { Team } from "../Team/Bowling";
import Batsman from "../Team/Batsman";
import { Simulator } from "./Simulator";

export const Cricketer = {
  Kirat: "Kirat Boli",
  Nodhi: "N.S Nodhi",
  Rumra: "R Rumrah",
  Henra: "Shashi Henra"
};

export default class Playcricket {
  static play() {
    let chennaiSquad: Bowling = new Bowling(4, Team.Chennai);
    let bengaluruSquad: Batsman[] = [
      new Batsman(Cricketer.Kirat, Team.Bengaluru, [5, 30, 25, 10, 15, 1, 9, 5]),
      new Batsman(Cricketer.Nodhi, Team.Bengaluru, [10, 40, 20, 5, 10, 1, 4, 10]),
      new Batsman(Cricketer.Rumra, Team.Bengaluru, [20, 30, 15, 5, 5, 1, 4, 20]),
      new Batsman(Cricketer.Henra, Team.Bengaluru, [30, 25, 5, 0, 5, 1, 4, 30])
    ];
    let simulator = new Simulator(chennaiSquad, bengaluruSquad, 40);
    simulator.play();
  }
}
