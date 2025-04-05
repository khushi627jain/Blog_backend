const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const { ValidationError } = require('express-validation');
require('dotenv').config();

const app = express();


connectDB();




const allowedDomains = ['http://localhost:3000'];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        console.warn('Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, 
  })
);


app.options('*', cors({
  origin: allowedDomains,
  credentials: true,
}));



app.use(express.json());


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
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
