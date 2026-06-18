const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getSingleEvent,
} = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);

module.exports = router;
