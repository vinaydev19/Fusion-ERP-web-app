import mongoose, { Schema } from "mongoose";

const financialSchema = new Schema(
  {
    TransactionId: {
      type: String,
      required: true,
      unique: true,
    },
    Type: {
      type: String,
      required: true,
      enum: ["Income", "Expense"],
    },
    Date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    Amount: {
      type: Number,
      required: true,
      min: 0,
    },
    Currency: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
      trim: true,
    },
    PaymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Bank Transfer", "Credit Card"],
    },
    Account: {
      type: String,
      trim: true,
    },
    Notes: {
      type: String,
      trim: true,
    },
    Status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed"],
    },
    InvoiceId: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Financial = mongoose.model("Financial", financialSchema);
