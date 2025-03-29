import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
export type IFeedback = {
  rating?: number;
  customerName: string;
  customerPosition: string;
  comment: string;
};
const giveFeedback = async (payload: IFeedback) => {
  const result = await prisma.feedback.create({
    data: { ...payload },
  });
  return result;
};

const deleteFeedBack = async (id: string) => {
  const isFeedbackExist = await prisma.feedback.findUnique({
    where: { id: id },
  });
  if (!isFeedbackExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  const result = await prisma.feedback.delete({ where: { id: id } });
  return result;
};
const getAllFeedback = async () => {
  const result = await prisma.feedback.findMany();
  return result;
};
export const FeedbackService = {
  giveFeedback,
  getAllFeedback,
  deleteFeedBack,
};
