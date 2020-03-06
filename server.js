const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const db = require('./config/keys').mongoURI;
const items = require('./routes/api/items');
const path = require('path');
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose
.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(()=>
console.log('MongoDB Connected...')
).catch(err => console.log(err));

app.use('/', items);

//Serve static assets if in prodution
if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
})
