const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(require('./routes/index.route'));

app.use(express.static(path.join(__dirname, '../public')))

app.use((req, res) => {
    res.sendFile(path.join(__dirname,'../public/404.html'))
})

app.listen(PORT,()=> {
    console.log(`Server started at http://localhost:${PORT}`)
});


