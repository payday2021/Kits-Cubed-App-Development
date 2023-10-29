require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const kitsRouter = require('./routes/kits');
const usersRouter = require('./routes/users');
const ordersRoutes = require('./routes/orders')
const paymentsRoutes = require('./routes/payments')
const eventsRoutes = require('./routes/events')

app.use(cors());
app.use(bodyParser.json());
// feature routes
app.use('/kits', kitsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRoutes)
app.use('/payments', paymentsRoutes);
app.use('/events', eventsRoutes);
//

app.get('/', (req, res) => {
  res.send({ text: 'Hello!' });
});

app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log(
    'SERVER RUNNING...' + `http://localhost:${process.env.SERVER_PORT || 8080}/`
  );
});
