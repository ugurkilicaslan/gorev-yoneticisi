const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB bağlantısı başarılı');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB bağlantı hatası:', err);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend çalışıyor!' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});