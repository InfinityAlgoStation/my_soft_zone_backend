"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.sentEmail = exports.transporter = void 0;
const nodemailer_1 = require("nodemailer");
const config_1 = __importDefault(require("../config"));
const hostPort = config_1.default.email_host.name;
const transporterOptions = {
    host: config_1.default.email_host.name,
    port: Number(hostPort),
    secure: true,
    auth: {
        user: `${config_1.default.email_host.user}`,
        pass: `${config_1.default.email_host.password}`,
    },
};
exports.transporter = (0, nodemailer_1.createTransport)(transporterOptions);
const sentEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield exports.transporter.sendMail(payload);
    return info;
});
exports.sentEmail = sentEmail;
