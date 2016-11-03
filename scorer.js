var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');

var ScoreBook = require('./models/score');
var score;

program
  .command('runs')
  .action(function(){
    scoreUp(1);
    process.stdin.pause();
  });

program
  .command('exit')
  .action(function(){
    endScoring();
  })

startScoring();

co(function *(){
  var command;
  score = new ScoreBook();
  showScore();
  while(true){
    command = yield prompt('> ');
    var progArgs = ["", ""];
    progArgs = progArgs.concat(command.split(" "));
    program.parse(progArgs);
  }
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});;

function scoreUp(runs){
  score.addScore(runs, true, false);
  showScore();
}

function showScore(){
  console.log(score.showScore());
}

function startScoring(){
  console.log("---START---");
}

function endScoring(){
  console.log("---END---");
  showScore();
  process.exit(0);
}
