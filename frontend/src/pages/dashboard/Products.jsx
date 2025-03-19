import React, { useEffect, useState } from 'react'
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import CardImage from "../../assets/placeholder.png"
import useGetProducts from '@/hooks/useGetProducts'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/components/commen/Loading'
import toast from 'react-hot-toast'
import axios from 'axios'
import { PRODUCTS_API_END_POINT } from '@/utils/constants'
import { getRefresh } from '@/redux/productSlice'



function Products() {

  // variable or state in react
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    ProductId: "",
    ProductName: "",
    Category: "",
    Description: "",
    ProductImage: "",
    Quantity: "",
    ExpirationDate: "",
    CostPrice: "",
    SellingPrice: "",
    Notes: "",
    DateAdded: "",
    Warehouse: "",
    Status: "",
    SupplierName: "",
  })
  const [filters, setFilters] = useState({
    stockStatus: "All",
  })
  const [products, setProducts] = useState([]);
  const { allProducts } = useSelector((store) => store.product)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()


  // handle the changes or model 
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const openEditModal = (product) => {
    const formatDate = (dateString) => dateString ? new Date(dateString).toISOString().split("T")[0] : "";

    setFormData({
      ...product,
      ExpirationDate: formatDate(product.ExpirationDate),
      DateAdded: formatDate(product.DateAdded),
    });


    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      ProductId: "",
      ProductName: "",
      Category: "",
      Description: "",
      ProductImage: null,
      Quantity: "",
      ExpirationDate: "",
      CostPrice: "",
      SellingPrice: "",
      Notes: "",
      DateAdded: "",
      Warehouse: "",
      Status: "",
      SupplierName: "",
    })
  }



  // api calling
  useEffect(() => {
    if (allProducts?.AllProducts) {
      setProducts(allProducts.AllProducts);
    }
  }, [allProducts]);
  useGetProducts()


  // handle the form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);





    try {


      const res = await axios.post(
        `${PRODUCTS_API_END_POINT}/create-product`,
        {
          ProductId: formData.ProductId,
          ProductName: formData.ProductName,
          Category: formData.Category,
          Description: formData.Description,
          Quantity: formData.Quantity,
          ExpirationDate: formData.ExpirationDate ? new Date(formData.ExpirationDate).toISOString() : null,
          CostPrice: formData.CostPrice,
          SellingPrice: formData.SellingPrice,
          Notes: formData.Notes,
          DateAdded: formData.DateAdded ? new Date(formData.DateAdded).toISOString() : null,
          Warehouse: formData.Warehouse,
          Status: formData.Status,
          SupplierName: formData.SupplierName,
          ProductImage: formData.ProductImage,

        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(res);
      toast.success(res.data.message);
      console.log("🔍 Request Headers:", res.config.headers);
      // Update state only after success
      setProducts((prevProducts) => [...prevProducts, res.data.product]);
      setIsAddProductModalOpen(false);
      resetForm();
      dispatch(getRefresh())
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(`Error in handleSubmit: ${error}`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.patch(
        `${PRODUCTS_API_END_POINT}/update-product/${formData._id}`,
        formData, // Send updated product details
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("id", formData._id);

      console.log(res);
      toast.success(res.data.message);
      dispatch(getRefresh()); // Refresh product list from API
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(`Error in handleUpdate: ${error}`);
    } finally {
      setIsLoading(false);
      setIsEditModalOpen(false); // Close modal after update
      resetForm();
    }
  }

  const handleDelete = async (id, e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await axios.delete(
        `${PRODUCTS_API_END_POINT}/delete-product/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      toast.success(res.data.message);
      dispatch(getRefresh())
      // setProducts(products.filter((product) => product.ProductId !== id))

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(`Error in handleSubmit: ${error}`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setSelectedProduct(null)
  }


  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product?.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;

    let matchesStatus = true;
    if (filters.stockStatus !== "all") {
      if (filters.stockStatus === "Low Stock") {
        matchesStatus = product.Status === "Low Stock";
      } else if (filters.stockStatus === "Available") {
        matchesStatus = product.Status === "Available";
      } else if (filters.stockStatus === "Out of Stock") {
        matchesStatus = product.Status === "Out of Stock";
      }
    }

    return matchesSearch && matchesStatus;
  });


  // status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-500 hover:bg-green-600"
      case "Low Stock":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Out of Stock":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  // product card component
  function ProductCard({ product }) {

    return (
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <img src={product.ProductImage || CardImage} alt={product.ProductName} className="w-full h-48 object-cover" />
        </div>
        <CardHeader className="p-4 pb-0">
          <h3 className="text-lg font-semibold">{product.ProductName}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-muted-foreground">{product.Category}</p>
          <p className="text-lg font-bold mt-1">${product.CostPrice}</p>
          <Badge className={`mt-2 ${getStatusColor(product.Status)}`}>{product.Status}</Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button onClick={() => setSelectedProduct(product)}>View</Button>
          <Button variant="outline" onClick={() => openEditModal(product)}><Edit className="w-4 h-4" /></Button>
          <Button variant="destructive" onClick={(e) => handleDelete(product._id, e)}><Trash2 className="w-4 h-4" /></Button>
        </CardFooter>
      </Card>
    )
  }

  // ProductGrid Component
  function ProductGrid() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    )
  }

  // display more details of product component
  function ProductDetailsModal() {
    if (!selectedProduct) return null

    const formatDate = (dateString) =>
      dateString ? new Date(dateString).toISOString().split("T")[0] : "N/A";

    return (
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent aria-describedby="dialog-description" className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct.ProductName}</DialogTitle>
            <DialogDescription id="dialog-description">
              View product details
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="flex justify-center items-center">
                  <img className='w-32 h-32 object-cover rounded-lg' alt={selectedProduct.ProductName} src={selectedProduct.ProductImage} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Product Id</TableCell>
                <TableCell>{selectedProduct.ProductId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                <TableCell>{selectedProduct.Category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>{selectedProduct.Status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cost Price</TableCell>
                <TableCell>₹{Number(selectedProduct.CostPrice).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Selling Price</TableCell>
                <TableCell>₹{Number(selectedProduct.SellingPrice).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Supplier</TableCell>
                <TableCell>{selectedProduct.SupplierName || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Expiration Date</TableCell>
                <TableCell>{formatDate(selectedProduct.ExpirationDate)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stock Quantity</TableCell>
                <TableCell>{selectedProduct.Quantity || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Warehouse Location</TableCell>
                <TableCell>{selectedProduct.Warehouse || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Internal Notes</TableCell>
                <TableCell>{selectedProduct.Notes || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Date Added</TableCell>
                <TableCell>{formatDate(selectedProduct.DateAdded)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    )
  }


  return (

    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>
        {/* Search and Add Product */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <Button onClick={() => setIsAddProductModalOpen(true)} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
        </div>

        {/* add product */}
        <Dialog open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}>
          <DialogContent id="dialog-description" aria-describedby={selectedProduct ? "dialog-description" : undefined} className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription id="dialog-description">
                Add product details in the form below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ProductId">Product Id</Label>
                  <Input id="ProductId" name="ProductId" value={formData.ProductId} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ProductName">Product Name</Label>
                  <Input id="ProductName" name="ProductName" value={formData.ProductName} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Category">Category</Label>
                  <Input id="Category" name="Category" value={formData.Category} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Description">Description</Label>
                  <Input id="Description" name="Description" value={formData.Description} onChange={handleInputChange} />
                </div>

                {/* {image} */}
                <div className="grid gap-2">
                  <Label htmlFor="ProductImage">Product Image</Label>
                  <Input type="file" id="ProductImage" name="ProductImage" onChange={handleInputChange} accept="image/*" />
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="Quantity">Quantity</Label>
                  <Input type="Number" id="Quantity" name="Quantity" value={formData.Quantity} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ExpirationDate">Expiration Date</Label>
                  <Input type="date" id="ExpirationDate" name="ExpirationDate" value={formData.ExpirationDate} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="CostPrice">Cost Price</Label>
                  <Input type="Number" id="CostPrice" name="CostPrice" value={formData.CostPrice} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="SellingPrice">Selling Price</Label>
                  <Input type="Number" id="SellingPrice" name="SellingPrice" value={formData.SellingPrice} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Notes">Notes</Label>
                  <Textarea id="Notes" name="Notes" value={formData.Notes} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="DateAdded">Date Added</Label>
                  <Input type="date" id="DateAdded" name="DateAdded" value={formData.DateAdded} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Warehouse">Warehouse</Label>
                  <Input id="Warehouse" name="Warehouse" value={formData.Warehouse} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Status">Status</Label>
                  <Select value={formData.Status} onValueChange={(value) => handleSelectChange("Status", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="SupplierName">Supplier Name</Label>
                  <Input id="SupplierName" name="SupplierName" value={formData.SupplierName} onChange={handleInputChange} />
                </div>
              </div>
              <DialogFooter>
                {isLoading ? (<Button type="submit"><Loading color='#000' /></Button>) : (<Button type="submit">Add Product</Button>)}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={filters.stockStatus} onValueChange={(value) => handleFilterChange("stockStatus", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Stock Status</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* display product */}
        <ProductGrid />

        {/* display single product */}
        <ProductDetailsModal />

        {/* edit */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent id="dialog-description" aria-describedby={selectedProduct ? "dialog-description" : undefined} className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update product details and save changes.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ProductId">Product Id</Label>
                  <Input id="ProductId" name="ProductId" value={formData.ProductId} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ProductName">Product Name</Label>
                  <Input id="ProductName" name="ProductName" value={formData.ProductName} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Category">Category</Label>
                  <Input id="Category" name="Category" value={formData.Category} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Description">Description</Label>
                  <Input id="Description" name="Description" value={formData.Description} onChange={handleInputChange} />
                </div>

                {/* {image}
                <div className="grid gap-2">
                  <Label htmlFor="ProductImage">Product Image</Label>
                  <Input type="file" id="ProductImage" name="ProductImage" onChange={handleInputChange} accept="image/*" required />
                </div> */}


                <div className="grid gap-2">
                  <Label htmlFor="Quantity">Quantity</Label>
                  <Input type="Number" id="Quantity" name="Quantity" value={formData.Quantity} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ExpirationDate">Expiration Date</Label>
                  <Input type="date" id="ExpirationDate" name="ExpirationDate" value={formData.ExpirationDate} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="CostPrice">Cost Price</Label>
                  <Input type="Number" id="CostPrice" name="CostPrice" value={formData.CostPrice} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="SellingPrice">Selling Price</Label>
                  <Input type="Number" id="SellingPrice" name="SellingPrice" value={formData.SellingPrice} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Notes">Notes</Label>
                  <Textarea id="Notes" name="Notes" value={formData.Notes} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="DateAdded">Date Added</Label>
                  <Input type="date" id="DateAdded" name="DateAdded" value={formData.DateAdded} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Warehouse">Warehouse</Label>
                  <Input id="Warehouse" name="Warehouse" value={formData.Warehouse} onChange={handleInputChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.Status} onValueChange={(value) => handleSelectChange("Status", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="SupplierName">Supplier Name</Label>
                  <Input id="SupplierName" name="SupplierName" value={formData.SupplierName} onChange={handleInputChange} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={(e) => { e.preventDefault(); setIsEditModalOpen(false) }}>Cancel</Button>
                <Button onClick={handleUpdate}>Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>

  )
}

export default Products