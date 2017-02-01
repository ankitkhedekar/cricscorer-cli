function Score(){
  this.runs = 0;
  this.wickets = 0;
  this.balls = 0;
  this.overs = 0;
}


Score.prototype.showScore = function(){
  return " Runs:" + this.runs + "/" + this.wickets + " Overs:" + this.overs + "." + this.balls;
}

Score.prototype.addScore = function(runs, isExtra, wicket){
  this.runs += runs;
  if(wicket){
    this.wickets++;
  }
  if(!isExtra){
    if(this.balls === 5){
      this.overs++;
      this.balls = 0;
    } else{
      this.balls++;
    }
  }
}

module.exports = Score;
