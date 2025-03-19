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
    ExpirationYear: {
      type: String
    },
    ExpirationMonth: {
      type: String
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
    },
    DateAddedYear: {
      type: String
    },
    DateAddedMonth: {
      type: String
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

productSchema.pre("save", function (next) {
  if (this.ExpirationDate) {
    const expDate = new Date(this.ExpirationDate);
    this.ExpirationYear = expDate.getFullYear().toString();
    this.ExpirationMonth = String(expDate.getMonth() + 1).padStart(2, "0");
  }

  if (this.DateAdded) {
    const addedDate = new Date(this.DateAdded);
    this.DateAddedYear = addedDate.getFullYear().toString();
    this.DateAddedMonth = String(addedDate.getMonth() + 1).padStart(2, "0");
  }

  next();
});

export const Product = mongoose.model("Product", productSchema);
