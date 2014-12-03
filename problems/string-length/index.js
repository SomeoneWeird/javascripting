var path = require('path');
var fs = require('fs');
var getFile = require('../../get-file');
var run = require('../../run-solution');

exports.problem = getFile(path.join(__dirname, 'problem.md'));

exports.solution = getFile(path.join(__dirname, 'solution.md'));

exports.fail = getFile(path.join(__dirname, 'troubleshooting.md'));

exports.verify = function (args, cb) {

  var file = fs.readFileSync(path.join(process.cwd(), args[0]), 'utf8');

  if (file.match(/['"]\.length/)) {
    console.error("\nNearly there, but you should define a variable and use the length property on that, instead.");
    return cb(false);
  }

  run(args[0], function (err, result) {
    if (result == 14) cb(true);
    else cb(false);
  });
};

exports.run = function (args) {
  require(path.resolve(process.cwd(), args[0]));
};
