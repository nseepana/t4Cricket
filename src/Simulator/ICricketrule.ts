import Bowling from '../Team/Bowling';
import { Matchstate } from '../Score/Matchstate';
import Scorecard from '../Score/Scorecard';

export default interface ICricketRule {
	nextRun():Scorecard;
	nextBall():Bowling;
	isWon():Matchstate;
	afterRun():any;
	beforeBowl():any;
}
