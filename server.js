require('dotenv').config()
const express = require("express");
const asyncHandler = require("express-async-handler");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// API 

const apod = require("apod");

apod.apiKey = process.env.APIKEY;

// console.log(apod.apiKey)

// TODAY DATA 
const todayObj = {
    title: "",
    imageDescription: "",
    date: "",
    hdurl: "",
    photographer: ""
}

// YESTERDAY DATA 

const yesterdayObj = {
    yesterdayTitle: "",
    yesterdayPhotographer: "",
    yesterdayImageDescription: "",
    yesterdayDate: "",
    yesterdayHdurl: ""    
}

function getTodaysPicture(err, data) {

    if (err) {
        console.log(err)
    }

    console.log(data)

    // TODO: CHANGE THSI TO AN OBJECT FOR TODAY
    todayObj.title = data.title;
    todayObj.photographer = data.copyright;
    todayObj.imageDescription = data.explanation;
    todayObj.date = data.date.split("-").reverse().join('/');
    todayObj.hdurl = data.hdurl;

}

apod(getTodaysPicture)

const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)

today.toDateString()
yesterday.toDateString()

function getYesterdaysPicture(err, data) {

    if (err) {
        console.log(err)
    }

    yesterdayObj.title = data.title;
    yesterdayObj.photographer = data.copyright;
    yesterdayObj.imageDescription = data.explanation;
    yesterdayObj.date = data.date.split("-").reverse().join('/');
    yesterdayObj.hdurl = data.hdurl;

}


let yesterdayData = apod(yesterday, getYesterdaysPicture);

console.log(yesterdayData)


app.get("/", asyncHandler(async (req, res) => {
    res.render("index", {
        todayObj, yesterdayObj
    })
}))

app.get("/yesterday", asyncHandler(async (req, res) => {
    res.render("yesterday", {
        todayObj, yesterdayObj
    })
}))

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})