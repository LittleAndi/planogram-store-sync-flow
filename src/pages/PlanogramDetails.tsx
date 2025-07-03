
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowLeft, Plus, Calendar, User, Building2, Package, DollarSign } from 'lucide-react';
import { mockPlanograms, mockAssignments, mockStores, mockProducts } from '../data/mockData';

const PlanogramDetails = () => {
  const { id } = useParams();

  // Find the planogram by ID
  const planogram = mockPlanograms.find(p => p.id === id) || mockPlanograms[0];
  
  // Get assignments for this planogram
  const planogramAssignments = mockAssignments.filter(a => a.planogramId === planogram.id);
  
  // Get products for this planogram
  const planogramProducts = mockProducts.filter(p => planogram.productIds.includes(p.id));

  const getLifecycleBadgeVariant = (state: string) => {
    switch (state) {
      case 'Executed': return 'default';
      case 'Planned': return 'secondary';
      case 'Prepared': return 'outline';
      case 'Phased Out': return 'destructive';
      default: return 'secondary';
    }
  };

  const getDisplayTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'unit': return 'default';
      case 'case': return 'secondary';
      case 'tray': return 'outline';
      case 'display': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{planogram.name}</h1>
              <p className="text-muted-foreground">ID: {planogram.id}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Assign to Store
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Planogram to Store</DialogTitle>
                  <DialogDescription>
                    Select stores to assign this planogram to.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">Store selection interface would go here...</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Assign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Planogram Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Planogram Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">{planogram.createdDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Version</p>
                  <p className="text-sm text-muted-foreground">{planogram.version}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline">{planogram.lifecycle}</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium">Size Variants</p>
                  <div className="flex space-x-1 mt-1">
                    {planogram.sizeVariants.map((size) => (
                      <Badge key={size} variant="secondary" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Description</p>
              <p className="text-sm text-muted-foreground">{planogram.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="assignments">Store Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Planogram Image */}
            <Card>
              <CardHeader>
                <CardTitle>Planogram Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img 
                    src={planogram.imageUrl} 
                    alt={`${planogram.name} layout`}
                    className="w-full h-96 object-cover rounded-lg border"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                    {planogramProducts.length} Products
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{planogramProducts.length}</p>
                      <p className="text-sm text-muted-foreground">Total Products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{planogramAssignments.length}</p>
                      <p className="text-sm text-muted-foreground">Store Assignments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        ${planogramProducts.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Product Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product List</CardTitle>
                <p className="text-sm text-muted-foreground">
                  All products included in this planogram
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Display Type</TableHead>
                      <TableHead>Shelf Position</TableHead>
                      <TableHead>Facings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planogramProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {product.sku}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${product.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getDisplayTypeBadgeVariant(product.displayType)}>
                            {product.displayType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          Shelf {product.shelfPosition.shelf}, Pos {product.shelfPosition.position}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {product.shelfPosition.facings}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Assignments</CardTitle>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Stores using this planogram
                  </p>
                  <Badge variant="outline">
                    {planogramAssignments.length} assignments
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size Variant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned By</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planogramAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          <Link 
                            to={`/stores/${assignment.storeId}`}
                            className="text-blue-600 hover:underline"
                          >
                            {assignment.store}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.storeCategory}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{assignment.sizeVariant}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getLifecycleBadgeVariant(assignment.lifecycleState)}>
                            {assignment.lifecycleState}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User className="mr-1 h-3 w-3" />
                            {assignment.assignedBy}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {assignment.startDate}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {assignment.endDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlanogramDetails;
