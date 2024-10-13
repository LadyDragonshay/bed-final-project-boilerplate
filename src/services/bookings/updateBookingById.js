//src/services/bookings/updateBookingById.js
import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/NotFoundError.js';

const updateBookingById = async (
  id,
  {
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus
  }
) => {
  const prisma = new PrismaClient();

  // No match for the given id, throw a NotFoundError.
  const bookingFound = await prisma.booking.findUnique({
    where: {
      id
    }
  });

  if (!bookingFound) {
    throw new NotFoundError('booking', id);
  }

  // No match for a given userId, throw a NotFoundError.
  if (userId) {
    const userFound = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userFound) {
      throw new NotFoundError('user', userId);
    }
  }

  // No match for a given propertyId, throw a NotFoundError.
  if (propertyId) {
    const propertyFound = await prisma.property.findUnique({
      where: {
        id: propertyId
      }
    });

    if (!propertyFound) {
      throw new NotFoundError('property', propertyId);
    }
  }
