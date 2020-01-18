import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import { setupWebSocket } from './webSocket';

const app = express();
const server = http.Server(app);

setupWebSocket(server);

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

server.listen(3333);
