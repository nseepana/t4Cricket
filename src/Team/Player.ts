import { Team } from "./Bowling";
import Cricketcontext from "../Simulator/Cricketcontext";
export class Player {
  ballProbability: number[] = [0, 1, 2, 3, 4, 5, 6, -1];
  scoreProbability: number[];
  constructor(public name: string, public team: Team, public playerProbability: number[]) {
    this.setdefaults(playerProbability);
  }
  setdefaults(playerProbability) {
    this.scoreProbability = playerProbability.map(val => val / 100);
    // console.dir(this);
  }
  scored() {
    if (!this.validate()) {
      throw new Error("Score: invalid");
    }
    let scored = -1;
    let { scoreProbability, ballProbability, getrandom } = this;
    for (let i = 0, score = 0, slected = getrandom(), len = ballProbability.length; i < len; i++) {
      score += scoreProbability[i];
      if (slected <= score) {
        scored = ballProbability[i];
        break;
      }
    }
    return scored;
  }

  validate() {
    let { scoreProbability, ballProbability } = this;
    let assess = scoreProbability.reduce((acc, curr) => acc + curr);
    return assess.toFixed(1.0) === "1.0" && scoreProbability.length === ballProbability.length;
  }

  getrandom() {
    return Math.random() * 1;
  }

  nextRun(cricketContext: Cricketcontext) {
    return cricketContext.nextRun();
  }
}
