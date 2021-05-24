const { outPutDist, parser, srcPath, outPath, staticPath } = require('./parser'); 


console.log('Build Started!');
outPutDist();
console.log('Build End!');

if (process.env.PARSER_STATUS !== 'dists') {
  require('./watch');
  require('./server');
}
