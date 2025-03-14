import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Purchase } from "../models/purchaseOrders.model.js";

const createPurchaseItem = asyncHandler(async (req, res) => {

    const {
        PurchaseId,
        Supplier,
        Products,
        OrderDate,
        DeliveryDate,
        PaymentStatus,
        Notes,
    } = req.body;


    if (
        [
            PurchaseId,
            OrderDate,
            DeliveryDate,
            PaymentStatus,
        ].some((field) => !field || field.trim() === "") ||
        !Supplier || !Array.isArray(Supplier) ||
        Supplier.some(item => !item.SupplierId || !item.Name || !item.Contact || !item.Email || !item.Address === undefined) ||
        !Products || !Array.isArray(Products) ||
        Products.some(item => !item.ProductId || !item.ProductName || !item.Quantity || !item.UnitPrice || !item.TotalPrice === undefined)
    ) {
        throw new ApiError(400, "All fields are required");
    }


    const purchase = await Purchase.create({
        PurchaseId,
        Supplier,
        Products,
        OrderDate,
        DeliveryDate,
        PaymentStatus,
        Notes,
        userId: req.user._id,
    });

    if (!purchase) {
        throw new ApiError(500, "something want wrong while create purchase");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { purchase }, "purchase add successfully"));
});

const getAllPurchase = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const AllPurchases = await Purchase.find({ userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, { AllPurchases }, "fetch all Purchase successfully")
        );
});

const getOnePurchase = asyncHandler(async (req, res) => {
    const purchaseMongodbId = req.params.purchaseMongodbId;

    const purchase = await Purchase.findById(purchaseMongodbId);

    if (!purchase) {
        throw new ApiError(404, "purchase not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { purchase }, "Fetched purchase successfully"));
});

const deletePurchase = asyncHandler(async (req, res) => {
    const purchaseMongodbId = req.params.purchaseMongodbId;

    const purchase = await Purchase.findByIdAndDelete(purchaseMongodbId);

    if (!purchase) {
        throw new ApiError(404, "Purchase not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { purchase }, "fetch one purchase successfully"));
});

const updatePurchaseDetails = asyncHandler(async (req, res) => {
    const purchaseDocsId = req.params.purchaseMongodbId;
    const {
        PurchaseId,
        Supplier,
        Products,
        OrderDate,
        DeliveryDate,
        PaymentStatus,
        Notes,
    } = req.body;


    if (
        [
            PurchaseId,
            OrderDate,
            DeliveryDate,
            PaymentStatus,
        ].some((field) => !field || field.trim() === "") ||
        !Supplier || !Array.isArray(Supplier) ||
        Supplier.some(item => !item.SupplierId || !item.Name || !item.Contact || !item.Email || !item.Address === undefined) ||
        !Products || !Array.isArray(Products) ||
        Products.some(item => !item.ProductId || !item.ProductName || !item.Quantity || !item.UnitPrice || !item.TotalPrice === undefined)
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const updatePurchase = await Purchase.findByIdAndUpdate(
        purchaseDocsId,
        {
            $set: {
                PurchaseId,
                Supplier,
                Products,
                OrderDate,
                DeliveryDate,
                PaymentStatus,
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
                { updatePurchase },
                "purchase data are updated successfully"
            )
        );
});

export {
    createPurchaseItem,
    getAllPurchase,
    getOnePurchase,
    deletePurchase,
    updatePurchaseDetails,
};
