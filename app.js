const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));



var listItems = ["Exercise", "Walk", "Eat"];
var workList = [];



app.get('/', function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  var day = ''


  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    listName: day,
    newListItems: listItems
  });
});



app.get("/work", function(req, res) {

  res.render("list", {
    listName: "Work List",
    newListItems: workList
  });

})


app.post("/", function(req, res) {

  newlistItem = req.body.newItem;

   console.log(req.body.button);

  if (req.body.button === 'Work') {
    workList.push(newlistItem);
    res.redirect("/work");

  } else {
    listItems.push(newlistItem);
    res.redirect("/");

  }

})



app.listen(process.env.PORT || 3000, function() {
  console.log("server started");
});
