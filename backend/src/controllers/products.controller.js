import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/products.model.js";

const createProductItem = asyncHandler(async (req, res) => {

  const {
    ProductId,
    ProductName,
    Category,
    Description,
    Quantity,
    ExpirationDate,
    CostPrice,
    SellingPrice,
    Notes,
    DateAdded,
    Warehouse,
    Status,
    SupplierName,
  } = req.body;


  if (
    [
      ProductId,
      ProductName,
      Quantity,
      CostPrice,
      SellingPrice,
    ].some((field) => field.trim() === "")
  ) {
    throw new ApiError("All field are required");
  }

  const ProductImageLocalPath = req.file?.path;

  const ProductImageCloudinary = await uploadOnCloudinary(
    ProductImageLocalPath
  );

  if (!ProductImageCloudinary) {
    throw new ApiError(500, "something want wrong while upload the image");
  }

  const product = await Product.create({
    ProductId,
    ProductName,
    Category,
    Description,
    Quantity,
    ExpirationDate,
    CostPrice,
    SellingPrice,
    Notes,
    DateAdded,
    Warehouse,
    Status,
    SupplierName,
    ProductImage: ProductImageCloudinary.url,
    userId: req.user._id,
  });

  if (!product) {
    throw new ApiError(500, "something want wrong while create product");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "product add successfully"));
});

const getAllProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const AllProducts = await Product.find({ userId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { AllProducts }, "fetch all products successfully")
    );
});

const getOneProduct = asyncHandler(async (req, res) => {
  const productMongodbId = req.params.productMongodbId;

  const product = await Product.findById(productMongodbId);

  if (!product) {
    throw new ApiError(404, "product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "fetch one product successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productMongodbId = req.params.productMongodbId;

  const product = await Product.findByIdAndDelete(productMongodbId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }


  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

const updateProductImage = asyncHandler(async (req, res) => {
  const productImageLocalPath = req.file?.path;
  const productMongodbId = req.params.productMongodbId;

  if (!productImageLocalPath) {
    throw new ApiError(403, "profile Pic is required");
  }

  const cloudinaryProductImage = await uploadOnCloudinary(
    productImageLocalPath
  );

  if (!cloudinaryProductImage) {
    throw new ApiError(403, "something want wrong while upload profile Pic");
  }

  const product = await Product.findById(productMongodbId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  console.log(cloudinaryProductImage);
  console.log(cloudinaryProductImage.url);

  const productImage = await Product.findByIdAndUpdate(
    productMongodbId,
    {
      $set: {
        ProductImage: cloudinaryProductImage.url,
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
        { productImage },
        "product image is update successfully"
      )
    );
});

const updateProductDetails = asyncHandler(async (req, res) => {
  const productDocsId = req.params.productMongodbId;
  const {
    ProductId,
    ProductName,
    Category,
    Description,
    Quantity,
    ExpirationDate,
    CostPrice,
    SellingPrice,
    Notes,
    DateAdded,
    Warehouse,
    Status,
    SupplierName,
  } = req.body;

  if (
    [
      ProductId,
      ProductName,
      Quantity,
      CostPrice,
      SellingPrice,
    ].every(
      (field) => field === undefined || field === null || field.trim() === ""
    )
  ) {
    throw new ApiError(403, "At least one field is required to update");
  }

  const updateProduct = await Product.findByIdAndUpdate(
    productDocsId,
    {
      $set: {
        ProductId,
        ProductName,
        Category,
        Description,
        Quantity,
        ExpirationDate,
        CostPrice,
        SellingPrice,
        Notes,
        DateAdded,
        Warehouse,
        Status,
        SupplierName,
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
        { updateProduct },
        "product data are updated successfully"
      )
    );
});

export {
  createProductItem,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  updateProductDetails,
  updateProductImage,
};
