import Cricketcontext from "../Simulator/Cricketcontext";
export enum Team {
  Bengaluru,
  Chennai
}
export default class Bowling {
  ballsPerOver = 6;
  remainingBalls: number;
  initialOver: number;
  constructor(public remainingOver: number, public team: Team) {
    this.$setdefaults(remainingOver);
  }
  $setdefaults(val) {
    this.initialOver = val;
    this.remainingBalls = this.ballsPerOver * val;
  }
  nextBall(cricketcontext: Cricketcontext): Bowling {
    return cricketcontext.nextBall();
  }

  beforeBowling() {
    if (this.remainingBalls % this.ballsPerOver == 0) {
      let over = this.remainingBalls / this.ballsPerOver;
      console.log(`${over} overs`);
    }
  }
}
