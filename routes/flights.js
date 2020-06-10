var express = require("express");
var router = express.Router();
const flightsCtrl = require("../controller/flights");

// GET /flights/new
router.get("/new", flightsCtrl.new);

// POST /flights
router.post("/", flightsCtrl.create);

// GET /index
router.get("/index", flightsCtrl.index);
router.get("/:id", flightsCtrl.showDetail);
router.post("/:id", flightsCtrl.addDestination);

module.exports = router;
