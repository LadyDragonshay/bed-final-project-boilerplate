//src/services/users/createUser.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Combined function for creating a new user
const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  // Check if the user already exists based on email
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user and return it
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword, // Store the hashed password
      name,
      email,
      phoneNumber,
      profilePicture
    }
  });

  return newUser;
};

// Export the function so it can be used in other parts of your app
export default createUser;
