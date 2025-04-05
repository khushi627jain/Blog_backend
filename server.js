const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const { ValidationError } = require('express-validation');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());

app.use((req, res, next) => {
  if (req.is('application/json')) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', require('./routes/authRoutes'));
app.use('/blogs', require('./routes/blogRoutes'));

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: 'Validation failed',
      details: err.details,
    });
  }

  return res.status(500).json({
    msg: 'Server error',
    err: err,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
