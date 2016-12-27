var Score = require('./score');

function Match(){
  this.team1 = {
    name: "Team A",
    score: new Score()
  };
  this.team2 = {
    name: "Team B",
    score: new Score()
  };
  this.totalWickets = 5;
  this.totalOvers = 5;
  this.target;
  this.currentTeam = this.team1;
  this.showScore();
}

Match.prototype.setTarget = function(target){
  this.target = target;
}

Match.prototype.getTarget = function(){
  return this.target;
}

Match.prototype.tick = function(runs, isExtra, wicket){
  this.currentTeam.score.addScore(runs, isExtra, wicket);
  this.showScore();

  if(this.currentTeam.score.overs === this.totalOvers ||
    this.currentTeam.score.wickets === this.totalWickets ||
    this.currentTeam.score.runs >= this.target){
    if(this.currentTeam === this.team1){
      this.currentTeam = this.team2;
      this.target = this.team1.score.runs + 1;
      this.showScore();
    } else{
      console.log("match ended");
      if(this.currentTeam.score.runs >= this.target){
        console.log(this.currentTeam.name +" wins!");
      } else{
        console.log(this.team1.name +" wins!")
      }
      process.exit(0);
    }
  }
}

Match.prototype.showScore = function(){
  console.log(this.currentTeam.name + ":" + this.currentTeam.score.showScore());
}

module.exports = Match;