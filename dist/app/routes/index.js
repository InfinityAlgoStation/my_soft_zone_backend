"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const feedback_route_1 = require("../module/feedback/feedback.route");
const portfolios_route_1 = require("../module/portfolios/portfolios.route");
const team_route_1 = require("../module/team/team.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/feedback',
        route: feedback_route_1.FeedbackRoutes,
    },
    {
        path: '/portfolio',
        route: portfolios_route_1.PortfoliosRoutes,
    },
    {
        path: '/team',
        route: team_route_1.TeamRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
