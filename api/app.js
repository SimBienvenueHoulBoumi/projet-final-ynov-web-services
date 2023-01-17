const express = require('express'); // framework
const helmet = require('helmet'); // Configure HTTP Headers
const bodyParser = require('body-parser'); // Parse the body in an object req.body
const mongoose = require('mongoose'); // Database
const compression = require('compression'); // Compression for quick server response

require('dotenv').config()

const app = express();
app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

// ID et pw à cacher dans des variables d'environnement
const dbID = process.env.DB_ID;
const dbPW = process.env.DB_PW;
const dbSV = process.env.DB_SV;
const dbCL = process.env.DB_CL;
const dbHST = process.env.DB_HOST;

const DB = dbHST+'://'+dbID+':'+dbPW+'@'+dbSV+'/'+dbCL+'?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose.connect(DB, 
  { useNewUrlParser: true,
    useUnifiedTopology: true 
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
    });

app.use(bodyParser.json());


const userRoutes = require('./src/routes/user');

app.use('/api/v1/auth/user', userRoutes);

module.exports = app;