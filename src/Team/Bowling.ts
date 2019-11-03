import Cricketcontext from '../Simulator/Cricketcontext';
export enum Team {
  Bengaluru,
  Chennai
}
export default class Bowling {
  static ballsPerOver = 6;
  remainingBalls: number;
  initialOver: number;
  constructor(public remainingOver: number, public bowlingTeam: Team) {
    this.$setdefaults(remainingOver);
  }
  $setdefaults(val) {
    this.initialOver = val;
    this.remainingBalls = Bowling.ballsPerOver * val;
  }
  nextBall(cricketcontext:Cricketcontext):Bowling {
	  return cricketcontext.nextBall();
  }

  beforeBowling() {
    if (this.remainingBalls % Bowling.ballsPerOver == 0) {
      let over = this.remainingBalls / Bowling.ballsPerOver;
      console.log(`${over} overs`);
    }
  }
}
