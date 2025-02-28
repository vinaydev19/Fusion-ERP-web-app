import mongoose from "mongoose";

const financialSchema = new mongoose.Schema(
  {
    TransactionId: {
      type: String,
      required: true,
    },
    Type: {
      type: String, // Income or Expense
      required: true,
      enum: ["Income", "Expense"],
    },
    Date: {
      type: Date,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Currency: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    PaymentMethod: {
      type: String, // Cash, Bank Transfer, Credit Card
      required: true,
      enum: ["Cash", "Bank Transfer", "Credit Card"],
    },
    Account: {
      type: String,
    },
    Notes: {
      type: String,
    },
    Status: {
      type: String, // Pending, Completed, Failed
      required: true,
      enum: ["Pending", "Completed", "Failed"],
    },
    InvoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "Invoice",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Financial = mongoose.model("Financial", financialSchema);
