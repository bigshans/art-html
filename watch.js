const { parserTemplate, parser, outPutDist } = require('./parser');
const watch = require('node-watch');
const path = require('path');
const fs = require('fs');
const { range, getFileName } = require('./utils');
const events = require('events');

const srcPath = path.join(__dirname, 'src');
const outPath = path.join(__dirname, 'dists');
const staticPath = path.join(__dirname, 'static');

const updateEventEmitter = new events.EventEmitter();

function pathParser(filePath) {
  const projectPath = filePath
    .replace(new RegExp(`^${__dirname}`), '').replace(/(\\|\/)/, '');
  const fileName = `${getFileName(filePath.split(/(\\|\/)/g).pop())}.html`;
  return {
    projectPath,
    fileName
  };
}

watch(srcPath, { recursive: true }, (evt, name) => {
  const { projectPath, fileName } = pathParser(name);
  const staticPath = path.join(__dirname, 'dists', ...projectPath.split(/(\\|\/)/g).slice(1, -1), fileName);
  switch(evt) {
    case 'remove':
      fs.unlinkSync(staticPath);
      break;
    default:
      outPutDist();
  }
  updateEventEmitter.emit('update');
  console.log('%s %s.', name, evt);
});

watch(staticPath, { recursive: true }, (evt, name) => {
  const { projectPath, fileName } = pathParser(name);
  const staticPath = path.join(__dirname, 'static', ...projectPath.split(/(\\|\/)/g).slice(1, -1), fileName);
  switch(evt) {
    case 'remove':
      fs.unlinkSync(staticPath);
      break;
    default:
      const content = parserTemplate(name);
      fs.writeFileSync(staticPath, content);
  }
  updateEventEmitter.emit('update');
  console.log('%s %s.', name, evt);
});

console.log('Watching started!');

module.exports = {
  updateEventEmitter,
};
