"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoClient = void 0;
const mongodb_1 = require("mongodb");
const uri = 'mongodb://localhost:27017/';
exports.mongoClient = new mongodb_1.MongoClient(uri);
