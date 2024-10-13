//src/routes/review.routes.js
import express from "express";
import { router } from "express";
import review from "src/data/reviews.json";
import checkRequiredFields from "src/middleware/checkRequiredFields.js";
import createReview from "src/services/reviews/createReview.js";
import deleteReviewById from "src/services/reviews/deleteReviewById.js";
import getReviews from "src/services/reviews/getReviews.js";
import getReviewById from "src/services/reviews/getReviewById.js";
import updateReviewById from "src/services/reviews/updateReviewById.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const { userId, propertyId } = req.query;
      const reviews = await getReviews(userId, propertyId);
  
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  });
  
  router.post(
    '/',
    authMiddleware,
    checkRequiredFields(jsonSchema.definitions.Review.required),
    async (req, res, next) => {
      try {
        const { userId, propertyId, rating, comment } = req.body;
        const newReview = await createReview(userId, propertyId, rating, comment);
  
        res.status(201).json(newReview);
      } catch (error) {
        next(error);
      }
    }
  );
  
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
  
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  });
  
  router.delete('/:id?', authMiddleware, async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (id) {
        await deleteReviewById(id);
  
        res.status(200).json({
          message: `Review with id ${id} was successfully deleted!`
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
        const { userId, propertyId, rating, comment } = req.body;
        const updatedReview = await updateReviewById(id, {
          userId,
          propertyId,
          rating,
          comment
        });
  
        res.status(200).json(updatedReview);
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