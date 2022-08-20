const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5433,
    user : 'postgres',
    password : '452263632',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send('Success');
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImagePut(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });



app.listen(3001, () => {
	console.log('App is runing on port 3001');
});





/* STRUCTURE OF ENDPOINTS

/ --> res = This is working...
/signin --> POST  = success/fail
/register --> POST =  user
/profile/:userId --> GET = user
/image --> PUT --> user

*/