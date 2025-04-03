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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const encription_1 = require("../../../helpers/encription");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const nodeMailer_1 = require("../../../helpers/nodeMailer");
const stringGenrator_1 = require("../../../helpers/stringGenrator");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const userRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, othersData = __rest(payload, ["password"]);
    const isUserAlreadyExist = yield prisma_1.default.user.findUnique({
        where: { email: othersData === null || othersData === void 0 ? void 0 : othersData.email },
    });
    if (isUserAlreadyExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already registered !');
    }
    // Encrypt password
    const encryptedPassword = yield (0, encription_1.encryptPassword)(password);
    // Start a Prisma transaction
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, othersData), { password: encryptedPassword }),
    });
    return result;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({ where: { email: email } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist !');
    }
    if (isUserExist.password &&
        !(yield (0, encription_1.isPasswordMatched)(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is not matched');
    }
    // create user access token and refresh token
    const { id } = isUserExist;
    const role = 'ADMIN';
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, role, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
        // refreshToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { id: user === null || user === void 0 ? void 0 : user.id },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield (0, encription_1.isPasswordMatched)(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is not matched');
    }
    const newEncryptedPassword = yield (0, encription_1.encryptPassword)(newPassword);
    const result = yield prisma_1.default.user.update({
        where: { id: isUserExist.id },
        data: { password: newEncryptedPassword },
    });
});
const forgetPasswordOTPSend = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { email: email },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const generatedOTP = (0, stringGenrator_1.otpGenerator)();
    const saveTokenDB = yield prisma_1.default.user.update({
        where: { email: email },
        data: { otp: generatedOTP },
    });
    if (!(saveTokenDB === null || saveTokenDB === void 0 ? void 0 : saveTokenDB.otp)) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Otp Send failed !');
    }
    const payload1 = {
        from: `${config_1.default.email_host.user}`,
        to: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        subject: 'Forget password of My Soft Zone',
        text: `Hi ${isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.name} ,`,
        html: `<div><b><h1>My Soft Zone</h1></b> </br> <h4> Your OTP is  </h4></br> <h1> <b>${generatedOTP}</b>  </h1></div>`,
    };
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const emailSendResult = yield (0, nodeMailer_1.sentEmail)(payload1);
    if (emailSendResult.accepted.length === 0) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Email send failed !');
    }
});
const forgetPasswordOTPVerify = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { email: email },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const isTokenSame = (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.otp) === otp;
    if (!isTokenSame) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'OTP not matched');
    }
});
const forgetPasswordSetNewPassword = (email, otp, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // password validity check
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { email: email, otp: otp },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    // encrypt password
    const encryptedPassword = yield (0, encription_1.encryptPassword)(newPassword);
    const setNewPassword = yield prisma_1.default.user.update({
        where: { email: email, otp: otp },
        data: { otp: null, password: encryptedPassword },
    });
    if (!(setNewPassword === null || setNewPassword === void 0 ? void 0 : setNewPassword.otp) === null &&
        (setNewPassword === null || setNewPassword === void 0 ? void 0 : setNewPassword.password) === newPassword) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to set new password !');
    }
    // send mail that password changed
});
exports.AuthServices = {
    userRegistration,
    userLogin,
    changePassword,
    forgetPasswordOTPSend,
    forgetPasswordOTPVerify,
    forgetPasswordSetNewPassword,
};
