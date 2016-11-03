function Score(){
  this.runs = 0;
  this.wickets = 0;
  this.balls = 0;
}

function convertBallsToOvers(balls){
  return Math.floor(balls/6) + "." + balls%6;
}

Score.prototype.showScore = function(){
  return "Runs:" + this.runs + "/" + this.wickets + " Overs:" + convertBallsToOvers(this.balls);
}

Score.prototype.addScore = function(runs, ballCount, wicket){
  this.runs += runs;
  if(wicket){
    this.wickets++;
  }
  if(ballCount){
    this.balls++;
  }
}

module.exports = Score;
