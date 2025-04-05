const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const { ValidationError } = require('express-validation');
require('dotenv').config();

const app = express();

connectDB();
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  if (req.is('application/json')) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));

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
