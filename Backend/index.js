const express = require("express");
const connectToMongo = require('./db');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 3001;

app.use(cors()) // to allow api calls from frontend(same browser somethin somethin)
app.use(express.json());
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

app.get('/', (req, res) => {
  res.send('iNotebook backend')
})

app.listen(port, () => {
  console.log(`iBackend listening on port ${port}`)
})