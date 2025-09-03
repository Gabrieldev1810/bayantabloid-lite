import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, Search, Users, Calendar } from 'lucide-react';

interface Committee {
  id: number;
  name: string;
  description: string;
  chairman: string;
  members: string[];
  meetingSchedule: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const AdminCommittees = () => {
  const [committees, setCommittees] = useState<Committee[]>([
    {
      id: 1,
      name: "Committee on Finance and Appropriations",
      description: "Responsible for reviewing municipal budget and financial matters",
      chairman: "Hon. Juan dela Cruz",
      members: ["Hon. Maria Santos", "Hon. Jose Garcia", "Hon. Anna Reyes"],
      meetingSchedule: "Every 2nd Tuesday of the month",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Committee on Health and Social Services", 
      description: "Oversees health programs and social welfare initiatives",
      chairman: "Hon. Anna Reyes",
      members: ["Hon. Roberto Martinez", "Hon. Sofia Lopez"],
      meetingSchedule: "Every last Friday of the month",
      status: "active",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Committee on Infrastructure Development",
      description: "Manages public works and infrastructure projects",
      chairman: "Hon. Roberto Martinez",
      members: ["Hon. Juan dela Cruz", "Hon. Carlos Villanueva"],
      meetingSchedule: "Every 3rd Monday of the month",
      status: "active",
      createdAt: "2024-01-08"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<Committee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    chairman: '',
    members: '',
    meetingSchedule: '',
    status: 'active' as 'active' | 'inactive'
  });

  const filteredCommittees = committees.filter(committee =>
    committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    committee.chairman.toLowerCase().includes(searchTerm.toLowerCase()) ||
    committee.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCommittee) {
      setCommittees(committees.map(committee => 
        committee.id === editingCommittee.id 
          ? {
              ...committee,
              ...formData,
              members: formData.members.split(',').map(m => m.trim()).filter(m => m)
            }
          : committee
      ));
    } else {
      const newCommittee: Committee = {
        id: Date.now(),
        ...formData,
        members: formData.members.split(',').map(m => m.trim()).filter(m => m),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCommittees([...committees, newCommittee]);
    }
    
    setIsDialogOpen(false);
    setEditingCommittee(null);
    setFormData({
      name: '',
      description: '',
      chairman: '',
      members: '',
      meetingSchedule: '',
      status: 'active'
    });
  };

  const handleEdit = (committee: Committee) => {
    setEditingCommittee(committee);
    setFormData({
      name: committee.name,
      description: committee.description,
      chairman: committee.chairman,
      members: committee.members.join(', '),
      meetingSchedule: committee.meetingSchedule,
      status: committee.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCommittees(committees.filter(committee => committee.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Committee Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage municipal committees and their members
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingCommittee(null);
                setFormData({
                  name: '',
                  description: '',
                  chairman: '',
                  members: '',
                  meetingSchedule: '',
                  status: 'active'
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Committee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingCommittee ? 'Edit Committee' : 'Add New Committee'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Committee Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="chairman">Committee Chairman</Label>
                  <Input
                    id="chairman"
                    value={formData.chairman}
                    onChange={(e) => setFormData({ ...formData, chairman: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="members">Committee Members (comma-separated)</Label>
                  <Textarea
                    id="members"
                    value={formData.members}
                    onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                    placeholder="Hon. John Doe, Hon. Jane Smith, etc."
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor="meetingSchedule">Meeting Schedule</Label>
                  <Input
                    id="meetingSchedule"
                    value={formData.meetingSchedule}
                    onChange={(e) => setFormData({ ...formData, meetingSchedule: e.target.value })}
                    placeholder="Every 2nd Tuesday of the month"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCommittee ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search committees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Committees List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCommittees.map((committee) => (
          <Card key={committee.id} className="government-card">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{committee.name}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={committee.status === 'active' ? 'default' : 'secondary'}>
                      {committee.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Created: {new Date(committee.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(committee)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(committee.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{committee.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Chairman:</span>
                  <span className="ml-1">{committee.chairman}</span>
                </div>
                
                <div className="flex items-start text-sm">
                  <Users className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Members:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {committee.members.map((member, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Schedule:</span>
                  <span className="ml-1">{committee.meetingSchedule}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommittees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No committees found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminCommittees;