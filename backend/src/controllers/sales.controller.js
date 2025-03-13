import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Sale } from "../models/sales.model.js";

const createSaleItem = asyncHandler(async (req, res) => {

    const {
        saleId,
        saleItem,
        sellingPrice,
        quantity,
        totalAmount,
        paymentStatus,
        invoice,
        notes,
        salesDate,
        customerName,
    } = req.body;


    if (
        [
            saleId,
            saleItem,
            sellingPrice,
            quantity,
            totalAmount,
            paymentStatus,
            salesDate
        ].some((field) => field.trim() === "")
    ) {
        throw new ApiError("All field are required");
    }



    const sale = await Sale.create({
        saleId,
        saleItem,
        sellingPrice,
        quantity,
        totalAmount,
        paymentStatus,
        invoice,
        notes,
        salesDate,
        customerName,
        userId: req.user._id,
    });

    if (!sale) {
        throw new ApiError(500, "something want wrong while create sale");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { sale }, "sale add successfully"));
});

const getAllSale = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const AllSales = await Sale.find({ userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, { AllSales }, "fetch all sales successfully")
        );
});

const getOneSale = asyncHandler(async (req, res) => {
    const saleMongodbId = req.params.saleMongodbId;

    const sale = await Sale.findOne(saleMongodbId);

    if (!sale) {
        throw new ApiError(401, "sale not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { sale }, "fetch one sale successfully"));
});

const deleteSale = asyncHandler(async (req, res) => {
    const saleMongodbId = req.params.saleMongodbId;

    const sale = await Sale.findByIdAndDelete(saleMongodbId);

    console.log(sale);

    return res
        .status(200)
        .json(new ApiResponse(200, sale, "fetch one sale successfully"));
});

const updateSaleDetails = asyncHandler(async (req, res) => {
    const saleDocsId = req.params.saleMongodbId;
    const {
        saleId,
        saleItem,
        sellingPrice,
        quantity,
        totalAmount,
        paymentStatus,
        invoice,
        notes,
        salesDate,
        customerName,
    } = req.body;

    if (
        [
            saleId,
            saleItem,
            sellingPrice,
            quantity,
            totalAmount,
            paymentStatus,
            salesDate
        ].every(
            (field) => field === undefined || field === null || field.trim() === ""
        )
    ) {
        throw new ApiError(403, "At least one field is required to update");
    }

    const updateSale = await Sale.findByIdAndUpdate(
        saleDocsId,
        {
            $set: {
                saleId,
                saleItem,
                sellingPrice,
                quantity,
                totalAmount,
                paymentStatus,
                invoice,
                notes,
                salesDate,
                customerName,
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
                { updateSale },
                "sale data updated successfully"
            )
        );
});

export {
    createSaleItem,
    getAllSale,
    getOneSale,
    deleteSale,
    updateSaleDetails
};
