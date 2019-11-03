import Bowling from "../Team/Bowling";
import Batsman from "../Team/Batsman";
import ICricketRule from "./ICricketrule";
import Scorecard from "../Score/Scorecard";
import { Matchstate } from "../Score/Matchstate";

export default abstract class Cricketcontext implements ICricketRule {
  scorecard: Scorecard;
  constructor(
    public bowling: Bowling,
    public striker: Batsman,
    public nonstriker: Batsman,
    public runsRequired: number
  ) {
    this.setdefaults(runsRequired);
  }

  setdefaults(runsRequired) {
    this.scorecard = new Scorecard(runsRequired - runsRequired, runsRequired, runsRequired);
  }

  nextRun() {
    let totalRuns = this.scorecard.totalRunScored;
    let currentScore = this.striker.scored();
    this.scorecard.currentScore = currentScore;
    if (currentScore > 0) {
      totalRuns += currentScore;
      this.scorecard.totalRunScored = totalRuns;
      let requiredRun = this.scorecard.requiredRun;
      this.scorecard.requiredRun = requiredRun - currentScore;
    }
    this.afterRun();
    return this.scorecard;
  }

  nextBall() {
    this.beforeBowl();
    let restballs = this.bowling.remainingBalls;
    restballs -= 1;
    this.bowling.remainingBalls = restballs;
    this.bowling.remainingOver = parseInt("" + restballs / 6, 10);
    return this.bowling;
  }

  abstract afterRun(): void;

  abstract beforeBowl(): void;

  abstract isWon(): Matchstate;
}
