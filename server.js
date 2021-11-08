require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 2999

app.use(express.static("static"))
app.set("view engine", "ejs")
app.set("views", "views")

app.get("/", (req, res) => {
  res.render("main")
})

app.listen(port)
console.log("Listening at localhost:2999")
