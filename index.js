//Simply importing the modules needed for the project (in modular form)
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";

//To assess the static files in the project
app.use(express.static("public"));

//Using Body parser to interact with user input
app.use(bodyParser.urlencoded({extended:true}));


//to get the home page and data from the joke api
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

//post request to get user name
app.post("/post-userName", (req, res) => {
  const Name = req.body["userName"];
  res.render("index.ejs", {user: Name});
  console.log(Name);
})

//post request to send parameters to the url of the API feeding the applicatioin
app.post("/joke", async (req, res) => {
  try {
    //console.log(req.body);
    const jokePrefered = req.body.prefered;
    const blackListJoke = req.body.blacklist;
    const theAmount = req.body.amount
   
    //console.log(theAmount);
    const response = await axios.get(
      API_URL + "/" + jokePrefered + "?blacklistFlags=" + blackListJoke + "&type=" + theAmount
    );
    
    const result = response.data.joke;
    const category = response.data.category;
    //console.log(result);
    res.render("joke.ejs", {data: JSON.stringify(result), theCategory: JSON.stringify(category) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("joke.ejs", {
      error: "Oops, your query failed to return any joke, try another",
    });
  }
});

app.listen(port, () => {
  console.log(`Hey bro, server is running on port: ${port}`)
})

