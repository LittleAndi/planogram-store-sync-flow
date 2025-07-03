import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const LifecycleManagement = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [newLifecycleStatus, setNewLifecycleStatus] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      store: 'Downtown Store',
      storeCategory: 'Medium',
      planogramId: 'P-12345',
      planogramName: 'Summer Drinks',
      sizeVariant: 'M',
      currentLifecycle: 'Planned',
      lastUpdated: '2025-06-15',
      scheduledTransition: '2025-07-01'
    },
    {
      id: 2,
      store: 'Mall Location',
      storeCategory: 'Large',
      planogramId: 'P-12346',
      planogramName: 'Winter Fashion',
      sizeVariant: 'L',
      currentLifecycle: 'Prepared',
      lastUpdated: '2025-07-01',
      scheduledTransition: null
    },
    {
      id: 3,
      store: 'Airport Shop',
      storeCategory: 'Small',
      planogramId: 'P-12347',
      planogramName: 'Travel Essentials',
      sizeVariant: 'S',
      currentLifecycle: 'Executed',
      lastUpdated: '2025-05-20',
      scheduledTransition: '2025-08-15'
    }
  ];

  const getLifecycleBadgeVariant = (state: string) => {
    switch (state) {
      case 'Executed': return 'default';
      case 'Planned': return 'secondary';
      case 'Prepared': return 'outline';
      case 'Phased Out': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(assignments.map(a => a.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleBulkTransition = () => {
    console.log('Transitioning items:', selectedItems, 'to status:', newLifecycleStatus, 'on:', scheduledDate);
    // Here you would implement the actual transition logic
    setSelectedItems([]);
    setNewLifecycleStatus('');
    setScheduledDate('');
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
              <h1 className="text-3xl font-bold">Lifecycle Management</h1>
              <p className="text-muted-foreground">Manage planogram lifecycle transitions across stores</p>
            </div>
          </div>
        </div>

        {/* Bulk Actions Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="mr-2 h-5 w-5" />
              Bulk Lifecycle Transitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {selectedItems.length} selected
                </Badge>
              </div>
              
              <Select value={newLifecycleStatus} onValueChange={setNewLifecycleStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="New status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prepared">Prepared</SelectItem>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="Executed">Executed</SelectItem>
                  <SelectItem value="Phased Out">Phased Out</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-[150px]"
                  placeholder="Schedule date"
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    disabled={selectedItems.length === 0 || !newLifecycleStatus}
                    className="ml-auto"
                  >
                    Apply Transition
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Lifecycle Transition</DialogTitle>
                    <DialogDescription>
                      You are about to transition {selectedItems.length} planogram assignment(s) to "{newLifecycleStatus}" status
                      {scheduledDate && ` on ${scheduledDate}`}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Selected assignments:</p>
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {assignments
                          .filter(a => selectedItems.includes(a.id))
                          .map(assignment => (
                            <div key={assignment.id} className="text-sm text-muted-foreground p-2 bg-muted rounded">
                              {assignment.store} - {assignment.planogramName} ({assignment.sizeVariant})
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleBulkTransition}>Confirm Transition</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Assignments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Planogram Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === assignments.length}
                      onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                    />
                  </TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Planogram</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Current Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Scheduled Transition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(assignment.id)}
                        onCheckedChange={(checked: boolean) => handleSelectItem(assignment.id, checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link 
                        to={`/stores/${assignment.id}`}
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
                      <Badge variant={getLifecycleBadgeVariant(assignment.currentLifecycle)}>
                        {assignment.currentLifecycle}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {assignment.lastUpdated}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {assignment.scheduledTransition ? (
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {assignment.scheduledTransition}
                        </div>
                      ) : (
                        'Not scheduled'
                      )}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Quick Transition
                      </Button>
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
              <div className="text-2xl font-bold text-blue-600">
                {assignments.filter(a => a.currentLifecycle === 'Prepared').length}
              </div>
              <p className="text-xs text-muted-foreground">Ready to Plan</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {assignments.filter(a => a.currentLifecycle === 'Planned').length}
              </div>
              <p className="text-xs text-muted-foreground">Ready to Execute</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {assignments.filter(a => a.currentLifecycle === 'Executed').length}
              </div>
              <p className="text-xs text-muted-foreground">Currently Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">
                {assignments.filter(a => a.scheduledTransition).length}
              </div>
              <p className="text-xs text-muted-foreground">Scheduled Transitions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LifecycleManagement;
