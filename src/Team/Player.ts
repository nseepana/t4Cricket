import { Team } from './Bowling';
import Cricketcontext from '../Simulator/Cricketcontext';
export class Player {
  playerProbability: number[];
  constructor(
    public player: string,
    public team: Team,
    public ballProbability: number[]
  ) {
    this.setdefaults(ballProbability);
  }
  setdefaults(ballProbability) {
    this.playerProbability = ballProbability.map(val => (val / 100));
  }
  scored() {
    if (!this.validate()) {
      console.error("Score: invalid");
    }
    let scored = -1;
    let { playerProbability, ballProbability, getrandom } = this;
    for (
      let i = 0, score = 0, slected = getrandom(), len = ballProbability.length;
      i < len;
      i++
    ) {
      score += playerProbability[i];
      if (slected <= score) {
        scored = ballProbability[i];
        break;
      }
    }
    return scored;
  }

  validate() {
    let { playerProbability, ballProbability } = this;
    let assess = playerProbability.reduce((acc, curr) => acc + curr);
    return (
      assess === 1.0 && playerProbability.length === ballProbability.length
    );
  }

  getrandom() {
    return Math.random() * 1;
  }

  nextRun(cricketContext:Cricketcontext){
	  return cricketContext.nextRun();
  }
}