
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, MapPin, Building2, Calendar, Plus } from 'lucide-react';

const StoreDetails = () => {
  const { id } = useParams();

  // Mock store data
  const store = {
    id: 'S-001',
    name: 'Downtown Store',
    category: 'Medium',
    region: 'North Region',
    address: '123 Main Street, Downtown City',
    manager: 'Sarah Johnson',
    openDate: '2020-03-15',
    planograms: [
      {
        id: 'P-12345',
        name: 'Summer Drinks Display',
        sizeVariant: 'M',
        lifecycle: 'Executed',
        startDate: '2025-06-15',
        endDate: '2025-09-15',
        assignedBy: 'John Doe'
      },
      {
        id: 'P-12346',
        name: 'Winter Fashion Layout',
        sizeVariant: 'M',
        lifecycle: 'Planned',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        assignedBy: 'Jane Smith'
      },
      {
        id: 'P-12347',
        name: 'Electronics Corner',
        sizeVariant: 'S',
        lifecycle: 'Phased Out',
        startDate: '2025-03-01',
        endDate: '2025-05-31',
        assignedBy: 'Mike Johnson'
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
              <h1 className="text-3xl font-bold">{store.name}</h1>
              <p className="text-muted-foreground">ID: {store.id}</p>
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Assign Planogram
          </Button>
        </div>

        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <Badge variant="outline">{store.category}</Badge>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Region</p>
                  <p className="text-sm text-muted-foreground">{store.region}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Opened</p>
                  <p className="text-sm text-muted-foreground">{store.openDate}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{store.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Store Manager</p>
                <p className="text-sm text-muted-foreground">{store.manager}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Planograms */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Assigned Planograms</CardTitle>
              <Badge variant="outline">
                {store.planograms.length} planograms
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Planogram</TableHead>
                  <TableHead>Size Variant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Assigned By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {store.planograms.map((planogram) => (
                  <TableRow key={planogram.id}>
                    <TableCell className="font-medium">
                      <Link 
                        to={`/planograms/${planogram.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <div>{planogram.id}</div>
                        <div className="text-sm text-muted-foreground">{planogram.name}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{planogram.sizeVariant}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getLifecycleBadgeVariant(planogram.lifecycle)}>
                        {planogram.lifecycle}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {planogram.startDate}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {planogram.endDate}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {planogram.assignedBy}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Replace
                        </Button>
                        <Button size="sm" variant="outline">
                          Phase Out
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {store.planograms.filter(p => p.lifecycle === 'Executed').length}
              </div>
              <p className="text-xs text-muted-foreground">Active Planograms</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {store.planograms.filter(p => p.lifecycle === 'Planned').length}
              </div>
              <p className="text-xs text-muted-foreground">Planned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {store.planograms.filter(p => p.lifecycle === 'Prepared').length}
              </div>
              <p className="text-xs text-muted-foreground">Prepared</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">
                {store.planograms.filter(p => p.lifecycle === 'Phased Out').length}
              </div>
              <p className="text-xs text-muted-foreground">Phased Out</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
