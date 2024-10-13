//src/routes/booking.routes.js
import express from "express";
import { router } from "express";
import booking from "src/data/bookings.json";
import checkRequiredFields from "src/middleware/checkRequiredFields.js";
import createBooking from "src/services/bookings/createBooking.js";
import deleteBookingById from "src/services/bookings/deleteBookingById.js";
import getBookings from "src/services/bookings/getBookings.js";
import getBookingById from "src/services/bookings/getBookingById.js";
import updateBookingById from "src/services/bookings/updateBookingById.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { userId, propertyId } = req.query;
    const bookings = await getBookings(userId, propertyId);

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authMiddleware,
  checkRequiredFields(jsonSchema.definitions.Booking.required),
  async (req, res, next) => {
    try {
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      } = req.body;
      const newBooking = await createBooking(
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );

      res.status(201).json(newBooking);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id?', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      await deleteBookingById(id);

      res.status(200).json({
        message: `Booking with id ${id} was successfully deleted!`
      });
    } else {
      res.status(400).json({
        message: 'No id has been given!'
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id?', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      } = req.body;
      const updatedBooking = await updateBookingById(id, {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      });

      res.status(200).json(updatedBooking);
    } else {
      res.status(400).json({
        message: 'No id has been given!'
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;