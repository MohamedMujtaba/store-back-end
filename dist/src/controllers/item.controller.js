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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = exports.createItem = void 0;
const prisma_1 = require("../utils/prisma");
const uploadImg_1 = require("../utils/uploadImg");
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, compony, price, status, images, hot, active } = req.body;
    try {
        ///@ts-ignore  FIXME:
        const i = yield (0, uploadImg_1.uploadImg)(res, images);
        const item = yield prisma_1.prisma.item.create({
            data: { title, compony, price, status, images: i, hot, active },
        });
        res.status(200).json({ success: true, item });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong 😴",
        });
    }
});
exports.createItem = createItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { active, compony, hot, status } = req.query;
    let filters = {};
    if (active)
        filters.active = active === "true" ? true : false;
    if (compony)
        filters.compony = compony;
    if (hot)
        filters.hot = hot === "true" ? true : false;
    if (status)
        filters.status = status;
    try {
        const items = yield prisma_1.prisma.item.findMany({
            where: filters,
        });
        res.status(200).json({ success: true, items });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong 😴",
            error: error,
        });
    }
});
exports.getItems = getItems;
