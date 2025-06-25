"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, success, message, data) => {
    res.json({
        success,
        message,
        data,
    });
};
exports.default = sendResponse;
