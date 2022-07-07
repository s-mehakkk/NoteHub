const express = require("express");
const connectToMongo = require('./db');
var cors = require('cors');

connectToMongo();

const app = express();
app.use(cors())
const port = 3001;

app.use(express.json());
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iBackend listening on port ${port}`)
})