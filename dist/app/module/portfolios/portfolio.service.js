"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioServices = void 0;
const fs_1 = __importDefault(require("fs"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createPortfolio = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { technology, functionalities } = payload, othersData = __rest(payload, ["technology", "functionalities"]);
    const result = yield prisma_1.default.portfolios.create({
        data: Object.assign({ technology: {
                create: technology === null || technology === void 0 ? void 0 : technology.map((name) => ({ name })),
            }, functionalities: {
                create: functionalities === null || functionalities === void 0 ? void 0 : functionalities.map((name) => ({ name })),
            } }, othersData),
        include: {
            technology: true,
            functionalities: true,
        },
    });
    return result;
});
const getAllPortfolio = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.portfolios.findMany({
        include: { functionalities: true, technology: true },
    });
    return result;
});
const getSinglePortfolio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.portfolios.findUnique({
        where: { id: id },
        include: { functionalities: true, technology: true },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Portfolio not found');
    }
    return result;
});
const addTechnologyToPortfolio = (portfolioId, technologyName) => __awaiter(void 0, void 0, void 0, function* () {
    const isPortfolioExist = yield prisma_1.default.portfolios.findUnique({
        where: { id: portfolioId },
    });
    if (!isPortfolioExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'POrtfolio not found');
    }
    const result = yield prisma_1.default.technology.create({
        data: {
            name: technologyName,
            portfoliosId: portfolioId,
        },
        include: { portfolio: true },
    });
    return result;
});
const deleteTechnology = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.technology.delete({
        where: { id: id },
    });
    return result;
});
const addFunctionalityToPortfolio = (portfolioId, functionalityName) => __awaiter(void 0, void 0, void 0, function* () {
    const isPortfolioExist = yield prisma_1.default.portfolios.findUnique({
        where: { id: portfolioId },
    });
    if (!isPortfolioExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'POrtfolio not found');
    }
    const result = yield prisma_1.default.functionalities.create({
        data: {
            name: functionalityName,
            portfoliosId: portfolioId,
        },
        include: { portfolio: true },
    });
    return result;
});
const deleteFunctionality = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.functionalities.delete({
        where: { id: id },
    });
    return result;
});
const updatePortfolioInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isPortfolioExist = yield prisma_1.default.portfolios.findUnique({
        where: { id: id },
    });
    if (!isPortfolioExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'POrtfolio not found');
    }
    const deletePhoto = (photoLink) => __awaiter(void 0, void 0, void 0, function* () {
        // Delete the image file from the server
        const filePath = path_1.default.join(process.cwd(), 'uploads', path_1.default.basename(photoLink));
        if (fs_1.default.existsSync(filePath)) {
            try {
                yield fs_1.default.promises.unlink(filePath); // Using fs.promises.unlink for a promise-based approach
            }
            catch (err) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `Failed to delete image or database record`);
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Image not found in the directory');
        }
    });
    if (payload.image) {
        if (isPortfolioExist.image) {
            deletePhoto(isPortfolioExist.image);
        }
    }
    const result = yield prisma_1.default.portfolios.update({
        where: { id: id },
        data: Object.assign({}, payload),
    });
    return result;
});
const deletePortfolio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isPortfolioExist = yield prisma_1.default.portfolios.findUnique({
        where: { id: id },
    });
    if (!isPortfolioExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'POrtfolio not found');
    }
    const deletePhoto = (photoLink) => __awaiter(void 0, void 0, void 0, function* () {
        // Delete the image file from the server
        const filePath = path_1.default.join(process.cwd(), 'uploads', path_1.default.basename(photoLink));
        if (fs_1.default.existsSync(filePath)) {
            try {
                yield fs_1.default.promises.unlink(filePath); // Using fs.promises.unlink for a promise-based approach
            }
            catch (err) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `Failed to delete image or database record`);
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Image not found in the directory');
        }
    });
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        if (isPortfolioExist.image) {
            deletePhoto(isPortfolioExist.image);
        }
        yield prisma.technology.deleteMany({
            where: { portfoliosId: id },
        });
        yield prisma.functionalities.deleteMany({
            where: { portfoliosId: id },
        });
        const result = yield prisma.portfolios.delete({ where: { id: id } });
        return result;
    }));
    return result;
});
exports.PortfolioServices = {
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
