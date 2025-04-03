import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TeamServices } from './team.service';

const createMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TeamServices.createMember(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member add successfully',
      data: result,
    });
  },
);

const deleteMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TeamServices.deleteMember(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member delete successfully',
      data: result,
    });
  },
);

export const TeamController = {
  createMember,
  deleteMember,
};
