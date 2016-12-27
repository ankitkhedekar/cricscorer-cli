var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');

var Match = require('./models/match');
var book;

program
  .option('-w, --wicket', 'If wicket has fallen')
  .option('-e, --extra', 'If ball is counted')

program
  .command('runs <runs>')
  .action(function(runs){
    scoreUp(parseInt(runs), program.extra, program.wicket);
    delete program.extra;
    delete program.wicket;
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
  book = new Match();
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
  book.tick(runs, isExtra, isWicket);
}

function startScoring(){
  console.log("---START---");
}

function endScoring(){
  console.log("---END---");
  process.exit(0);
}
