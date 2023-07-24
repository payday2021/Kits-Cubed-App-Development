require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const kitsRouter = require('./routes/kits');

app.use(cors());
app.use(bodyParser.json());
// feature routes
app.use('/kits', kitsRouter);
//

app.get('/', (req, res) => {
  res.send({ text: 'Hello!' });
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(
    'SERVER RUNNING...' + `http://localhost:${process.env.SERVER_PORT}/`
  );
});
