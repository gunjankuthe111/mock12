const express = require("express");
const middleware = require("../contrllers/middleware");
const app = express.Router();

app.use(middleware);

app.get("/", async (req, res) => {
  const {amount, interest, year} = req.body;
  if (!amount || !interest || !year) {
    return res.status(404).send({message: "Missing Inputs"});
  }
  try {
    let newAmount = Number(amount);
    let newYear = Number(year);
    let percent = Number(interest) / 100;
    const maturityValue = newAmount*((((1 + percent) ** newYear) -1)/ percent);
    const investmentAmount = newAmount * newYear;
    const interestGained = maturityValue - investmentAmount;
    return res.send({maturityValue,investmentAmount,interestGained})
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});

module.exports = app;
