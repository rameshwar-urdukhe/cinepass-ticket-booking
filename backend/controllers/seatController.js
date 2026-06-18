const Seat = require("../models/Seat");

const getSeatsByEvent = async (req, res) => {
  try {
    const seats = await Seat.find({
      eventId: req.params.eventId,
    });

    res.status(200).json({
      success: true,
      count: seats.length,
      seats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSeatsByEvent,
};
