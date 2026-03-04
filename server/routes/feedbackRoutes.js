import express from "express";
import { addFeedback, getFeedbacks } from "../controllers/feedbackController.js";
import { protect } from "../middleware/auth.js";

const feedbackRouter = express.Router();

feedbackRouter.post('/add', protect, addFeedback)
feedbackRouter.get('/all', getFeedbacks)

export default feedbackRouter;
