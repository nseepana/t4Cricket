import { Team } from "./../Team/Bowling";
import Cricketcontext from "./Cricketcontext";
import Batsman from "../Team/Batsman";
import Bowling from "../Team/Bowling";
import { Matchstate } from "../Score/Matchstate";

import {
  $matchlossformatter,
  matchtiemessage,
  $currentplayerstatusformatter,
  $wicketlossformatter,
  $overstatusformatter,
  $onwonformatter,
  $playerstatusformatter
} from "./Commentary";

const STR_WICKET = "wicket";
const STR_OVER = "over";
const STR_RUN = "run";
const STR_BALL = "ball";

export class Simulator extends Cricketcontext {
  static ballsPerover = 6;
  striker: Batsman;
  nonstriker: Batsman;
  isComplete: boolean = false;
  playedBatsmen = 0;
  summary = {};
  constructor(
    public bowling: Bowling,
    public batsman: Array<Batsman>,
    public netRunsRequired: number
  ) {
    super(bowling, batsman[0], batsman[1], netRunsRequired);
    if (batsman.length < 2) {
      throw new Error("two batsman required!");
    }
  }

  play() {
    let { bowling, striker } = this;
    let currentRun = this.scorecard;
    do {
      bowling = bowling.nextBall(this);
      currentRun = striker.nextRun(this);
      if (this.isWon() == Matchstate.WON) {
        return;
      }
    } while (bowling.remainingBalls != 0 && !this.isComplete);

    if (this.isWon() == Matchstate.LOSS) {
      this.handleLoss();

      // handle match LOSS
    } else if (this.isWon() == Matchstate.TIED) {
      this.handleTied();
    }
    // console.log(this.scorecard, this.striker, this.nonstriker);
  }

  isWon(): Matchstate {
    let { totalRunScored, netRunRequiredForWinning } = this.scorecard;
    if (netRunRequiredForWinning < 0 || totalRunScored >= netRunRequiredForWinning) {
      return Matchstate.WON;
    } else if (netRunRequiredForWinning == 0) {
      return Matchstate.LOSS;
    } else if (netRunRequiredForWinning - totalRunScored === 1) {
      return Matchstate.TIED;
    }
    return Matchstate.LOSS;
  }

  afterRun() {
    let balls = this.striker.ballsPlayed + 1;
    let currentover = `${this.bowling.initialOver - (this.bowling.remainingOver + 1)}.${this.bowling
      .ballsPerOver -
      (this.bowling.remainingBalls % this.bowling.ballsPerOver)}`;
    this.striker.ballsPlayed = balls;
    if (this.scorecard.currentScore >= 0) {
      this.handleRun(currentover);
    } else {
      this.handleWicketLoss(currentover);
    }

    if (this.isWon() === Matchstate.WON) {
      this.handleWin();
      //   console.log("WON");
      this.isComplete = true;
    }
  }

  handleWin() {
    let remaingBalls = this.bowling.remainingBalls;
    let oncrease = 2;
    let wicinhand = oncrease - this.playedBatsmen;
    console.log(
      $onwonformatter,
      Team[this.striker.team],
      Simulator.isPlural(wicinhand, STR_WICKET),
      Simulator.isPlural(remaingBalls, STR_BALL)
    );
    let players = Object.keys(this.summary);
    for (let key of players) {
      let batsman: Batsman = this.summary[key];
      if (!batsman.isOut) {
        console.log(
          $playerstatusformatter,
          batsman.name,
          batsman.totalRunScored + "*",
          Simulator.isPlural(batsman.ballsPlayed, STR_BALL)
        );
      } else {
        console.log(
          $playerstatusformatter,
          batsman.name,
          Simulator.isPlural(batsman.totalRunScored, STR_RUN),
          Simulator.isPlural(batsman.ballsPlayed, STR_BALL)
        );
      }
    }
  }

  handleLoss() {
    if (!this.isComplete) {
      console.log(
        $matchlossformatter,
        Team[this.bowling.team],
        Simulator.isPlural(this.scorecard.requiredRun, STR_RUN)
      );
    }
    this.isComplete = true;
  }

  handleTied() {
    if (!this.isComplete) {
      console.log(matchtiemessage);
    }
    this.isComplete = true;
  }

  handleMatchLoss() {
    if (!this.isComplete) {
      console.log(
        $matchlossformatter,
        Team[this.bowling.team],
        Simulator.isPlural(this.scorecard.requiredRun, STR_RUN)
      );
    }
    this.isComplete = true;
  }
  updateSummary(isOut = false) {
    this.striker.isOut = isOut;
    this.summary[this.striker.name] = this.striker;
  }

  handleWicketLoss(currentover: string) {
    this.updateSummary(true);
    console.log($wicketlossformatter, currentover, this.striker.name);
    if (this.playedBatsmen < this.batsman.length - 2) {
      this.striker = this.batsman[this.playedBatsmen + 2];
    } else if (this.isWon() === Matchstate.LOSS) {
      // match LOSS
      this.handleMatchLoss();
    }
    this.playedBatsmen += 1;
  }

  handleRun(currentover: string) {
    debugger;
    this.striker.totalRunScored = this.striker.totalRunScored + this.scorecard.currentScore;
    this.summary[this.striker.name] = this.striker;
    $currentplayerstatusformatter;
    console.log(
      $currentplayerstatusformatter,
      currentover,
      this.striker.name,
      Simulator.isPlural(this.scorecard.currentScore, STR_RUN)
    );
    this.strikerShift();
  }

  beforeBowl() {
    if (this.bowling.remainingBalls % this.bowling.ballsPerOver === 0) {
      let over = this.bowling.remainingBalls / this.bowling.ballsPerOver;
      let req = this.scorecard.requiredRun;
      console.log(
        $overstatusformatter,
        Simulator.isPlural(over, STR_OVER),
        Simulator.isPlural(req, STR_RUN)
      );
    }
  }

  gettotalruns() {
    return this.striker.totalRunScored + this.scorecard.currentScore;
  }

  strikerShift() {
    let { currentScore } = this.scorecard;
    let { remainingBalls } = this.bowling;

    if ([1, 3, 5].indexOf(currentScore) > -1 || remainingBalls % this.bowling.ballsPerOver === 0) {
      let temp: Batsman = this.striker;
      if (this.nonstriker) {
        this.striker = this.nonstriker;
        this.nonstriker = temp;
      }
    }
  }

  static isPlural(num: number, type: string, ext?: string) {
    return num + (ext ? ext : "") + " " + (num > 1 ? type + "s" : type);
  }
}
