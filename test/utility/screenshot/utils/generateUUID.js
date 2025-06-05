const v4 = require('uuid').v4;

module.exports = function generateUUID() {
  return v4();
}
