import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';
import path from 'path';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/fileUploadHelpers';
import { TeamController } from './team.controller';

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
      req.body.image = `${config.api_link_Image}/api/v1/team/image/${req.file.filename}`;
    }
    return TeamController.createMember(req, res, next);
  },
);
router.patch(
  '/updateInfo/:id',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.data) {
      req.body = JSON?.parse(req.body?.data);
    }

    if (req.file) {
      req.body.image = `${config.api_link_Image}/api/v1/team/image/${req.file.filename}`;
    }
    return TeamController.updateTeam(req, res, next);
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

router.delete('/delete/:id', TeamController.deleteMember);
router.get('/', TeamController.getAllMember);
export const TeamRoutes = router;
