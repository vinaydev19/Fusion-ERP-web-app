import mongoose, { Schema } from "mongoose";

const ProductsSchema = new Schema({
  productMongodbId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  totalPrice: {
    type: Number,
    min: 0,
    default: function () {
      return this.Quantity * this.UnitPrice;
    },
  },
});

const supplierSchema = new Schema({
  supplierId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

const purchaseSchema = new Schema(
  {
    purchaseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    supplier: {
      type: [supplierSchema],
      required: true,
    },
    products: {
      type: [ProductsSchema],
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Paid", "Unpaid", "Overdue"],
    },
    notes: {
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

export const Purchase = mongoose.model("Purchase", purchaseSchema);
