const express = require('express');
const notes = require('./data/notes.js');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// //api endpoint
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
