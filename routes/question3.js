const { data } = require("../bincom_test_db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const pollingUnitResults = data.announced_pu_results;
  const pollingUnits = data.polling_unit;
  let isSubmitted = false;
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
  isSubmitted = true;

  res.render("question3", { parties, isSubmitted });
});

module.exports = router;
