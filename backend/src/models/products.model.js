import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    ProductId: {
      type: String,
      required: true,
      unique: true,
    },
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },
    Category: {
      type: String,
      trim: true,
    },
    Description: {
      type: String,
      trim: true,
    },
    ProductImage: {
      type: String,
      trim: true,
    },
    Quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    ExpirationDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > new Date();
        },
        message: "Expiration date must be in the future",
      },
    },
    CostPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    SellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    Notes: {
      type: String,
      trim: true,
    },
    DateAdded: {
      type: Date,
      default: Date.now,
    },
    Warehouse: {
      type: String,
      trim: true,
    },
    Status: {
      type: String,
      enum: ["Low Stock", "Out of Stock", "Available"],
      default: "Available",
      required: true
    },
    SupplierName: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
