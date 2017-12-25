const path = require('path');

module.exports = {
 entry: {
   websocket: './src/websocket.js',
   hub: './src/hub.js'
 },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js')
  }
};
