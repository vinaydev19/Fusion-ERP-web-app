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
  TotalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const deliverySchema = new Schema(
  {
    DeliveryId: {
      type: String,
      required: true,
      unique: true,
    },
    OrderNumber: {
      type: String,
      required: true,
      unique: true, 
    },
    CustomerName: {
      type: String,
      required: true,
      trim: true,
    },
    CustomerContact: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Invalid phone number"], 
    },
    DeliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    Products: {
      type: [ProductsSchema],
      required: true,
    },
    DeliveryMethod: {
      type: String,
      required: true,
      trim: true,
    },
    TrackingNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    CourierDetails: {
      type: String,
      trim: true,
    },
    PaymentStatus: {
      type: String,
      required: true,
      enum: ["Paid", "Unpaid"],
    },
    PaymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Credit Card", "PayPal", "Bank Transfer"],
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

export const Delivery = mongoose.model("Delivery", deliverySchema);
