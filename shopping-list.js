const express = require('express'); 
const items = require('./fakeDb');

const app = express(); 

app.get('/items', (req,res) => {

})

app.post('/items', (req,res) => {

})

app.get('/items/:name', (req,res) => {

})

app.patch('/items/:name', (req,res) => {

})

app.delete('/items/:name', (req,res) => {

})


app.listen(3000, () => {
  console.log('Server running at localhost:3000');
})