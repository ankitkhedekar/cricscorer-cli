var should = require('should');
var Match = require('../models/match');

describe('Testing match model', function(){
  it('should initiate a new match', function(){
    var sampleMatch = new Match();
    should.exist(sampleMatch.team1);
    should.exist(sampleMatch.team1.score);
    should.exist(sampleMatch.team2);
    should.exist(sampleMatch.team2.score);
    should.equal(sampleMatch.totalWickets, 5);
    should.equal(sampleMatch.totalOvers, 5);
    should.equal(sampleMatch.currentTeam, sampleMatch.team1);
  })

})