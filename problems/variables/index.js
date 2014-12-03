var path = require('path');
var fs = require('fs');
var getFile = require('../../get-file');
var run = require('../../run-solution');

exports.problem = getFile(path.join(__dirname, 'problem.md'));

exports.solution = getFile(path.join(__dirname, 'solution.md'));

exports.fail = getFile(path.join(__dirname, 'troubleshooting.md'));

exports.verify = function (args, cb) {

  var file = fs.readFileSync(path.join(process.cwd(), args[0]), 'utf8');

  var match = file.match(/var\s(\w+)\s?=\s?['"]some string["']/);

  if (!match) {
    console.error("\nNearly there, you need to use var when you define a variable.\n");
    return cb(false);
  }

  var logMatch = new RegExp("console\.log\\(" + match[1]);

  if (!logMatch.test(file)) {
    console.error("\nNearly there, you need to console.log the variable you set to 'some string'\n");
    return cb(false);
  }

  run(args[0], function (err, result) {
    if (/some string/.test(result)) cb(true);
    else cb(false);
  });
};

exports.run = function (args) {
  require(path.resolve(process.cwd(), args[0]));
};
