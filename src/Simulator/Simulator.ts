import Cricketcontext from './Cricketcontext';
import Batsman from '../Team/Batsman';
import Bowling from '../Team/Bowling';

export class Simulator extends Cricketcontext {
  striker: Batsman;
  nonstriker: Batsman;
  constructor(
    public bowling: Bowling,
    public batsman: Array<Batsman>,
    public netRunsRequired: number
  ) {
    super(bowling, batsman[0], batsman[1]);
  }

  play() {
    let bowler: Bowling = this.bowling;
	console.log(bowler, this.striker, this.nonstriker);

  }
}