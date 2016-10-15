var co = require('co');
var prompt = require('co-prompt');

var program = require('commander');

var score =  {
  runs: 0,
  balls: 0
}

program
  .command('runs')
  .action(function(){
    scoreUp(1);
    showScore();
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
  while(true){
    command = yield prompt('> ');
    var progArgs = ["", ""];
    progArgs = progArgs.concat(command.split(" "));
    program.parse(progArgs);
  }
});

function scoreUp(runs){
  score.runs += parseInt(runs);
  score.balls++;
}

function showScore(){
  console.log(score);
}

function startScoring(){
  console.log("---START---");
}

function endScoring(){
  console.log("---END---");
  showScore();
  process.exit(0);
}
