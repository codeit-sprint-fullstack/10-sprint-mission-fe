import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js";

const app = express();

// 미들웨어: JSON 요청 해석 + CORS 허용
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));

// 서버가 정상 작동하는지 확인
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// 상품 라우터 장착
app.use("/products", productsRouter);

// 에러 핸들러
app.use((error, req, res, next) => {
  console.error(error);
  res
    .status(error.status || 500)
    .send({ message: error.message || "서버 오류" });
});

// 서버 실행
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("서버 실행됨!");
    });
  })
  .catch((error) => {
    console.error("MongoDB 연결에 실패했습니다", error);
    process.exit(1); // 강의에서는 안 배웠지만 서버 강제 종료
  });
