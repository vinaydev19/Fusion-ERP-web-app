import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "Product",
  },
  ProductName: String,
  Quantity: Number,
  UnitPrice: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    InvoiceId: {
      type: String,
      required: true,
    },
    InvoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },
    DateOfIssue: {
      type: Date,
      required: true,
    },
    DueDate: {
      type: Date,
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
    },
    BillingAddress: {
      type: String,
      required: true,
    },
    Products: {
      type: [ProductsSchema],
    },
    Subtotal: {
      type: Number,
      required: true,
    },
    Discount: {
      type: Number,
      default: 0,
    },
    TaxRate: {
      type: Number,
      required: true,
    },
    ShippingCost: {
      type: Number,
      default: 0,
    },
    TotalAmount: {
      type: Number,
      required: true,
    },
    Status: {
      type: String, // Draft, Sent, Paid, Overdue
      required: true,
      enum: ["Draft", "Sent", "Paid", "Overdue"],
    },
    Notes: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
