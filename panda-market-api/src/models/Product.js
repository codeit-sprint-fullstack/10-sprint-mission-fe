import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
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
  },
  {
    timestamps: true,
  } // createdAt, updatedAt 자동 생성
);

export default mongoose.model("Product", ProductSchema);
