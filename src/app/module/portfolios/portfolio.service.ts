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
  });

  return result;
};

export const PortfolioServices = {
  createPortfolio,
};
