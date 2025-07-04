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
import { ArrowLeft, Plus, Calendar, User, Building2, Package, DollarSign, Ruler, MapPin } from 'lucide-react';
import { mockPlanograms, mockAssignments, mockStores, mockProductPositions } from '../data/mockData';

const PlanogramDetails = () => {
  const { id } = useParams();

  // Find the planogram by ID
  const planogram = mockPlanograms.find(p => p.id === id) || mockPlanograms[0];
  
  // Get assignments for this planogram
  const planogramAssignments = mockAssignments.filter(a => a.planogramId === planogram.id);
  
  // Get product positions for this planogram
  const planogramPositions = mockProductPositions.filter(p => p.planogramId === planogram.id);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Live': return 'default';
      case 'Pending': return 'secondary';
      case 'Other': return 'outline';
      case 'Historic': return 'destructive';
      default: return 'secondary';
    }
  };

  const getLifecycleBadgeVariant = (state: string) => {
    switch (state) {
      case 'Executed': return 'default';
      case 'Planned': return 'secondary';
      case 'Prepared': return 'outline';
      case 'Phased Out': return 'destructive';
      default: return 'secondary';
    }
  };

  const getMerchandisingStyleBadgeVariant = (style: string) => {
    switch (style) {
      case 'Unit': return 'default';
      case 'Case': return 'secondary';
      case 'Tray': return 'outline';
      case 'Display': return 'destructive';
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
              <p className="text-muted-foreground">ID: {planogram.id} | Version: {planogram.version}</p>
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
                  <p className="text-sm font-medium">Effective Period</p>
                  <p className="text-sm text-muted-foreground">
                    {planogram.effectiveDateFrom} to {planogram.effectiveDateTo}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Category & Size</p>
                  <p className="text-sm text-muted-foreground">{planogram.category} - {planogram.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={getStatusBadgeVariant(planogram.status)}>{planogram.status}</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Dimensions (cm)</p>
                  <p className="text-sm text-muted-foreground">
                    {planogram.width} × {planogram.height} × {planogram.depth}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium mb-2">Shelf Information</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Shelf ID: {planogram.shelfId}</p>
                  <p>Location ID: {planogram.shelfLocationId}</p>
                  <p>Position: X:{planogram.shelfX}, Y:{planogram.shelfY}, Z:{planogram.shelfZ}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Attributes</p>
                <div className="flex flex-wrap gap-1">
                  {planogram.attributes.slice(0, 6).map((attr, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {attr.description}: {attr.value}
                    </Badge>
                  ))}
                  {planogram.attributes.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{planogram.attributes.length - 6} more
                    </Badge>
                  )}
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
            <TabsTrigger value="positions">Positions</TabsTrigger>
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
                    {planogramPositions.length} Positions
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
                      <p className="text-2xl font-bold">{planogramPositions.length}</p>
                      <p className="text-sm text-muted-foreground">Product Positions</p>
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
                        ${planogramPositions.reduce((sum, position) => sum + position.productPrice, 0).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Product Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>All Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {planogram.attributes.map((attr, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="text-sm font-medium">{attr.description}</p>
                      <p className="text-sm text-muted-foreground">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Positions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  All product positions and their specifications within this planogram
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Merchandising Style</TableHead>
                      <TableHead>Facings (H×V×D)</TableHead>
                      <TableHead>Dimensions (W×D×H)</TableHead>
                      <TableHead>Location (X,Y,Z)</TableHead>
                      <TableHead>Linear</TableHead>
                      <TableHead>Replenishment</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planogramPositions.map((position) => (
                      <TableRow key={position.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-medium">{position.productName}</p>
                            <p className="text-sm text-muted-foreground">{position.productSku}</p>
                          </div>
                        </TableCell>
                        <TableCell>{position.productBrand}</TableCell>
                        <TableCell>
                          <Badge variant={getMerchandisingStyleBadgeVariant(position.merchandisingStyle)}>
                            {position.merchandisingStyle}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {position.horizontalFacings}×{position.verticalFacings}×{position.depthFacings}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {position.width}×{position.depth}×{position.height}cm
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {position.locationX},{position.locationY},{position.locationZ}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {position.linear}cm
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {position.replenishmentMin}-{position.replenishmentMax}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${position.productPrice.toFixed(2)}
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
