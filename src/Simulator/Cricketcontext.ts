import { Player } from './../Team/Player';
import Bowling from "../Team/Bowling";
import Batsman from "../Team/Batsman";
import ICricketRule from "./ICricketrule";
import { Team } from '../Team/Bowling';
import Scorecard from '../Score/Scorecard';
import { Matchstate } from '../Score/Matchstate';

export default abstract class Cricketcontext implements ICricketRule {
	scorecard:Scorecard;
	player:Player;
  constructor(
    public bowling: Bowling,
    public striker: Batsman,
    public nonstriker: Batsman,
    public runsRequired: number,
  ) {
    this.setdefaults(striker, runsRequired);
  }

  setdefaults(striker, runsRequired) {
	  this.player = new Player(striker, Team.Bengaluru, striker.ballProbability);
	  console.log(this.player);
	  this.scorecard = new Scorecard(0, runsRequired, runsRequired);
  }

  nextRun() {
    let totalRuns = this.scorecard.totalRunScored;
    let currentScore = this.scorecard.currentScore;
    if (currentScore > 0) {
      totalRuns += currentScore;
      this.scorecard.requiredRun = this.scorecard.requiredRun - currentScore;
      this.scorecard.totalRunScored = totalRuns;
    }
    this.afterRun();
	return this.scorecard;
  }

  nextBall(){
	  this.beforeBowl();
	  let restballs = this.bowling.remainingBalls;
	  restballs -= 1;
	  this.bowling.remainingBalls = restballs;
	  this.bowling.remainingOver = parseInt(""+ restballs/6, 10);
	  return this.bowling;

  }

  abstract afterRun():void;

  abstract beforeBowl():void;

  abstract isWon():Matchstate;

}
