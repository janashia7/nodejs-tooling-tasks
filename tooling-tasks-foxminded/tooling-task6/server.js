const axios = require("axios");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const url = "https://yesno.wtf/api";

app.get("/healthz", async (req, res) => {
  try {
    const connect = await axios.head(url);
    console.log(connect);

    res.sendStatus(connect.status);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/random", async (req, res) => {
  try {
    const connect = await axios(url);
    console.log(connect);
    const { answer } = connect.data;

    if (answer === "yes") {
      res.send({ result: true });
    } else if (answer === "no") {
      res.send({ result: false });
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.sendStatus(500);
  } 
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});



