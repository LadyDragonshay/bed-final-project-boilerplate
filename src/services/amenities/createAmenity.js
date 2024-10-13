//src/services/amenities/createAmenity.js
import { PrismaClient } from '@prisma/client';

const createAmenity = async name => {
  const prisma = new PrismaClient();
  const newAmenity = await prisma.amenity.create({
    data: { name }
  });

  return newAmenity;
};

export default createAmenity;