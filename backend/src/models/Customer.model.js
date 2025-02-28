import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    CustomerId: {
      type: String,
      required: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    PurchaseHistory: [
      {
        SaleId: String,
        Date: Date,
        TotalAmount: Number,
      },
    ],
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

export const Customer = mongoose.model("Customer", customerSchema);
