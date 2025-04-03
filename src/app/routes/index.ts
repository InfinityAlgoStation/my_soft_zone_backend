import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { FeedbackRoutes } from '../module/feedback/feedback.route';
import { PortfoliosRoutes } from '../module/portfolios/portfolios.route';
import { TeamRoutes } from '../module/team/team.route';

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
  {
    path: '/portfolio',
    route: PortfoliosRoutes,
  },
  {
    path: '/team',
    route: TeamRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
