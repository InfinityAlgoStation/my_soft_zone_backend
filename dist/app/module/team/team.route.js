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
exports.TeamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const fileUploadHelpers_1 = require("../../../helpers/fileUploadHelpers");
const team_controller_1 = require("./team.controller");
const router = express_1.default.Router();
router.post('/add', fileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    var _a, _b;
    if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
        req.body = JSON === null || JSON === void 0 ? void 0 : JSON.parse((_b = req.body) === null || _b === void 0 ? void 0 : _b.data);
    }
    if (req.file) {
        req.body.image = `${config_1.default.api_link_Image}/api/v1/team/image/${req.file.filename}`;
    }
    return team_controller_1.TeamController.createMember(req, res, next);
});
router.get('/image/:fileName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = yield path_1.default.join(process.cwd(), 'uploads', path_1.default.basename(req.params.fileName));
    // Check if the file exists
    yield fs_1.default.access(filePath, fs_1.default.constants.F_OK, err => {
        if (err) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Image not found');
        }
        // Send the image file
        res.sendFile(filePath);
    });
}));
router.delete('/delete/:id', team_controller_1.TeamController.deleteMember);
router.get('/', team_controller_1.TeamController.getAllMember);
exports.TeamRoutes = router;
