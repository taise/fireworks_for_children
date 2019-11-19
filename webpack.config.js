const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    hub: './src/hub.js',
    client: './src/client.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js')
  }
}
