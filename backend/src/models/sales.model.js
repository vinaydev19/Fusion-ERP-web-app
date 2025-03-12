import mongoose, { Schema } from "mongoose";

const saleSchema = new Schema(
  {
    saleId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    saleItem: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      min: 0,
      default: function () {
        return this.sellingPrice * this.quantity;
      },
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Paid", "Pending", "Failed"],
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
    notes: {
      type: String,
      trim: true,
    },
    salesDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    customerName: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Sale = mongoose.model("Sale", saleSchema);
