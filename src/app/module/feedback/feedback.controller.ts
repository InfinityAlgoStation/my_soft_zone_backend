import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.services';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.giveFeedback(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback send Successfully',
    data: result,
  });
});
const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getAllFeedback();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback retrieve Successfully',
    data: result,
  });
});
const deleteFeedBack = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.deleteFeedBack(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback delete Successfully',
    data: result,
  });
});
export const FeedbackController = {
  createFeedback,
  getAllFeedback,
  deleteFeedBack,
};
