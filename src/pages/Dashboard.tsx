
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
import { Plus, Filter, Eye, Edit, Trash2, BarChart3, TrendingUp, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockAssignments, mockStores, mockPlanograms } from '../data/mockData';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    planogramId: '',
    storeName: '',
    storeCategory: '',
    lifecycleState: 'Executed'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Pagination logic
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssignments = filteredAssignments.slice(startIndex, endIndex);

  const stats = {
    totalStores: mockStores.length,
    totalPlanograms: mockPlanograms.length,
    totalAssignments: mockAssignments.length,
    activeAssignments: mockAssignments.filter(a => a.lifecycleState === 'Executed').length,
    plannedAssignments: mockAssignments.filter(a => a.lifecycleState === 'Planned').length,
    preparedAssignments: mockAssignments.filter(a => a.lifecycleState === 'Prepared').length,
    phasedOutAssignments: mockAssignments.filter(a => a.lifecycleState === 'Phased Out').length,
  };

  // Recent activity (last 10 assignments by date)
  const recentActivity = [...mockAssignments]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage planogram-store assignments across your retail network</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                Active Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeAssignments}</div>
              <p className="text-xs text-muted-foreground">Currently executing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                Planned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.plannedAssignments}</div>
              <p className="text-xs text-muted-foreground">Ready for deployment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Prepared</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.preparedAssignments}</div>
              <p className="text-xs text-muted-foreground">In preparation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Phased Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.phasedOutAssignments}</div>
              <p className="text-xs text-muted-foreground">Completed lifecycle</p>
            </CardContent>
          </Card>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Network Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Stores</span>
                <span className="font-medium">{stats.totalStores}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Planograms</span>
                <span className="font-medium">{stats.totalPlanograms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Assignments</span>
                <span className="font-medium">{stats.totalAssignments}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex items-center space-x-2 text-sm">
                    <Badge variant={getLifecycleBadgeVariant(activity.lifecycleState)} className="text-xs">
                      {activity.lifecycleState}
                    </Badge>
                    <span className="truncate flex-1">{activity.store}</span>
                    <span className="text-muted-foreground text-xs">{activity.lastUpdated}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Link to="/lifecycle" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Lifecycle Management
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Table with Improved Filtering */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Assignment Management
                <Badge variant="outline" className="ml-2">
                  {filteredAssignments.length} of {mockAssignments.length}
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {/* Compact Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div>
                <Input
                  placeholder="Search planogram..."
                  value={filters.planogramId}
                  onChange={(e) => setFilters({...filters, planogramId: e.target.value})}
                />
              </div>
              <div>
                <Input
                  placeholder="Search store..."
                  value={filters.storeName}
                  onChange={(e) => setFilters({...filters, storeName: e.target.value})}
                />
              </div>
              <div>
                <Select value={filters.storeCategory} onValueChange={(value) => setFilters({...filters, storeCategory: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
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
                <Select value={filters.lifecycleState} onValueChange={(value) => setFilters({...filters, lifecycleState: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
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
              <div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setFilters({ planogramId: '', storeName: '', storeCategory: '', lifecycleState: '' });
                    setCurrentPage(1);
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Table */}
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
                {currentAssignments.map((assignment) => (
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
                        <div className="text-sm text-muted-foreground truncate max-w-[150px]">{assignment.planogramName}</div>
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
                      <div className="flex space-x-1">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNum);
                            }}
                            isActive={currentPage === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                
                <div className="text-center mt-2 text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAssignments.length)} of {filteredAssignments.length} assignments
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
