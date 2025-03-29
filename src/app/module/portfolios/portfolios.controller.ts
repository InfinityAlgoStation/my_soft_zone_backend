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

const getAllPortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.getAllPortfolio();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrieve portfolio successfully',
      data: result,
    });
  },
);

const getSinglePortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.getSinglePortfolio(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrieve portfolio successfully',
      data: result,
    });
  },
);

const addTechnologyToPortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.addTechnologyToPortfolio(
      req.params.id,
      req.body.technologyName,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'portfolio update successfully',
      data: result,
    });
  },
);

const addFunctionalityToPortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.addFunctionalityToPortfolio(
      req.params.id,
      req.body.functionalityName,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'portfolio update successfully',
      data: result,
    });
  },
);
const deleteTechnology = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.deleteTechnology(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'portfolio update successfully',
      data: result,
    });
  },
);
const deleteFunctionality = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.deleteFunctionality(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'portfolio update successfully',
      data: result,
    });
  },
);
const updatePortfolioInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.updatePortfolioInfo(
      req.params.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'portfolio update successfully',
      data: result,
    });
  },
);
const deletePortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PortfolioServices.deletePortfolio(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'portfolio delete successfully',
      data: result,
    });
  },
);

export const PortfoliosController = {
  createPortfolio,
  getAllPortfolio,
  getSinglePortfolio,
  addTechnologyToPortfolio,
  addFunctionalityToPortfolio,
  deleteFunctionality,
  deleteTechnology,
  updatePortfolioInfo,
  deletePortfolio,
};
