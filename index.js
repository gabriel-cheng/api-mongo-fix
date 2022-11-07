require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/routes');
const PORT = 5000;
const mongoConnect = require('./database/connect');

app.use(cors());
app.use(express.json());
mongoConnect();

app.use('/', router);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
