const express = require("express");
const app = express();
const { data } = require("./bincom_test_db");

app.set("view engine", "ejs");

const pollingUnitResults = data.announced_pu_results;
const pollingUnits = data.polling_unit;

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
  const parties = data.party;

  const query = req.query;
  const fullname = req.query.fullname;
  const date_entered = new Date();
  delete query.fullname;

  const lastUniqueId = parseInt(pollingUnits[pollingUnits.length - 1].uniqueid);
  const lastResultId = parseInt(
    pollingUnitResults[pollingUnitResults.length - 1].result_id
  );
  const newUniqueId = (lastUniqueId + 1).toString();
  let newResultId = (lastResultId + 1).toString();

  for (field in query) {
    const newPollingUnitResult = {
      result_id: newResultId++,
      polling_unit_uniqueid: newUniqueId,
      party_abbreviation: field,
      party_score: query[field],
      entered_by_user: fullname,
      date_entered,
      user_ip_address: "192.168.1.101",
    };

    pollingUnitResults.push(newPollingUnitResult);
  }

  res.render("question3", { parties });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
