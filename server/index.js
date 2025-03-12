require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mysql = require('mysql2/promise');

// Import passport config
require('./config/passport');

const app = express();

// Connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import and use routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// auth status
app.get('/api/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      user: req.user
    });
  }
  res.json({isAuthenticated: false});
});

//Logout route
app.get('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({error: 'Failed to logout'});
    }
    res.json({ success: true});
  });
});

//protected route 
app.get('/api/protected', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  res.json({message: 'You accessed a protected route', user: req.user});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});