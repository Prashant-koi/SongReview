require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mysql = require('mysql2/promise');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
})

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
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

//Seralize user
passport.serializeUser((user, done) =>{
  done(null, user.id);
});

//deserialize user
passport.deserializeUser(async (id,done) => {
  try{
    const [rows] = await pool.query('SELECT * FROM users WHERE id =?', [id]);
    done(null, rows[0] || null);
  } catch (err) {
    done(err, null)
  }
})

// Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['profile','email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    //check user
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE google_id = ?',
      [profile.id]
    );

    if (existingUser.length) {
      return done(null, existingUser[0]);
    }

    //Create new user
    const [result] = await pool.query(
      'INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)',
      [
        profile.id,
        profile.displayName,
        profile.emails[0].value,
      ]
    );

    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return done(null, newUser[0]);
  }catch (error) {
    return done(error, null);
  }
}))

// Routes
app.get('/auth/google',
  passport.authenticate('google', {scope: ['email']})
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: true
  }),
  (Req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/`);
  }
);

// auth status
app.get('/api/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      user: req.user
    })
  }
  res.json({isAuthenticated: false});
})

//Logout rout
app.get('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({error: 'Failed to logout'});
    }
    res.json({ success: true});
  })
});

//protected route 
app.get('/api/protected', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({error : 'Unauthorized'});
  }
  res.json({message: 'You accessed a protected route', user: req.user});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 