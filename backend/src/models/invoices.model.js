import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  productMongodbId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productName: {
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
});

const invoiceSchema = new Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  dateOfIssue: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  billingAddress: {
    type: String,
    required: true,
    trim: true,
  },
  products: {
    type: [ProductSchema],
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  taxRate: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ["Draft", "Sent", "Paid", "Overdue"],
    default: "Draft",
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
}, {
  timestamps: true,
});


export const Invoice = mongoose.model("Invoice", invoiceSchema);
