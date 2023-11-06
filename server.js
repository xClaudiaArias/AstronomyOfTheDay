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
let title = "";
let imageDescription = "";
let date = "";
let hdurl = ""
let photographer = "";
// YESTERDAY DATA 
let yesterdayTitle = "";
let yesterdayPhotographer = "";
let yesterdayImageDescription = "";
let yesterdayDate = "";
let yesterdayHdurl = "";



function getTodaysPicture(err, data) {

    if (err) {
        console.log(err)
    }

    console.log(data)

    // TODO: CHANGE THSI TO AN OBJECT FOR TODAY
    title = data.title;
    photographer = data.copyright;
    imageDescription = data.explanation;
    date = data.date;
    hdurl = data.hdurl;

}

apod(getTodaysPicture)

const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)

today.toDateString()
yesterday.toDateString()

function getYesterdaysPicture(err, data) {

    console.log(data, " yesterdays data")

    // TODO: CREATE AN OBJECT FOR yesterday
    yesterdayTitle = data.title;
    yesterdayPhotographer = data.copyright;
    yesterdayImageDescription = data.explanation;
    yesterdayDate = data.date;
    yesterdayHdurl = data.hdurl;
}


let yesterdayData = apod(yesterday, getYesterdaysPicture);

console.log(yesterdayData)


app.get("/", asyncHandler(async (req, res) => {

    let newDate = date.split("-").reverse().join('/');


    res.render("index", {
        title: title,
        photographer: photographer,
        imageDescription: imageDescription,
        newDate: newDate,
        hdurl: hdurl
    })
}))

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})