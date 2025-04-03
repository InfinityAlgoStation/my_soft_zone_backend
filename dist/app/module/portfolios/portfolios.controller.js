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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfoliosController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const portfolio_service_1 = require("./portfolio.service");
const createPortfolio = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.createPortfolio(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Add portfolio successfully',
        data: result,
    });
}));
const getAllPortfolio = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.getAllPortfolio();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Retrieve portfolio successfully',
        data: result,
    });
}));
const getSinglePortfolio = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.getSinglePortfolio(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Retrieve portfolio successfully',
        data: result,
    });
}));
const addTechnologyToPortfolio = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.addTechnologyToPortfolio(req.params.id, req.body.technologyName);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'portfolio update successfully',
        data: result,
    });
}));
const addFunctionalityToPortfolio = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.addFunctionalityToPortfolio(req.params.id, req.body.functionalityName);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'portfolio update successfully',
        data: result,
    });
}));
const deleteTechnology = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.deleteTechnology(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'portfolio update successfully',
        data: result,
    });
}));
const deleteFunctionality = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.deleteFunctionality(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'portfolio update successfully',
        data: result,
    });
}));
const updatePortfolioInfo = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.updatePortfolioInfo(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'portfolio update successfully',
        data: result,
    });
}));
const deletePortfolio = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield portfolio_service_1.PortfolioServices.deletePortfolio(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'portfolio delete successfully',
        data: result,
    });
}));
exports.PortfoliosController = {
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
