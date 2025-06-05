const fsExtra = require('fs-extra');

module.exports = async function saveBase64Image(filePath, base64Screenshot) {
  return fsExtra.outputFile(filePath, base64Screenshot, 'base64');
}
