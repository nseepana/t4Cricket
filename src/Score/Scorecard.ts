export default class Scorecard {
  public currentScore: number;
  constructor(
    public totalRunScored: number,
    public requiredRun: number,
    public netRunRequiredForWinning: number
  ) {
    this.setdefaults(totalRunScored);
  }

  setdefaults(totalRunScored) {
    this.currentScore = totalRunScored;
  }
}
