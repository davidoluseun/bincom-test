const express = require("express");
const app = express();
const { data } = require("./bincom_test_db");

app.set("view engine", "ejs");

const pollingUnitResults = data.announced_pu_results;

app.get("/", (req, res) => {
  const pollingUnitUniqueID = "8";

  const results = pollingUnitResults.filter(
    (p) => p.polling_unit_uniqueid === pollingUnitUniqueID
  );

  res.render("index", { results, pollingUnitUniqueID });
});

app.get("/question2", (req, res) => {
  const lga = data.lga;
  const lgaId = req.query.lga ? req.query.lga : 0;
  const pollingUnits = data.polling_unit;

  const lgaPollingUnits = pollingUnits.filter((p) => p.lga_id === lgaId);
  let lgaPollingUnitResults = [];

  lgaPollingUnits.forEach((lgaPollingUnit) => {
    const lgaResults = pollingUnitResults.filter(
      (p) => p.polling_unit_uniqueid === lgaPollingUnit.uniqueid
    );

    lgaPollingUnitResults.push(...lgaResults);
  });

  const reducer = (previousValue, currentValue) =>
    previousValue + parseInt(currentValue.party_score);

  const sum = lgaPollingUnitResults.reduce(reducer, 0);
  res.render("question2", { sum, lga, query: lgaId });
});

app.get("/question3", (req, res) => {
  res.render("question3");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
