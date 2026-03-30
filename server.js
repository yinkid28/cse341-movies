const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const passport = require('passport');
require('dotenv').config();

const connectDb = require('./db/connect');
require('./config/passport');

const app = express();

app.set('trust proxy', 1);

app.use(cors({ origin: true, credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/movies', require('./routes/movies'));
app.use('/tvshows', require('./routes/tvshows'));

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 8080;

connectDb()
  .then(() => {
    console.log('Connected to MongoDB via Mongoose');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
