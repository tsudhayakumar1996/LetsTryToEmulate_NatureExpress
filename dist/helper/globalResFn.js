"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalResFn = void 0;
const const_1 = require("../const");
const logger_1 = require("./logger");
const globalResFn = ({ res, resBody, code }) => {
    var _a, _b;
    const isResForErr = 'error' in resBody;
    // logger
    if (isResForErr)
        handleError(resBody); // error res
    else
        logger_1.logger.info(JSON.stringify(resBody)); // success res
    // delete location key
    delete resBody.location;
    // response
    return res.status(code).json(isResForErr ? { message: (_b = (_a = resBody === null || resBody === void 0 ? void 0 : resBody.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : const_1.AN_ERROR_OCCURED } : resBody);
};
exports.globalResFn = globalResFn;
const handleError = (resBody) => {
    const { error, location } = resBody;
    if (error instanceof Error) {
        logger_1.logger.error({
            message: error.message,
            stack: error.stack,
            name: error.name,
            location
        });
    }
    else {
        logger_1.logger.error({
            error,
            location
        });
    }
};
