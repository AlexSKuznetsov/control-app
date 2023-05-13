const express = require('express');
const cors = require('cors');
const app = express();
const { BASE_URL, PORT } = require('./config');
const seed = require('./seed');

if (!BASE_URL) {
  throw new Error('Camunda api url not found!')
}

// routes
const processRoutes = require('./routes/process');
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json())

app.use('/process', processRoutes);
app.use('/users', userRoutes)

seed();


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})