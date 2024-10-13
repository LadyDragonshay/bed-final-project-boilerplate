//src/routes/user.routes.js
import express from "express";
import { router } from "express";
import user from "src/data/users.json";
import checkRequiredFields from "src/middleware/checkRequiredFields.js";
import createUser from "src/services/users/createUser.js";
import deleteUserById from "src/services/users/deleteUserById.js";
import getUsers from "src/services/users/getUsers.js";
import getUserById from "src/services/users/getUserById.js";
import updateUserById from "src/services/users/updateUserById.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const { username, email } = req.query;
      const users = await getUsers(username, email);
  
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });
  
  router.post(
    '/',
    authMiddleware,
    checkRequiredFields(jsonSchema.definitions.User.required),
    async (req, res, next) => {
      try {
        const { username, password, name, email, phoneNumber, profilePicture } =
          req.body;
        const newUser = await createUser(
          username,
          password,
          name,
          email,
          phoneNumber,
          profilePicture
        );
  
        res.status(201).json(newUser);
      } catch (error) {
        next(error);
      }
    }
  );
  
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });
  
  router.delete('/:id?', authMiddleware, async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (id) {
        await deleteUserById(id);
  
        res.status(200).json({
          message: `User with id ${id} was successfully deleted!`
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
        const { username, password, name, email, phoneNumber, profilePicture } =
          req.body;
        const updatedUser = await updateUserById(id, {
          username,
          password,
          name,
          email,
          phoneNumber,
          profilePicture
        });
  
        res.status(200).json(updatedUser);
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