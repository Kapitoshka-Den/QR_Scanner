'use strict';
var path = require('path');
var express = require('express');

const PORT = process.env.PORT || 5001

var app = express();

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname,'build')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

app.listen(PORT)