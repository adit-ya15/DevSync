const express = require("express");

const app = express();

app.listen("9999",() => {
    console.log("Server listens on the port 9999");
});