export enum Team {
  Bengaluru,
  Chennai
}
export default class Bowling {
  static ballsPerOver = 6;
  remainingBalls: number;
  initialOver: number;
  constructor(private remainingOver: number, private bowlingTeam: Team) {
    this.$setdefaults(remainingOver);
  }
  $setdefaults(val) {
    this.initialOver = val;
    this.remainingBalls = Bowling.ballsPerOver * val;
  }
  nextBall() {
    this.beforeBowling();
    let restballs = this.remainingBalls;
    restballs -= 1;
    this.remainingBalls = restballs;
    this.remainingOver = parseInt("" + restballs / Bowling.ballsPerOver, 10);
    return this;
  }

  beforeBowling() {
    if (this.remainingBalls % Bowling.ballsPerOver == 0) {
      let over = this.remainingBalls / Bowling.ballsPerOver;
      console.log(`${over} overs`);
    }
  }
}
