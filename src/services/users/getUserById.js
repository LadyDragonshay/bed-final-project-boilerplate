//src/services/users/getUserById.js
import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/NotFoundError.js';

// If a match for the given id, return it.
// Otherwise, throw a NotFoundError.
const getUserById = async id => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });

  if (user) return user;

  throw new NotFoundError('user', id);
};

export default getUserById;