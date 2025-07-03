
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockAssignments } from '../data/mockData';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    planogramId: '',
    storeName: '',
    storeCategory: '',
    lifecycleState: ''
  });

  const getLifecycleBadgeVariant = (state: string) => {
    switch (state) {
      case 'Executed': return 'default';
      case 'Planned': return 'secondary';
      case 'Prepared': return 'outline';
      case 'Phased Out': return 'destructive';
      default: return 'secondary';
    }
  };

  // Filter assignments based on current filters
  const filteredAssignments = mockAssignments.filter(assignment => {
    return (
      (!filters.planogramId || assignment.planogramId.toLowerCase().includes(filters.planogramId.toLowerCase()) || assignment.planogramName.toLowerCase().includes(filters.planogramId.toLowerCase())) &&
      (!filters.storeName || assignment.store.toLowerCase().includes(filters.storeName.toLowerCase())) &&
      (!filters.storeCategory || filters.storeCategory === '*' || assignment.storeCategory === filters.storeCategory) &&
      (!filters.lifecycleState || filters.lifecycleState === '*' || assignment.lifecycleState === filters.lifecycleState)
    );
  });

  const stats = {
    activeAssignments: mockAssignments.filter(a => a.lifecycleState === 'Executed').length,
    plannedAssignments: mockAssignments.filter(a => a.lifecycleState === 'Planned').length,
    preparedAssignments: mockAssignments.filter(a => a.lifecycleState === 'Prepared').length,
    phasedOutAssignments: mockAssignments.filter(a => a.lifecycleState === 'Phased Out').length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Planogram-Store Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeAssignments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Planned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.plannedAssignments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Prepared</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.preparedAssignments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Phased Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.phasedOutAssignments}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="planogram-filter">Planogram ID</Label>
                <Input
                  id="planogram-filter"
                  placeholder="Search planogram..."
                  value={filters.planogramId}
                  onChange={(e) => setFilters({...filters, planogramId: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="store-filter">Store Name</Label>
                <Input
                  id="store-filter"
                  placeholder="Search store..."
                  value={filters.storeName}
                  onChange={(e) => setFilters({...filters, storeName: e.target.value})}
                />
              </div>
              <div>
                <Label>Store Category</Label>
                <Select value={filters.storeCategory} onValueChange={(value) => setFilters({...filters, storeCategory: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="*">All categories</SelectItem>
                    <SelectItem value="Small">Small</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Large">Large</SelectItem>
                    <SelectItem value="Flagship">Flagship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Lifecycle State</Label>
                <Select value={filters.lifecycleState} onValueChange={(value) => setFilters({...filters, lifecycleState: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All states" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="*">All states</SelectItem>
                    <SelectItem value="Prepared">Prepared</SelectItem>
                    <SelectItem value="Planned">Planned</SelectItem>
                    <SelectItem value="Executed">Executed</SelectItem>
                    <SelectItem value="Phased Out">Phased Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setFilters({ planogramId: '', storeName: '', storeCategory: '', lifecycleState: '' })}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          {/* Main Grid */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                Planogram-Store Assignments 
                <Badge variant="outline" className="ml-2">
                  {filteredAssignments.length} of {mockAssignments.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Planogram</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.slice(0, 20).map((assignment) => (
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
                        <Link 
                          to={`/planograms/${assignment.planogramId}`}
                          className="text-blue-600 hover:underline"
                        >
                          <div>{assignment.planogramId}</div>
                          <div className="text-sm text-muted-foreground">{assignment.planogramName}</div>
                        </Link>
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
                        {assignment.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
