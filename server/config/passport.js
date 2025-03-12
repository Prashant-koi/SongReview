const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2/promise');

// Create pool connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0] || null);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE google_id = ?',
        [profile.id]
      );

      if (existingUser.length) {
        return done(null, existingUser[0]);
      }

      // Create new user
      const [result] = await pool.query(
        'INSERT INTO users (google_id, name, email, picture) VALUES (?, ?, ?, ?)',
        [
          profile.id,
          profile.displayName,
          profile.emails[0].value,
          profile.photos && profile.photos[0] ? profile.photos[0].value : null
        ]
      );

      const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      return done(null, newUser[0]);
    } catch (err) {
      return done(err, null);
    }
  }
));