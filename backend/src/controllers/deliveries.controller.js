import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Delivery } from "../models/deliveries.model.js";


const createDeliveryProductItem = asyncHandler(async (req, res) => {

    const {
        DeliveryId,
        OrderNumber,
        CustomerName,
        CustomerContact,
        DeliveryAddress,
        Products,
        DeliveryMethod,
        TrackingNumber,
        CourierDetails,
        PaymentStatus,
        PaymentMethod,
        Notes,
    } = req.body;


    if (
        [
            DeliveryId,
            OrderNumber,
            CustomerName,
            CustomerContact,
            DeliveryAddress,
            DeliveryMethod,
            TrackingNumber,
            CourierDetails,
            PaymentStatus,
            PaymentMethod,
            Notes,
        ].some((field) => field === undefined || field === null || String(field).trim() === "") ||
        !Products || !Array.isArray(Products) ||
        Products.some((product) => !product.ProductId || !product.ProductName || !product.Quantity || !product.UnitPrice || !product.TotalPrice)
    ) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const deliveryIdIsUnique = await Delivery.findOne({ DeliveryId })

    if (deliveryIdIsUnique) {
        throw new ApiError(401, "Delivery Id must be unique")
    }

    
    const productIds = Products.map((p) => p.ProductId);
    const existingProductId = await Delivery.findOne({ "Products.ProductId": { $in: productIds } });

    if (existingProductId) {
        throw new ApiError(401, "Supplier ID must be unique");
    }

    const delivery = await Delivery.create({
        DeliveryId,
        OrderNumber,
        CustomerName,
        CustomerContact,
        DeliveryAddress,
        Products,
        DeliveryMethod,
        TrackingNumber,
        CourierDetails,
        PaymentStatus,
        PaymentMethod,
        Notes,
        userId: req.user._id,
    });

    if (!delivery) {
        throw new ApiError(500, "Something went wrong while creating delivery");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { delivery }, "Delivery added successfully"));
});

const getAllDeliveryProduct = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const AllDeliverys = await Delivery.find({ userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, { AllDeliverys }, "Fetched all deliveries successfully")
        );
});

const getOneDeliveryProduct = asyncHandler(async (req, res) => {
    const deliveryMongodbId = req.params.deliveryMongodbId;

    const delivery = await Delivery.findById(deliveryMongodbId);

    if (!delivery) {
        throw new ApiError(404, "Delivery not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { delivery }, "Fetched one delivery successfully"));
});

const deleteDeliveryProduct = asyncHandler(async (req, res) => {
    const deliveryMongodbId = req.params.deliveryMongodbId;

    const delivery = await Delivery.findByIdAndDelete(deliveryMongodbId);

    if (!delivery) {
        throw new ApiError(404, "Delivery not found");
    }


    return res
        .status(200)
        .json(new ApiResponse(200, delivery, "Delivery deleted successfully"));
});

const updateDeliveryProductDetails = asyncHandler(async (req, res) => {
    const deliveryDocsId = req.params.deliveryMongodbId;
    const {
        DeliveryId,
        OrderNumber,
        CustomerName,
        CustomerContact,
        DeliveryAddress,
        Products,
        DeliveryMethod,
        TrackingNumber,
        CourierDetails,
        PaymentStatus,
        PaymentMethod,
        Notes,
    } = req.body;

    if (
        [
            DeliveryId,
            OrderNumber,
            CustomerName,
            CustomerContact,
            DeliveryAddress,
            DeliveryMethod,
            TrackingNumber,
            CourierDetails,
            PaymentStatus,
            PaymentMethod,
            Notes,
        ].some((field) => !field || field.trim() === "") ||
        !Products || !Array.isArray(Products) ||
        Products.some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All required fields must be provided");
    }


    const updateDelivery = await Delivery.findByIdAndUpdate(
        deliveryDocsId,
        {
            $set: {
                DeliveryId,
                OrderNumber,
                CustomerName,
                CustomerContact,
                DeliveryAddress,
                Products,
                DeliveryMethod,
                TrackingNumber,
                CourierDetails,
                PaymentStatus,
                PaymentMethod,
                Notes,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { updateDelivery },
                "Delivery data are updated successfully"
            )
        );
});

export {
    createDeliveryProductItem,
    getAllDeliveryProduct,
    getOneDeliveryProduct,
    deleteDeliveryProduct,
    updateDeliveryProductDetails,
};
