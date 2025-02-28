import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductId: {
      type: Number,
      required: true,
    },
    ProductName: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
    },
    Description: {
      type: String,
    },
    ProductImage: {
      type: String,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    ExpirationDate: {
      type: Date,
    },
    CostPrice: {
      type: Number,
      required: true,
    },
    SellingPrice: {
      type: Number,
      required: true,
    },
    Notes: {
      type: String,
    },
    DateAdded: {
      type: Date,
    },
    Warehouse: {
      type: String,
    },
    Status: {
      type: String,
      enum: ["Low Stock", "Out of Stock", "Available"],
    },
    SupplierName: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
