//src/routes/amenities.routes.js
import express from "express";
import { router } from "express";
import amenities from "src/data/amenities.json";
import checkRequiredFields from "src/middleware/checkRequiredFields.js";
import createAmenity from "src/services/amenities/createAmenity.js";
import deleteAmenityById from "src/services/amenities/deleteAmenityById.js";
import getAmenities from "src/services/amenities/getAmenities.js";
import getAmenityById from "src/services/amenities/getAmenityById.js";
import updateAmenityById from "src/services/amenities/updateAmenityById.js";

router.get('/', async (req, res, next) => {
  try {
    const amenities = await getAmenities();

    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authMiddleware,
  checkRequiredFields(jsonSchema.definitions.Amenity.required),
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const newAmenity = await createAmenity(name);

      res.status(201).json(newAmenity);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id?', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      await deleteAmenityById(id);

      res.status(200).json({
        message: `Amenity with id ${id} was successfully deleted!`
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
      const { name } = req.body;
      const updatedAmenity = await updateAmenityById(id, {
        name
      });

      res.status(200).json(updatedAmenity);
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