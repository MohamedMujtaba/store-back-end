import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
require("dotenv").config();

const app = express();

// Import Routes
import ItemRouter from "./src/routes/item.router";

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

// Routes
app.use("/api/v1/item", ItemRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
