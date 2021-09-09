const { data } = require("../bincom_test_db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const pollingUnitResults = data.announced_pu_results;

  const pollingUnitUniqueID = "9";

  const results = pollingUnitResults.filter(
    (p) => p.polling_unit_uniqueid === pollingUnitUniqueID
  );

  res.render("index", { results, pollingUnitUniqueID });
});

module.exports = router;

