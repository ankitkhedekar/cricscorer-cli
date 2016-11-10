var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');

var ScoreBook = require('./models/score');
var score;

program
  .option('-w, --wicket', 'If wicket has fallen')
  .option('-e, --extra', 'If ball is counted')

program
  .command('runs <runs>')
  .action(function(runs){
    scoreUp(parseInt(runs), program.extra, program.wicket);
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

function scoreUp(runs, isExtra, isWicket){
  score.addScore(runs, isExtra, isWicket);
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
