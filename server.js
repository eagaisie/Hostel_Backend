// server.js
const path        = require('path');
const express     = require('express');
const cookieParser= require('cookie-parser');
const cors        = require('cors');
require('dotenv').config();

const authRoutes        = require('./routes/auth');
const hostelsRoutes     = require('./routes/hostels');
const applicationsRoutes= require('./routes/applications');
const roomsRoutes        = require('./routes/rooms');

const app = express();

// MIDDLEWARE
app.use(cors({
  origin: true,  // Allow all origins during development
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    auth: req.headers.authorization
  });
  next();
});

app.use(express.json());
app.use(cookieParser());

// STATIC FRONTEND
app.use(express.static(path.join(__dirname, 'frontend')));

// API ROUTES
app.use('/api/auth',        authRoutes);
app.use('/api/rooms',       roomsRoutes);
app.use('/api/hostels',     hostelsRoutes);
app.use('/api/applications',applicationsRoutes);

// catch-all: serve index.html for non-API routes
// app.get(/^(?!\/api\/).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/index.html'));
// });

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
