const express = require("express");

const app = express();

app.use("/test",(req,res) => {
    res.send("Test is done");
});

app.use("/hello",(req,res) => {
    res.send("Hello to everyone");
});

app.listen("9999",() => {
    console.log("Server listens on the port 9999");
});

