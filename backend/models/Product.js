import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        images: {
            type: [String],
            default: [],
        },
        ownerId: {
            type: Number,
        },
        favoriteCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, 
    }
);


productSchema.statics.getNextId = async function () {
    const last = await this.findOne().sort({ id: -1 }).lean();
    return last ? last.id + 1 : 1;
};

const Product = mongoose.model("Product", productSchema);
export default Product;
