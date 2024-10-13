//src/services/bookings/createBooking.js
import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/NotFoundError.js';

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  // No match for the given userId, throw a NotFoundError.
  const userFound = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!userFound) {
    throw new NotFoundError('user', userId);
  }

  // No match for the given propertyId, throw a NotFoundError.
  const propertyFound = await prisma.property.findUnique({
    where: {
      id: propertyId
    }
  });

  if (!propertyFound) {
    throw new NotFoundError('property', propertyId);
  }

  // Create the new booking and return it.
  const newBooking = await prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    }
  });

  return newBooking;
};

export default createBooking;