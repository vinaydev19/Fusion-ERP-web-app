import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/products.model.js";

const createProductItem = asyncHandler(async (req, res) => {
  console.log("create product");

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

  console.log(ProductId);

  if (
    [
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
    .Status(200)
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

  return res
    .status(200)
    .json(new ApiResponse(200, product, "fetch one product successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productMongodbId = req.params.productMongodbId;

  const product = await Product.findByIdAndDelete(productMongodbId);

  return res
    .status(200)
    .json(new ApiResponse(200, product, "fetch one product successfully"));
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

  const productImage = await Product.findByIdAndUpdate(
    productMongodbId,
    {
      $set: {
        productImage: cloudinaryProductImage.url,
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
  const productMongodbId = req.params.productMongodbId;

  const existingProduct = await Product.findById(productMongodbId);
  if (!existingProduct) {
    throw new ApiError(404, "Product not found");
  }

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

  const updatedFields = {};

  if (ProductId && ProductId !== existingProduct.ProductId)
    updatedFields.ProductId = ProductId;
  if (ProductName && ProductName !== existingProduct.ProductName)
    updatedFields.ProductName = ProductName;
  if (Category && Category !== existingProduct.Category)
    updatedFields.Category = Category;
  if (Description && Description !== existingProduct.Description)
    updatedFields.Description = Description;
  if (Quantity && Quantity !== existingProduct.Quantity)
    updatedFields.Quantity = Quantity;
  if (ExpirationDate && ExpirationDate !== existingProduct.ExpirationDate)
    updatedFields.ExpirationDate = ExpirationDate;
  if (CostPrice && CostPrice !== existingProduct.CostPrice)
    updatedFields.CostPrice = CostPrice;
  if (SellingPrice && SellingPrice !== existingProduct.SellingPrice)
    updatedFields.SellingPrice = SellingPrice;
  if (Notes && Notes !== existingProduct.Notes) updatedFields.Notes = Notes;
  if (DateAdded && DateAdded !== existingProduct.DateAdded)
    updatedFields.DateAdded = DateAdded;
  if (Warehouse && Warehouse !== existingProduct.Warehouse)
    updatedFields.Warehouse = Warehouse;
  if (Status && Status !== existingProduct.Status)
    updatedFields.Status = Status;
  if (SupplierName && SupplierName !== existingProduct.SupplierName)
    updatedFields.SupplierName = SupplierName;

  if (Object.keys(updatedFields).length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, existingProduct, "No changes detected"));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productMongodbId,
    { $set: updatedFields },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        "Product details updated successfully"
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
