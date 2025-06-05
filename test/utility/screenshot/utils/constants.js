const path = require('path');
// const fileURLToPath = require('url').fileURLToPath;

// const ___filename = fileURLToPath(import.meta.url);
const ___filename = __filename;
module.exports = { __dirname: path.dirname(___filename), __filename: ___filename }