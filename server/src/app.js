const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Mount API to /api/bugs instead of /api/posts
app.use('/api/bugs', bugRoutes);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
