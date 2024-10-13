//src/services/amenities/getAmenityById.js
import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/NotFoundError.js';

// If it is a match, it returns it.
// Otherwise, throw a NotFoundError.
const getAmenityById = async id => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: {
      id
    }
  });

  if (amenity) return amenity;

  throw new NotFoundError('amenity', id);
};

export default getAmenityById;