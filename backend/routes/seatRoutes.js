const express = require("express");

const router = express.Router();

const { getSeatsByEvent } = require("../controllers/seatController");

router.get("/:eventId", getSeatsByEvent);

module.exports = router;
