const express = require("express");
const asyncHandler = require("express-async-handler");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", asyncHandler(async (req, res) => {
    res.render("index")
}))

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})