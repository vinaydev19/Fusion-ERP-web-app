import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Purchase } from "../models/purchaseOrders.model.js";

const createPurchaseItem = asyncHandler(async (req, res) => {

    const {
        purchaseId,
        supplier,
        products,
        orderDate,
        deliveryDate,
        paymentStatus,
        notes,
    } = req.body;


    if (
        [
            purchaseId,
            supplier,
            products,
            orderDate,
            deliveryDate,
            paymentStatus,
        ].some((field) => field === undefined || field === null || String(field).trim() === "") ||
        !supplier || !Array.isArray(supplier) ||
        supplier.some(item => !item.supplierId || !item.name || !item.contact || !item.email || !item.address === undefined) ||
        !products || !Array.isArray(products) ||
        products.some(item => !item.productMongodbId || !item.productId || !item.ProductName || !item.quantity || !item.sellingPrice || !item.totalPrice === undefined)
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const purchaseIdIsUnique = await Purchase.findOne({ purchaseId, userId: req.user._id })

    if (purchaseIdIsUnique) {
        throw new ApiError(401, "purchase Id must be unique")
    }

    const supplierIds = supplier.map((s) => s.supplierId);
    const existingSupplier = await Purchase.findOne({ "supplier.supplierId": { $in: supplierIds } });

    if (existingSupplier) {
        throw new ApiError(401, "Supplier ID must be unique");
    }

    const purchase = await Purchase.create({
        purchaseId,
        supplier,
        products,
        orderDate,
        deliveryDate,
        paymentStatus,
        notes,
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


const deletePurchase = asyncHandler(async (req, res) => {
    const purchaseMongodbId = req.params.purchaseMongodbId;

    const purchase = await Purchase.findByIdAndDelete(purchaseMongodbId);

    if (!purchase) {
        throw new ApiError(404, "Purchase not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "delect purchase successfully"));
});

const updatePurchaseDetails = asyncHandler(async (req, res) => {
    const purchaseDocsId = req.params.purchaseMongodbId;
    const {
        purchaseId,
        supplier,
        products,
        orderDate,
        deliveryDate,
        paymentStatus,
        notes,
    } = req.body;


    if (
        [
            purchaseId,
            supplier,
            products,
            orderDate,
            deliveryDate,
            paymentStatus,
        ].some((field) => field === undefined || field === null || String(field).trim() === "") ||
        !supplier || !Array.isArray(supplier) ||
        supplier.some(item => !item.supplierId || !item.name || !item.contact || !item.email || !item.address === undefined) ||
        !products || !Array.isArray(products) ||
        products.some(item => !item.productMongodbId || !item.productId || !item.ProductName || !item.quantity || !item.sellingPrice || !item.totalPrice === undefined)
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const updatePurchase = await Purchase.findByIdAndUpdate(
        purchaseDocsId,
        {
            $set: {
                purchaseId,
                supplier,
                products,
                orderDate,
                deliveryDate,
                paymentStatus,
                notes,
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
    deletePurchase,
    updatePurchaseDetails,
};
