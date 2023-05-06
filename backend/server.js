const express = require('express');
const cors = require('cors');
const app = express();
const { BASE_URL, PORT } = require('./config');

if (!BASE_URL) {
  throw new Error('Camunda api url not found!')
}

// routes
const processRoutes = require('./routes/process');

app.use(cors());
app.use(express.json())

app.use('/process', processRoutes);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})