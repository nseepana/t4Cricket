import { Team } from "./Bowling";
import { Player } from './Player';




export default class Batsman extends Player {
  ballsPlayed: number = 0;
  totalRunScored: number;
  requiredRun: number;
  netRunRequiredForWinning: number;
  constructor(player: string, team: Team, ballProbability: number[]) {
    super(player, team, ballProbability);
  }

  nextRun() {
    let totalRuns = this.totalRunScored;
    let currentScore = this.scored();
    if (currentScore > 0) {
      totalRuns += currentScore;
      this.requiredRun = this.requiredRun - currentScore;
      this.totalRunScored = totalRuns;
    }
    this.afterRun();
  }

  afterRun() {
    console.log(this);
  }
}
