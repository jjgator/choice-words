const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './client/public')));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './client/public', 'index.html'))
});

app.listen(port, () => console.log('Server listening on port ' + port + '.'));

module.exports = app;