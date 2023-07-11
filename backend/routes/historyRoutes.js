const express = require("express");
const router = express.Router();

const {
  getHistories,
  getHistoriesPatient,
  getHistory,
  addHistory,
  updateHistory,
  deleteHistory,
} = require("../controllers/historyController");

router.route("/").get(getHistories).post(addHistory);
router.route("/:id").get(getHistory).put(updateHistory).delete(deleteHistory);
router.route("/patient/:id").get(getHistoriesPatient);

module.exports = router;
