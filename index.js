const express = require("express");
const connectToMongo = require('./db');

connectToMongo();

const app = express();
const port = 3001;

app.use(express.json());
app.use('/api/auth', require('./Routes/auth'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})