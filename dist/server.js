"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
// Import Routes
const item_router_1 = __importDefault(require("./src/routes/item.router"));
app.use(express_1.default.json({
    limit: "50mb",
}));
app.use((0, morgan_1.default)("common"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1/item", item_router_1.default);
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
