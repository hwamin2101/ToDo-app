const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes.js');
require('dotenv').config();

app.use(express.json());
app.use('/api/auth', authRoutes);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
