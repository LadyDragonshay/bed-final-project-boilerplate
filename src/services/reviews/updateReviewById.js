////src/services/reviews/updateReviewById.js
import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/NotFoundError.js';

const updateReviewById = async (
  id,
  { userId, propertyId, rating, comment }
) => {
  const prisma = new PrismaClient();

  // No match for the given id, throw a NotFoundError.
  const reviewFound = await prisma.review.findUnique({
    where: {
      id
    }
  });

  if (!reviewFound) {
    throw new NotFoundError('Review', id);
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

  // No match for the given propertyId, throw a NotFoundError.
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

  // Update the review and return it.
  const updatedReview = await prisma.review.update({
    where: {
      id
    },
    data: {
      user: userId
        ? {
            connect: {
              id: userId
            }
          }
        : undefined,
      property: propertyId
        ? {
            connect: {
              id: propertyId
            }
          }
        : undefined,
      rating,
      comment
    }
  });

  return updatedReview;
};

export default updateReviewById;