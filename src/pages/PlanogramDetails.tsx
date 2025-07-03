
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
import { ArrowLeft, Plus, Calendar, User, Building2 } from 'lucide-react';

const PlanogramDetails = () => {
  const { id } = useParams();
  const [selectedSizeVariant, setSelectedSizeVariant] = useState('M');

  // Mock planogram data
  const planogram = {
    id: 'P-12345',
    name: 'Summer Drinks Display',
    description: 'Optimized layout for summer beverage products featuring premium positioning for high-margin items.',
    createdDate: '2025-05-01',
    version: '2.1',
    sizeVariants: ['XS', 'S', 'M', 'L', 'XL'],
    lifecycle: 'Prepared',
    assignments: [
      {
        id: 1,
        storeName: 'Downtown Store',
        storeCategory: 'Medium',
        lifecycle: 'Executed',
        assignedBy: 'John Doe',
        assignedDate: '2025-06-01',
        startDate: '2025-06-15',
        endDate: '2025-09-15'
      },
      {
        id: 2,
        storeName: 'Mall Location',
        storeCategory: 'Large',
        lifecycle: 'Planned',
        assignedBy: 'Jane Smith',
        assignedDate: '2025-06-10',
        startDate: '2025-07-01',
        endDate: '2025-10-01'
      },
      {
        id: 3,
        storeName: 'Suburban Branch',
        storeCategory: 'Small',
        lifecycle: 'Prepared',
        assignedBy: 'Mike Johnson',
        assignedDate: '2025-06-05',
        startDate: '2025-07-15',
        endDate: '2025-10-15'
      }
    ]
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

        {/* Size Variant Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Size Variants & Store Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedSizeVariant} onValueChange={setSelectedSizeVariant}>
              <TabsList className="grid w-full grid-cols-5">
                {planogram.sizeVariants.map((size) => (
                  <TabsTrigger key={size} value={size}>
                    Size {size}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {planogram.sizeVariants.map((size) => (
                <TabsContent key={size} value={size}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Stores using Size {size}</h3>
                      <Badge variant="outline">
                        {planogram.assignments.length} assignments
                      </Badge>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Store Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Assigned By</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {planogram.assignments.map((assignment) => (
                          <TableRow key={assignment.id}>
                            <TableCell className="font-medium">
                              <Link 
                                to={`/stores/${assignment.id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {assignment.storeName}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{assignment.storeCategory}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getLifecycleBadgeVariant(assignment.lifecycle)}>
                                {assignment.lifecycle}
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
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanogramDetails;
