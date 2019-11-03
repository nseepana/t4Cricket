import Cricketcontext from './Cricketcontext';
import Batsman from '../Team/Batsman';
import Bowling from '../Team/Bowling';
import { Matchstate } from '../Score/Matchstate';
import Scorecard from '../Score/Scorecard';

export class Simulator extends Cricketcontext {
  striker: Batsman;
  nonstriker: Batsman;
  isComplete:boolean =false;
  constructor(
    public bowling: Bowling,
    public batsman: Array<Batsman>,
    public netRunsRequired: number
  ) {
    super(bowling, batsman[0], batsman[1], netRunsRequired);
  }

  play() {
    let {bowling, player} = this;

	do{
		bowling = bowling.nextBall(this);
		this.scorecard = player.nextRun(this);
	}while(bowling.remainingBalls != 0 && !this.isComplete)
	
	if(this.isWon() == Matchstate.LOOSE){
		console.log('LOOSE')
		// handle match loose
	}else if(this.isWon() == Matchstate.TIED){
		// hanlde match tie
		console.log('TIED')
	}
	// console.log(this.scorecard, this.striker, this.nonstriker);

  }

  isWon():Matchstate{
	  let {requiredRun, totalRunScored} = this.scorecard;
	  if(requiredRun < 0 || totalRunScored >= requiredRun){
		  return Matchstate.WON;
	  }else if(requiredRun == 0){
		  return Matchstate.LOOSE;
	  }else if(requiredRun - totalRunScored == 1){
		  return Matchstate.TIED;
	  }
	  return Matchstate.LOOSE;
  }

  afterRun(){
	  let balls = this.striker.ballsPlayed + 1;
	  let currentover = `${this.bowling.initialOver - (this.bowling.remainingOver + 1)}.${Bowling.ballsPerOver - (this.bowling.remainingBalls % Bowling.ballsPerOver)}`;
	  this.striker.ballsPlayed = balls;
	  if(this.scorecard.currentScore >= 0){
		 // handle run 
	  }else{
		// handle batsman 
	  }

	  if(this.isWon() === Matchstate.WON){
		  // handle win
		  console.log('WON');
	  }
  }



  beforeBowl(){
	  if(this.bowling.remainingBalls % Bowling.ballsPerOver === 0){
		  let over = this.bowling.remainingBalls / Bowling.ballsPerOver;
		  let req = this.scorecard.requiredRun;
		console.log('beforeBowl:', over, req)
	  }
  }


}