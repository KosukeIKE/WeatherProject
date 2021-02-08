//express
const express = require('express');
const https = require('https');
const parserBody = require('body-parser');
const request = require('request');

const app = express();

app.listen('3000', function () {
    console.log();
    console.log("The server is running");
});

app.use(parserBody.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


//デフォルトのhttpsのAPIの取得方法

// app.post('/', function (req, res) {
//     console.log("I got it");

//     const query = req.body.place;
//     const apiId = "392d2cc2d69ba0b47d0617faf5d0fc7f";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId;
//     //const WeatherUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=Japan&cnt=1&appid="+ apiId;

//     https.get(url, function (response) {
//         // console.log(response.statusCode);
//         response.on('data', function (data) {
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             const Icon = weatherData.weather[0].icon;
//             const IconUrl = "http://openweathermap.org/img/wn/" + Icon + "@2x.png";


//             res.type("html");
//             res.write("The temperature in Japan is " + temp + "selcius");
//             res.write("<img src=" + IconUrl + ">");
//             res.send();
//         });
//     });
// });



//request のモジュールを使用したAPIの取得方法

app.post('/', function (req, res) {
    const query = req.body.place;
    const apiId = "392d2cc2d69ba0b47d0617faf5d0fc7f";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId;


    request(url, function (error, response, body) {
        const weatherData = JSON.parse(body);
        const temp = weatherData.main.temp;
        const Icon = weatherData.weather[0].icon;
        const IconUrl = "http://openweathermap.org/img/wn/" + Icon + "@2x.png";


        res.type("html");
        res.write("The temperature in " + query + " is " + temp + "Celcius");
        res.write("<img src=" + IconUrl + ">");
        res.send();


        console.log(response);
    })
});