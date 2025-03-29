import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { FeedbackRoutes } from '../module/feedback/feedback.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
