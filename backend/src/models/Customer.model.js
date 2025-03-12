import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    CustomerId: {
      type: String,
      required: true,
      unique: true,
    },
    FullName: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    PhoneNumber: {
      type: String,
      trim: true,
      required: true,
      match: [/^\d{10,15}$/, "Invalid phone number"],
    },
    Address: {
      type: String,
      required: true,
      trim: true,
    },
    PurchaseHistory: [
      {
        SaleId: {
          type: String,
          required: true,
        },
        Date: {
          type: Date,
          required: true,
          default: Date.now,
        },
        TotalAmount: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
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

export const Customer = mongoose.model("Customer", customerSchema);
