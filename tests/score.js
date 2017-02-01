var should = require('should');
var Score = require('../models/score');

describe('Testing Score Model', function(){
  var sampleScore;

  before(function(){

  });

  it('should initialize score to 0', function(){
    sampleScore = new Score();
    should.exist(sampleScore.runs);
    should.equal(sampleScore.runs, 0, 'initial runs should be 0');
    should.exist(sampleScore.wickets);
    should.equal(sampleScore.wickets, 0, 'initial wickets should be 0');
    should.exist(sampleScore.balls);
    should.equal(sampleScore.balls, 0, 'initial balls should be 0');
    should.exist(sampleScore.overs);
    should.equal(sampleScore.overs, 0, 'initial overs should be 0');
    should.equal(sampleScore.showScore(), " Runs:0/0 Overs:0.0");
  });

  it('should add runs to score', function(){
    sampleScore = new Score();
    var prevRuns = sampleScore.runs;
    sampleScore.addScore(1, undefined, 0);
    should.equal(sampleScore.runs, prevRuns + 1, 'score not increased by 1');
  });

  it('should NOT add runs to score if dot', function(){
    sampleScore = new Score();
    var prevRuns = sampleScore.runs;
    sampleScore.addScore(0, undefined, 0);
    should.equal(sampleScore.runs, prevRuns, 'score changed');
  });

  it('should count ball if not extra', function(){
    sampleScore = new Score();
    var prevBalls = sampleScore.balls;
    var prevRuns = sampleScore.runs;
    sampleScore.addScore(1, undefined, 0);
    should.equal(sampleScore.balls, prevBalls + 1, 'ball count not increased by 1');
    should.equal(sampleScore.runs, prevRuns + 1, 'score not increased by 1');
  });

  it('should NOT count ball if extra', function(){
    sampleScore = new Score();
    var prevBalls = sampleScore.balls;
    var prevRuns = sampleScore.runs;
    sampleScore.addScore(1, true, 0);
    should.equal(sampleScore.balls, prevBalls, 'ball count increased by 1');
    should.equal(sampleScore.runs, prevRuns + 1, 'score not increased by 1');
  });

  it('should count wicket if wicket flag is set', function(){
    sampleScore = new Score();
    var prevWicket = sampleScore.wickets;
    sampleScore.addScore(1, undefined, true);
    should.equal(sampleScore.wickets, prevWicket + 1, 'wicket not count increased by 1');
  });

  it('should NOT count wicket if wicket flag is not set', function(){
    sampleScore = new Score();
    var prevWicket = sampleScore.wickets;
    sampleScore.addScore(1, undefined, false);
    should.equal(sampleScore.wickets, prevWicket, 'wicket count changed');
  });

  it('should count over after 6 balls', function(){
    sampleScore = new Score();
    var prevOvers = sampleScore.overs;
    var counter = 1;
    while(counter < 6){
      sampleScore.addScore(1, undefined, false);
      should.equal(sampleScore.balls, counter, 'ball count incorrect');
      counter++;
    }
    sampleScore.addScore(1, undefined, false);
    should.equal(sampleScore.overs, prevOvers+1, 'over count not increased');
  });

});