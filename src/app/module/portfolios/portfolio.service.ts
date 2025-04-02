import fs from 'fs';
import httpStatus from 'http-status';
import path from 'path';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
export type IPortfolio = {
  title: string;
  description?: string;
  image?: string;
  technology?: string[];
  functionalities?: string[];
};
const createPortfolio = async (payload: IPortfolio) => {
  const { technology, functionalities, ...othersData } = payload;
  const result = await prisma.portfolios.create({
    data: {
      technology: {
        create: technology?.map((name: string) => ({ name })),
      },
      functionalities: {
        create: functionalities?.map((name: string) => ({ name })),
      },
      ...othersData,
    },
    include: {
      technology: true,
      functionalities: true,
    },
  });

  return result;
};

const getAllPortfolio = async () => {
  const result = await prisma.portfolios.findMany({
    include: { functionalities: true, technology: true },
  });
  return result;
};
const getSinglePortfolio = async (id: string) => {
  const result = await prisma.portfolios.findUnique({
    where: { id: id },
    include: { functionalities: true, technology: true },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Portfolio not found');
  }
  return result;
};

const addTechnologyToPortfolio = async (
  portfolioId: string,
  technologyName: string,
) => {
  const isPortfolioExist = await prisma.portfolios.findUnique({
    where: { id: portfolioId },
  });
  if (!isPortfolioExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'POrtfolio not found');
  }
  const result = await prisma.technology.create({
    data: {
      name: technologyName,
      portfoliosId: portfolioId,
    },
    include: { portfolio: true },
  });

  return result;
};
const deleteTechnology = async (id: string) => {
  const result = await prisma.technology.delete({
    where: { id: id },
  });

  return result;
};
const addFunctionalityToPortfolio = async (
  portfolioId: string,
  functionalityName: string,
) => {
  const isPortfolioExist = await prisma.portfolios.findUnique({
    where: { id: portfolioId },
  });
  if (!isPortfolioExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'POrtfolio not found');
  }
  const result = await prisma.functionalities.create({
    data: {
      name: functionalityName,
      portfoliosId: portfolioId,
    },
    include: { portfolio: true },
  });

  return result;
};
const deleteFunctionality = async (id: string) => {
  const result = await prisma.functionalities.delete({
    where: { id: id },
  });

  return result;
};

const updatePortfolioInfo = async (
  id: string,
  payload: { title?: string; description?: string; image?: string },
) => {
  const isPortfolioExist = await prisma.portfolios.findUnique({
    where: { id: id },
  });
  if (!isPortfolioExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'POrtfolio not found');
  }

  const deletePhoto = async (photoLink: string) => {
    // Delete the image file from the server
    const filePath = path.join(
      process.cwd(),
      'uploads/userPhoto',
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

  if (payload.image) {
    if (isPortfolioExist.image) {
      deletePhoto(isPortfolioExist.image);
    }
  }
  const result = await prisma.portfolios.update({
    where: { id: id },
    data: {
      ...payload,
    },
  });
  return result;
};

const deletePortfolio = async (id: string) => {
  const isPortfolioExist = await prisma.portfolios.findUnique({
    where: { id: id },
  });
  if (!isPortfolioExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'POrtfolio not found');
  }

  const deletePhoto = async (photoLink: string) => {
    // Delete the image file from the server
    const filePath = path.join(
      process.cwd(),
      'uploads/userPhoto',
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

  const result = await prisma.$transaction(async prisma => {
    if (isPortfolioExist.image) {
      deletePhoto(isPortfolioExist.image);
    }
    await prisma.technology.deleteMany({
      where: { portfoliosId: id },
    });
    await prisma.functionalities.deleteMany({
      where: { portfoliosId: id },
    });
    const result = await prisma.portfolios.delete({ where: { id: id } });
    return result;
  });
  return result;
};

export const PortfolioServices = {
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
