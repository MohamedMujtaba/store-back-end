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
exports.uploadImg = void 0;
const cloudinary_1 = require("./cloudinary");
const uploadImg = (res, images) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promises = [];
        images.map((image) => {
            promises.push(cloudinary_1.cloudinary.uploader.upload(image, {
                upload_preset: "test-dev",
            }));
        });
        const r = yield Promise.all(promises);
        const fr = r.map((i) => {
            return {
                public_id: i.public_id,
                url: i.secure_url,
            };
        });
        return fr;
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: "Something went wrong will uploading your images 😴" });
    }
});
exports.uploadImg = uploadImg;
