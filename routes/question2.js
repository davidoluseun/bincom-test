const { data } = require("../bincom_test_db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const pollingUnitResults = data.announced_pu_results;
  const pollingUnits = data.polling_unit;

  const lga = data.lga;
  const lgaId = req.query.lga;

  const lgaPollingUnits = pollingUnits.filter((p) => p.lga_id === lgaId);
  const { length: count } = lgaPollingUnits;
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
  res.render("question2", {
    sum,
    lga,
    query: lgaId,
    notFound: !count ? true : false,
  });
});

module.exports = router;
