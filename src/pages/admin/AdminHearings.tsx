import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Search, Calendar, Clock, Users, FileText, Video, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Hearing {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  participants: string[];
  agenda: string[];
  documents: { name: string; url: string }[];
  journal?: { name: string; url: string };
  videoUrl?: string;
  chairperson: string;
}

const AdminHearings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHearing, setEditingHearing] = useState<Hearing | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data
  const [hearings, setHearings] = useState<Hearing[]>([
    {
      id: '1',
      title: 'Budget Review for 2024',
      description: 'Annual budget review and approval session',
      date: '2024-03-15',
      time: '09:00',
      venue: 'Council Chamber',
      status: 'scheduled',
      participants: ['Maria Santos', 'Juan dela Cruz', 'Ana Rodriguez'],
      agenda: ['Budget presentation', 'Department allocations review', 'Public consultation'],
      documents: [
        { name: 'Budget Proposal 2024.pdf', url: '/docs/budget-2024.pdf' },
        { name: 'Financial Report.pdf', url: '/docs/financial-report.pdf' }
      ],
      chairperson: 'Maria Santos'
    },
    {
      id: '2',
      title: 'Traffic Management Ordinance Discussion',
      description: 'Discussion on proposed traffic management policies',
      date: '2024-02-28',
      time: '14:00',
      venue: 'Conference Room A',
      status: 'completed',
      participants: ['Ana Rodriguez', 'Juan dela Cruz'],
      agenda: ['Policy review', 'Public input session', 'Committee recommendations'],
      documents: [
        { name: 'Traffic Policy Draft.pdf', url: '/docs/traffic-policy.pdf' }
      ],
      journal: { name: 'Session Journal - Feb 28.pdf', url: '/docs/journal-feb28.pdf' },
      videoUrl: 'https://example.com/video/traffic-hearing',
      chairperson: 'Ana Rodriguez'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    status: 'scheduled' as Hearing['status'],
    participants: '',
    agenda: '',
    chairperson: ''
  });

  const filteredHearings = hearings.filter(hearing => {
    const matchesSearch = hearing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hearing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hearing.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || hearing.status === filterStatus;
    
    // Tab filtering
    const currentDate = new Date().toISOString().split('T')[0];
    const hearingDate = hearing.date;
    
    if (activeTab === 'upcoming') {
      return matchesSearch && matchesStatus && 
             (hearing.status === 'scheduled' || hearing.status === 'ongoing') &&
             hearingDate >= currentDate;
    } else if (activeTab === 'past') {
      return matchesSearch && matchesStatus && 
             (hearing.status === 'completed' || hearing.status === 'cancelled' ||
              (hearingDate < currentDate && hearing.status !== 'ongoing'));
    }
    
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingHearing) {
      setHearings(hearings.map(hearing =>
        hearing.id === editingHearing.id
          ? {
              ...hearing,
              ...formData,
              participants: formData.participants.split(',').map(p => p.trim()).filter(p => p),
              agenda: formData.agenda.split('\n').map(item => item.trim()).filter(item => item)
            }
          : hearing
      ));
      toast({
        title: "Hearing updated",
        description: "The hearing has been updated successfully.",
      });
    } else {
      const newHearing: Hearing = {
        id: Date.now().toString(),
        ...formData,
        participants: formData.participants.split(',').map(p => p.trim()).filter(p => p),
        agenda: formData.agenda.split('\n').map(item => item.trim()).filter(item => item),
        documents: []
      };
      setHearings([...hearings, newHearing]);
      toast({
        title: "Hearing created",
        description: "New hearing has been scheduled successfully.",
      });
    }

    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      status: 'scheduled',
      participants: '',
      agenda: '',
      chairperson: ''
    });
    setEditingHearing(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (hearing: Hearing) => {
    setEditingHearing(hearing);
    setFormData({
      title: hearing.title,
      description: hearing.description,
      date: hearing.date,
      time: hearing.time,
      venue: hearing.venue,
      status: hearing.status,
      participants: hearing.participants.join(', '),
      agenda: hearing.agenda.join('\n'),
      chairperson: hearing.chairperson
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setHearings(hearings.filter(hearing => hearing.id !== id));
    toast({
      title: "Hearing deleted",
      description: "The hearing has been deleted successfully.",
    });
  };

  const handleStatusChange = (id: string, newStatus: Hearing['status']) => {
    setHearings(hearings.map(hearing =>
      hearing.id === id ? { ...hearing, status: newStatus } : hearing
    ));
    toast({
      title: "Status updated",
      description: `Hearing status changed to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hearing Management</h1>
          <p className="text-muted-foreground">
            Schedule and manage council hearings
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingHearing(null);
              setFormData({
                title: '',
                description: '',
                date: '',
                time: '',
                venue: '',
                status: 'scheduled',
                participants: '',
                agenda: '',
                chairperson: ''
              });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Hearing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingHearing ? 'Edit Hearing' : 'Schedule New Hearing'}
              </DialogTitle>
              <DialogDescription>
                {editingHearing ? 'Update the hearing information' : 'Create a new hearing session'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Hearing Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: Hearing['status']) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g., Council Chamber"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chairperson">Chairperson</Label>
                  <Input
                    id="chairperson"
                    value={formData.chairperson}
                    onChange={(e) => setFormData({ ...formData, chairperson: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Participants (comma-separated)</Label>
                <Input
                  id="participants"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  placeholder="e.g., Maria Santos, Juan dela Cruz"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agenda">Agenda (one item per line)</Label>
                <Textarea
                  id="agenda"
                  value={formData.agenda}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  rows={4}
                  placeholder="Budget presentation&#10;Department allocations review&#10;Public consultation"
                />
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingHearing ? 'Update' : 'Schedule'} Hearing
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search hearings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hearings List */}
          <div className="space-y-4">
            {filteredHearings.map((hearing) => (
              <Card key={hearing.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <Badge className={getStatusColor(hearing.status)}>
                          {hearing.status}
                        </Badge>
                        {hearing.videoUrl && (
                          <Badge variant="outline">
                            <Video className="w-3 h-3 mr-1" />
                            Video Available
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl mb-1">{hearing.title}</CardTitle>
                      <CardDescription>{hearing.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(hearing)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(hearing.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{hearing.date}</span>
                        <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                        <span>{hearing.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Venue: {hearing.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Chair: {hearing.chairperson}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{hearing.participants.length} participants</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span>{hearing.documents.length} documents</span>
                      </div>
                    </div>
                  </div>

                  {/* Agenda */}
                  {hearing.agenda.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Agenda:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {hearing.agenda.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Documents and Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {hearing.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc.name}
                        </Badge>
                      ))}
                      {hearing.journal && (
                        <Badge variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          Journal
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                      <Select 
                        value={hearing.status} 
                        onValueChange={(value: Hearing['status']) => handleStatusChange(hearing.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHearings.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hearings found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHearings;