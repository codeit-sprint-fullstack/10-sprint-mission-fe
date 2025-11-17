import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("몽고 디비 연결댐"))
    .catch((err) => console.error("아따 연결실패", err));

app.use("/products", productRouter);

app.use((err, req, res, next) => {
    console.error(err);
    if (err.status) {
        res.status(err.status).send({ message: err.message });
    } else {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`서버시작 완료 포트:${port}`);
});
