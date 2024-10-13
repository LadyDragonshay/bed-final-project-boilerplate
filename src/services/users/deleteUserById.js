//src/services/users/deleteUserById.js
import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/NotFoundError.js';

// No match for the given id, throw a NotFoundError.
// If it does, delete it.
const deleteUserById = async id => {
  const prisma = new PrismaClient();
  const userFound = await prisma.user.findUnique({
    where: {
      id
    }
  });
  
  if (!userFound) {
    throw new NotFoundError('User', id);
  }

  await prisma.user.delete({
    where: {
      id
    }
  });
};

export default deleteUserById;