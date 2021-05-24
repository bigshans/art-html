const path = require('path');
const fs = require('fs');

function getFileName(name) {
  return name.substring(0, name.lastIndexOf('.'));
}

function getFileExtension(name) {
  return path.extname(name);
}

function range(n) {
  return [...Array(n).keys()];
}

module.exports = {
  getFileName,
  getFileExtension,
  range,
};
