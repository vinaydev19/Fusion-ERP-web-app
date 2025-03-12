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
});

const invoiceSchema = new Schema(
  {
    InvoiceId: {
      type: String,
      required: true,
      unique: true,
    },
    InvoiceNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    DateOfIssue: {
      type: Date,
      required: true,
      default: Date.now,
    },
    DueDate: {
      type: Date,
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
      trim: true,
    },
    BillingAddress: {
      type: String,
      required: true,
      trim: true,
    },
    Products: {
      type: [ProductsSchema],
      required: true,
    },
    Subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    Discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    TaxRate: {
      type: Number,
      required: true,
      min: 0,
    },
    ShippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    TotalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    Status: {
      type: String,
      required: true,
      enum: ["Draft", "Sent", "Paid", "Overdue"],
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

export const Invoice = mongoose.model("Invoice", invoiceSchema);
