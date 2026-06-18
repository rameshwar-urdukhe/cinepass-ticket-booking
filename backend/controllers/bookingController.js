const Booking = require("../models/Booking");
const Reservation = require("../models/Reservation");
const Seat = require("../models/Seat");

const confirmBooking = async (req, res) => {
  try {
    const { reservationId } = req.body;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (reservation.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Reservation expired",
      });
    }

    await Seat.updateMany(
      {
        eventId: reservation.eventId,
        seatNumber: {
          $in: reservation.seatNumbers,
        },
      },
      {
        status: "booked",
      },
    );

    const booking = await Booking.create({
      userId: reservation.userId,
      eventId: reservation.eventId,
      seatNumbers: reservation.seatNumbers,
    });

    await Reservation.findByIdAndDelete(reservation._id);

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  confirmBooking,
};
