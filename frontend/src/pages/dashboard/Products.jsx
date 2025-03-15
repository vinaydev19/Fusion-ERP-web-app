import React, { useState } from 'react'
import { Download, Upload, Search, Plus } from "lucide-react"
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
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card className="overflow-hidden">
            <div className="relative h-48 w-full">
              <img src={CardImage} className="object-cover w-full h-full" />
            </div>
            <CardHeader className="p-4 pb-0">
              <h3 className="text-lg font-semibold">Wireless Headphones</h3>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-muted-foreground">Electronics</p>
              <p className="text-lg font-bold mt-1">5465</p>
              <Badge className={`mt-2`}>In Stock</Badge>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">
                View More
              </Button>
            </CardFooter>
          </Card>
        </div> 
      </div>
    </>

  )
}

export default Products