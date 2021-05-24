const fs = require('fs');
const fsExt = require('fs-extra');
const path = require('path');
const template = require('art-template');
const { getFileName, getFileExtension } = require('./utils');

const srcPath = path.join(__dirname, 'src');
const outPath = path.join(__dirname, 'dists');
const staticPath = path.join(__dirname, 'static');

function isTemplate(filePath) {
  const ext = getFileExtension(filePath);
  return ext === '.html';
}

function parserTemplate(tp) {
  if (isTemplate(tp)) {
    return template(tp, {});
  }
  return fs.readFileSync(tp);
}

function parser(basePath=srcPath, outputPath=outputPath) {
  const templates = fs.readdirSync(basePath);
  for (const templateName of templates) {
    const templatePath = path.join(srcPath, templateName);
    if (fs.statSync(templatePath).isDirectory()) {
      const outputFilePath = path.join(outputPath, templateName);
      parser(templatePath, outputFilePath);
    } else {
      const content = parserTemplate(templatePath);
      const outputFilePath = path.join(outputPath, `${getFileName(templateName)}.html`);
      fs.writeFileSync(outputFilePath, content);
    }
  }
}

function outPutDist() {
  if (fs.existsSync(outPath)) {
    fsExt.removeSync(outPath);
  }
  fsExt.mkdirSync(outPath);
  fsExt.copySync(staticPath, outPath);
  parser(srcPath, outPath);
}

module.exports = {
  parserTemplate,
  outPutDist,
  parser,
  srcPath,
  outPath,
  staticPath,
};
