"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required ' }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh Token is required' }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old password is required' }),
        newPassword: zod_1.z.string({ required_error: 'New password is required' }),
    }),
});
const makeSuperAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string({ required_error: 'User name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z.enum(['SUPERADMIN'], { required_error: 'Role is required' }),
        passKey: zod_1.z.string({
            required_error: 'Provide valid secret passKey',
        }),
    }),
});
const makeAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'User name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z.enum(['ADMIN'], { required_error: 'Role is required' }),
    }),
});
const makeUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'User name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z.enum(['OWNER', 'TENANT'], { required_error: 'Role is required' }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema,
    makeUserZodSchema,
    makeAdminZodSchema,
    makeSuperAdminZodSchema,
};
