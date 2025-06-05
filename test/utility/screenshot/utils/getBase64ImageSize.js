const sizeOf = require('image-size');

module.exports = function getBase64ImageSize(base64Screenshot) {
  const buffer = new Buffer(base64Screenshot, 'base64');
  const size = sizeOf(buffer);
  return size;
}
