const { response, urlencoded } = require('express');
const express = require('express')
const app = express();
const https = require('https')
const bodyParser = require('body-parser')

var body = " ";

app.get ('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


app.use(bodyParser.urlencoded({extended:true}))

app.post('/',(req,res)=>{
    console.log(req.body.word)
    var api_key = "j1f49w7h0vfaxdwb3d51lj3cy57emtxtdpi27b8emr0t3yatc";
    var word = req.body.word;
    var url  = "https://api.wordnik.com/v4/word.json/"+ word + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=" + api_key;

    https.get(url,(response)=>{
    response.on("data",(chunk)=>{
        body+=chunk;
    })
    response.on('end',()=>{
        var wordnikData = JSON.parse(body);
        var meaning = wordnikData[0].text;
        res.sendFile()
    }) 
})
})



app.listen('3000',()=>{
    console.log("Server up and running at 3000");
})