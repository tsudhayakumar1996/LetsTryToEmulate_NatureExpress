"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = require("path");
const const_1 = require("../const");
const globalResFn_1 = require("../helper/globalResFn");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    const location = 'router - /';
    try {
        res.sendFile((0, path_1.join)(__dirname, '../../public/index.html'));
    }
    catch (err) {
        (0, globalResFn_1.globalResFn)({ res, code: 500, resBody: { user: const_1.UNKNOWN_USER, location, error: err } });
    }
});
exports.default = router;
