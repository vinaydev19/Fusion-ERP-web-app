import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import CardImage from "../../assets/placeholder.png"


function Products() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState({
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
  const [filters, setFilters] = useState({
    stockStatus: "all",
  })
  const [products, setProducts] = useState([
    {
      ProductId: "1",
      ProductName: "Wireless Headphones",
      Category: "Electronics",
      Description: "High-quality sound wireless headphones.",
      ProductImage: CardImage,
      Quantity: "45",
      ExpirationDate: "2025-12-31",
      CostPrice: "100",
      SellingPrice: "149.99",
      Notes: "Best selling item in Q1",
      DateAdded: "2023-01-15",
      Warehouse: "Aisle A, Shelf 3",
      Status: "Available",
      SupplierName: "TechSupplies Inc.",
    },
  ]);


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

  const handleSubmit = (e) => {
    e.preventDefault()

    const newProduct = {
      ...formData,
      CostPrice: Number(formData.CostPrice),
      SellingPrice: Number(formData.SellingPrice),
      Quantity: Number(formData.Quantity),
      ProductImage: formData.ProductImage ? URL.createObjectURL(formData.ProductImage) : CardImage,
    }

    setProducts((prevProducts) => [...prevProducts, newProduct])
    setIsAddProductModalOpen(false)
    resetForm()
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.ProductId === formData.ProductId ? { ...formData } : product
      )
    )

    setIsEditModalOpen(false)
    resetForm()
  }

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.ProductId !== id))
    setSelectedProduct(null)
  }

  const openEditModal = (product) => {
    setFormData(product)
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

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;

    let matchesStatus = true;
    if (filters.stockStatus !== "all") {
      if (filters.stockStatus === "Low") {
        matchesStatus = product.Status === "Low Stock";
      } else if (filters.stockStatus === "Available") {
        matchesStatus = product.Status === "In Stock";
      } else if (filters.stockStatus === "Out") {
        matchesStatus = product.Status === "Out of Stock";
      }
    }

    return matchesSearch && matchesStatus;
  });


  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-500 hover:bg-green-600"
      case "Low":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Out":
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
          <Button variant="destructive" onClick={() => handleDelete(product.ProductId)}><Trash2 className="w-4 h-4" /></Button>
        </CardFooter>
      </Card>
    )
  }

  // ProductGrid Component
  function ProductGrid() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.ProductId} product={product} />
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

    return (
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct.ProductName}</DialogTitle>
          </DialogHeader>
          <Table>
            <TableBody>
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
                <TableCell>{selectedProduct.ExpirationDate || "N/A"}</TableCell>
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
                <TableCell>{selectedProduct.DateAdded || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                alert(`Update functionality for ${selectedProduct.name}`)
              }}
            >
              Update
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                alert(`Delete functionality for ${selectedProduct.name}`)
                setSelectedProduct(null)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
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
                  <Input id="Category" name="Category" value={formData.Category} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Description">Description</Label>
                  <Input id="Description" name="Description" value={formData.Description} onChange={handleInputChange} required />
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
                  <Input type="date" id="ExpirationDate" name="ExpirationDate" value={formData.ExpirationDate} onChange={handleInputChange} required />
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
                  <Textarea id="Notes" name="Notes" value={formData.Notes} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="DateAdded">Date Added</Label>
                  <Input type="date" id="DateAdded" name="DateAdded" value={formData.DateAdded} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Warehouse">Warehouse</Label>
                  <Input id="Warehouse" name="Warehouse" value={formData.Warehouse} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.Status} onValueChange={(value) => handleSelectChange("Status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low Stock</SelectItem>
                      <SelectItem value="Out">Out of Stock</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="SupplierName">Supplier Name</Label>
                  <Input id="SupplierName" name="SupplierName" value={formData.SupplierName} onChange={handleInputChange} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Product</Button>
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
              <SelectItem value="Low">Low Stock</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>


        {/* display product */}
        <ProductGrid />

        {/* display single product */}
        <ProductDetailsModal />

        {/* edit */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
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
                  <Input id="Category" name="Category" value={formData.Category} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Description">Description</Label>
                  <Input id="Description" name="Description" value={formData.Description} onChange={handleInputChange} required />
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
                  <Input type="date" id="ExpirationDate" name="ExpirationDate" value={formData.ExpirationDate} onChange={handleInputChange} required />
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
                  <Textarea id="Notes" name="Notes" value={formData.Notes} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="DateAdded">Date Added</Label>
                  <Input type="date" id="DateAdded" name="DateAdded" value={formData.DateAdded} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Warehouse">Warehouse</Label>
                  <Input id="Warehouse" name="Warehouse" value={formData.Warehouse} onChange={handleInputChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.Status} onValueChange={(value) => handleSelectChange("Status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low Stock</SelectItem>
                      <SelectItem value="Out">Out of Stock</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="SupplierName">Supplier Name</Label>
                  <Input id="SupplierName" name="SupplierName" value={formData.SupplierName} onChange={handleInputChange} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update Product</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </>

  )
}

export default Products