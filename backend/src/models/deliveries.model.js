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

const deliverySchema = new mongoose.Schema(
  {
    DeliveryId: {
      type: String,
      required: true,
    },
    OrderNumber: {
      type: String,
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
    },
    CustomerContact: {
      type: String,
      required: true,
    },
    DeliveryAddress: {
      type: String,
      required: true,
    },
    Products: {
      type: [ProductsSchema],
    },
    DeliveryMethod: {
      type: String,
      required: true,
    },
    TrackingNumber: {
      type: String,
      required: true,
    },
    CourierDetails: {
      type: String,
    },
    PaymentStatus: {
      type: String, // Paid, Unpaid
      required: true,
    },
    PaymentMethod: {
      type: String,
      required: true,
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

export const Delivery = mongoose.model("Delivery", deliverySchema);
