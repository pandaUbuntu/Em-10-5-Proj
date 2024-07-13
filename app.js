import express from 'express';
import mongoose from 'mongoose';
import Router from './src/Router/Router.js';
import 'dotenv/config';

const app = express();

mongoose.connect(process.env.DB_URL)
.then(() => console.log('Connected!'))
.catch(()=> console.log('Failed'));

app.use(express.json())
app.use('/api', Router);

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log(req.query)
})

app.get('/test', (req, res) => {
    
    res.send('Test Page!')
  })

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})