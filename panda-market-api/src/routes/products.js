import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 상품 등록
router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, tags = [], images = [] } = req.body || {};

    const product = new Product({ name, description, price, tags, images });

    const saved = await product.save();

    res.status(201).send(saved);
  } catch (error) {
    next(error);
  }
});

// 상품 목록 조회
router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page ?? "1", 10), 1);
    const pageSize = Math.min(
      Math.max(parseInt(req.query.PageSize ?? "10", 10), 1),
      30
    ); // 화면에서 보여지는 최대 개수는 10개지만, 혹시 모를 안정성을 위해 백에서는 여유를 둠!!
    const orderBy = (req.query.orderBy || "recent").toLowerCase();
    const keyword = (req.query.keyword || "").trim();

    const filter = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {}; // $options: "i"는 대소문자 무시~

    const sort = { createdAt: "desc" };

    const totalCount = await Product.countDocuments(filter);
    const list = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const products = list.map(({ id, name, price, createdAt, images }) => ({
      id,
      name,
      price,
      createdAt,
      images,
    }));

    res.status(200).send({ list: products, totalCount });
  } catch (error) {
    next(error);
  }
});

// 상품 상세 조회
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ message: "Not Found" });

    const { id, name, description, price, tags, createdAt } = product;
    res.status(200).send({ id, name, description, price, tags, createdAt });
  } catch (error) {
    next(error);
  }
});

// 상품 수정
router.patch("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send({ message: "Not Found" });

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    const updatedProduct = await product.save();

    res.status(200).send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// 상품 삭제
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).send({ message: "Not Found" });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
