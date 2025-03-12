import mongoose, { Schema } from "mongoose";

const ProductsSchema = new Schema({
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
    trim: true,
  },
  Quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  UnitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  TotalPrice: {
    type: Number,
    min: 0,
    default: function () {
      return this.Quantity * this.UnitPrice;
    },
  },
});

const supplierSchema = new Schema({
  SupplierId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Contact: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  Address: {
    type: String,
    required: true,
    trim: true,
  },
});

const purchaseSchema = new Schema(
  {
    PurchaseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Supplier: {
      type: supplierSchema,
      required: true,
    },
    Products: {
      type: [ProductsSchema],
      required: true,
    },
    OrderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    DeliveryDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.OrderDate;
        },
        message: "Delivery date must be after order date",
      },
    },
    PaymentStatus: {
      type: String,
      required: true,
      enum: ["Paid", "Unpaid", "Overdue"],
    },
    Notes: {
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
