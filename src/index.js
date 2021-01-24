/* 
index.js 
This is the main entry point of my notedly application 
*/

/*
Express.js Framework 
To build a server-side web app that will serve as the basis for the backend of my API
*/

const express = require('express'); //request express dependency
const app = express(); //create app object
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {res.send('JavaScript Everywhere: A notedly app by Steve Archuleta')}); //call the app object's get method such that when a user accessess the root URL (/), my server sends a reponse of 'JavaScript Everywhere'
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`); //template leteral syntax
}); //make my app locally available on port 400 http://localhost:4000

/*
NOTE:   do not forget to run this app before accessing localhost:4000
NOTE:   in terminal:  from the api-master directory, node src/index.js; ctrl c to cancel process
NOTE:   or... even better... npm run dev (will enact the nodemon script in package.json)...
*/



