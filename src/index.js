const express = require('express');
const getAllUser = require('./routes/userRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/user', getAllUser);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))
