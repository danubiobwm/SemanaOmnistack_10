import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

const app = express();

mongoose.connect(
  'mongodb+srv://Danubio:Danu_1985@cluster0-0vwpu.mongodb.net/week10?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
