var express = require("express")
var app = express()

app.get("/gethomedata",function(req,res){
    var myObj = {name: "John", age: 31, city: "New York"};
    console.log("reached")
    res.send(JSON.stringify(myObj))
})
app.listen(3000,process.env.IP);