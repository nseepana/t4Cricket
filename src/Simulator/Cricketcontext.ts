import Bowling from "../Team/Bowling";
import Batsman from "../Team/Batsman";
export default class Cricketcontext {
  constructor(
    public bowling: Bowling,
    public striker: Batsman,
    public nonstriker: Batsman
  ) {
    this.setdefaults();
  }

  setdefaults() {}
}
