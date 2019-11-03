import { Team } from "./Bowling";
import { Player } from './Player';




export default class Batsman extends Player {
  ballsPlayed: number = 0;
  totalRunScored: number;
  requiredRun: number;
  netRunRequiredForWinning: number;
  constructor(player: string, team: Team, ballProbability: number[]) {
    super(player, team, ballProbability);
  }

  

  
}
