import express from 'express';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.post('/submit', FeedbackController.createFeedback);

router.get('/', FeedbackController.getAllFeedback);
router.delete('/delete/:id', FeedbackController.deleteFeedBack);

export const FeedbackRoutes = router;
