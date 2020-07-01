const express = require('express');
const path = require('path');
// const request = require('request');
// const http = require('http');
const https = require('https');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/motivation', (req, res) => {
  // res.send('Hello from App Engine! Im motivated');
  https.get('https://www.affirmations.dev/', (resp) => {
	let data = '';

 	resp.on('data', (chunk) => {
   		data += chunk;
  	});

  	resp.on('end', () => {
   		 res.send(JSON.parse(data));
  	});

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  }); 
});

app.get('/news', (req, res) => {
  // res.send('Hello from App Engine! Im motivated');
  https.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=d46781c22ded49a88ee25c864133ee3a', (resp) => {
	let data = '';

 	resp.on('data', (chunk) => {
   		data += chunk;
  	});

  	resp.on('end', () => {
   		 res.send(JSON.parse(data));
  	});

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  }); 
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});