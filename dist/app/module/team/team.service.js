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
exports.TeamServices = void 0;
const fs_1 = __importDefault(require("fs"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.teamMembers.create({ data: payload });
    return result;
});
const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isPortfolioExist = yield prisma_1.default.teamMembers.findUnique({
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
    if (isPortfolioExist.image) {
        deletePhoto(isPortfolioExist.image);
    }
    const result = yield prisma_1.default.teamMembers.delete({ where: { id: id } });
    return result;
});
const getAllMember = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.teamMembers.findMany();
    return result;
});
exports.TeamServices = {
    createMember,
    deleteMember,
    getAllMember,
};
