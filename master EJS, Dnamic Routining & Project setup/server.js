const express = require("express");
const path = require("path");

const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("iski jagah pura path aayega"))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Server is running successfully");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});