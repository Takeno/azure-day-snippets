const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// allow cors
app.use(cors());
// get POST contents and convert them to json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log(req.method, req.url);
  res.send('Hello, world');
});

app.post('/', (req, res) => {
  console.log(req.method, req.url, req.body);
  res.send(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
