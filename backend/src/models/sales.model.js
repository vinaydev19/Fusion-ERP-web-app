import mongoose from "mongoose";

const customerSchame = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Mobile: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

const saleSchame = new mongoose.Schema(
  {
    SaleId: {
      type: String,
      required: true,
    },
    SellingPrice: {
      type: String,
      required: true,
    },
    TotalAmount: {
      type: String,
      required: true,
    },
    PaymentStatus: {
      type: String,
      required: true,
    },
    InvoiceStatus: {
      type: String,
      required: true,
    },
    Notes: {
      type: String,
      required: true,
    },
    SalesDate: {
      type: String,
      required: true,
    },
    Quantity: {
      type: String,
      required: true,
    },
    Warehouse: {
      type: String,
      required: true,
    },
    Customer: {
      type: [customerSchame],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Sale = mongoose.model("Sale", saleSchame);
