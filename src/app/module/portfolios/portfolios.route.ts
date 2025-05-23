import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';
import path from 'path';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/fileUploadHelpers';
import { PortfoliosController } from './portfolios.controller';
const router = express.Router();

type MulterRequest = Request & {
  files?: Express.Multer.File[];
};
router.post(
  '/add',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.data) {
      req.body = JSON?.parse(req.body?.data);
    }

    if (req.file) {
      req.body.image = `${config.api_link_Image}/api/v1/portfolio/image/${req.file.filename}`;
    }
    return PortfoliosController.createPortfolio(req, res, next);
  },
);
router.post(
  '/updateInfo/:id',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.data) {
      req.body = JSON?.parse(req.body?.data);
    }

    if (req.file) {
      req.body.image = `${config.api_link_Image}/api/v1/portfolio/image/${req.file.filename}`;
    }
    return PortfoliosController.updatePortfolioInfo(req, res, next);
  },
);
router.get('/image/:fileName', async (req: Request, res: Response) => {
  const filePath = await path.join(
    process.cwd(),
    'uploads',
    path.basename(req.params.fileName),
  );
  // Check if the file exists
  await fs.access(filePath, fs.constants.F_OK, err => {
    if (err) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
    }

    // Send the image file
    res.sendFile(filePath);
  });
});

router.get('/', PortfoliosController.getAllPortfolio);
router.get('/single/:id', PortfoliosController.getSinglePortfolio);
router.post(
  '/addTechnology/:id',
  PortfoliosController.addTechnologyToPortfolio,
);
router.post(
  '/addFunctionality/:id',
  PortfoliosController.addFunctionalityToPortfolio,
);
router.delete('/deleteTechnology/:id', PortfoliosController.deleteTechnology);
router.delete(
  '/deleteFunctionality/:id',
  PortfoliosController.deleteFunctionality,
);
router.delete('/delete/:id', PortfoliosController.deletePortfolio);

export const PortfoliosRoutes = router;
