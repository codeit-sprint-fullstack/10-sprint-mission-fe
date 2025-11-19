import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { name, description, price, tags, images, ownerId } = req.body;

        if (!name || !description || price == null) {
            return res
                .status(400)
                .send({ message: "name, description, price는 필수입니다." });
        }


        const product = await Product.create({
            name,
            description,
            price,
            tags,
            images,
            ownerId,
        });

        res.status(201).send(product); 
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);

        if (!product) {
            return res
                .status(404)
                .send({ message: "해당 id의 상품을 찾을 수 없습니다." });
        }

        res.send(product);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, update, {
            new: true,
        });

        const update = req.body;
        update.updatedAt = new Date();



        if (!product) {
            return res
                .status(404)
                .send({ message: "해당 id의 상품을 찾을 수 없습니다." });
        }

        res.send(product);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res
                .status(404)
                .send({ message: "해당 id의 상품을 찾을 수 없습니다." });
        }
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const offset = Number(req.query.offset ?? 0);
        const limit = Number(req.query.limit ?? 10);
        const orderBy = req.query.orderBy || "recent";
        const keyword = req.query.keyword?.trim() || "";

        const filter = {};

        if (keyword) {
            filter.$or = [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ];
        }

        const sort = {};
        if (orderBy === "recent") {
            sort.createdAt = -1;
        }

        const [items, totalCount] = await Promise.all([
            Product.find(filter)
                .sort(sort)
                .skip(offset)
                .limit(limit)
                .select("name price createdAt")
                .lean(),
            Product.countDocuments(filter),
        ]);

        res.send({
            items,
            totalCount,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
