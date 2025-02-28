import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "Product",
  },
  ProductName: String,
  Quantity: Number,
  UnitPrice: Number,
  TotalPrice: Number,
});

const supplierSchema = new mongoose.Schema({
  SupplierId: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
});

const purchaseSchema = new mongoose.Schema(
  {
    PurchaseId: {
      type: String,
      required: true,
    },
    Supplier: {
      type: supplierSchema,
      required: true,
    },
    Products: {
      type: [ProductsSchema],
    },
    OrderDate: {
      type: Date,
      required: true,
    },
    DeliveryDate: {
      type: Date,
      required: true,
    },
    PaymentStatus: {
      type: String, // Paid, Unpaid, Overdue
      required: true,
      enum: ["Paid", "Unpaid", "Overdue"],
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

export const Purchase = mongoose.model("Purchase", purchaseSchema);
