require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const {
  errors,
} = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const ErrorHandler = require('./midlevare/ErrorHandler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(cors());

const { requestLogger, errorLogger } = require('./midlevare/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(ErrorHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Приложение слушает на 3000 порту');
});
