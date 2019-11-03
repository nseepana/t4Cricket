import Bowling, { Team } from "../Team/Bowling";
import Batsman from "../Team/Batsman";
import { Simulator } from './Simulator';

export const Player = {
  Kirat: "Kirat Boli",
  Nodhi: "NS Nodhi",
  Rumra: "R Rumrah",
  Henra: "Shashi Henra"
};



export default class Playcricket {
  static play() {
    let chennaiSquad: Bowling = new Bowling(4, Team.Chennai);
    let bengaluruSquad: Batsman[] = [
      new Batsman(Player.Kirat, Team.Bengaluru, [5, 30, 25, 10, 15, 1, 9, 5]),
      new Batsman(Player.Nodhi, Team.Bengaluru, [10, 40, 20, 5, 10, 1, 4, 10])
    ];
    let simulator = new Simulator(chennaiSquad, bengaluruSquad, 40);
    simulator.play();
  }
}
