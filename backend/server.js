const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const notes = require('./data/notes');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const noteRoutes = require('./routes/noteRoutes');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
  res.send('App is running....');
});
// app.get('/getData', (req, res) => {
//   res.send('Hello World!!!');
// });
// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error:${error.message}`);
  }
};
start();
