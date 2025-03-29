import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PortfolioServices } from './portfolio.service';

const createPortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.createPortfolio(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Add portfolio successfully',
      data: result,
    });
  },
);

export const PortfoliosController = {
  createPortfolio,
};
