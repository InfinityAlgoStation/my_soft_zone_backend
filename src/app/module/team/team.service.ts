import fs from 'fs';
import httpStatus from 'http-status';
import path from 'path';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
const createMember = async (payload: {
  name: string;
  role: string;
  image?: string;
}) => {
  const result = await prisma.teamMembers.create({ data: payload });
  return result;
};

const deleteMember = async (id: string) => {
  const isPortfolioExist = await prisma.teamMembers.findUnique({
    where: { id: id },
  });
  if (!isPortfolioExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'POrtfolio not found');
  }

  const deletePhoto = async (photoLink: string) => {
    // Delete the image file from the server
    const filePath = path.join(
      process.cwd(),
      'uploads',
      path.basename(photoLink),
    );
    if (fs.existsSync(filePath)) {
      try {
        await fs.promises.unlink(filePath); // Using fs.promises.unlink for a promise-based approach
      } catch (err) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          `Failed to delete image or database record`,
        );
      }
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Image not found in the directory',
      );
    }
  };
  if (isPortfolioExist.image) {
    deletePhoto(isPortfolioExist.image);
  }
  const result = await prisma.teamMembers.delete({ where: { id: id } });

  return result;
};
export const TeamServices = {
  createMember,
  deleteMember,
};
