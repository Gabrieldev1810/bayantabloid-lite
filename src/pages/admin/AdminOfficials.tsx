import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Official {
  id: string;
  name: string;
  position: string;
  committee: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
  status: 'active' | 'inactive';
}

const AdminOfficials = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOfficial, setEditingOfficial] = useState<Official | null>(null);

  // Mock data
  const [officials, setOfficials] = useState<Official[]>([
    {
      id: '1',
      name: 'Maria Santos',
      position: 'Mayor',
      committee: 'Executive',
      email: 'mayor@sanggunian.gov',
      phone: '+63 915 123 4567',
      bio: 'Dedicated public servant with 15 years of experience in local government.',
      image: '/placeholder.svg',
      status: 'active'
    },
    {
      id: '2',
      name: 'Juan dela Cruz',
      position: 'Vice Mayor',
      committee: 'Legislative',
      email: 'vmyor@sanggunian.gov',
      phone: '+63 915 234 5678',
      bio: 'Former businessman turned public servant, advocating for economic development.',
      image: '/placeholder.svg',
      status: 'active'
    },
    {
      id: '3',
      name: 'Ana Rodriguez',
      position: 'Councilor',
      committee: 'Education',
      email: 'councilor.ana@sanggunian.gov',
      phone: '+63 915 345 6789',
      bio: 'Former teacher with passion for education reform and youth development.',
      image: '/placeholder.svg',
      status: 'active'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    committee: '',
    email: '',
    phone: '',
    bio: '',
    status: 'active' as 'active' | 'inactive'
  });

  const filteredOfficials = officials.filter(official =>
    official.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    official.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    official.committee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingOfficial) {
      // Update existing official
      setOfficials(officials.map(official =>
        official.id === editingOfficial.id
          ? { ...official, ...formData, image: '/placeholder.svg' }
          : official
      ));
      toast({
        title: "Official updated",
        description: "The official's information has been updated successfully.",
      });
    } else {
      // Add new official
      const newOfficial: Official = {
        id: Date.now().toString(),
        ...formData,
        image: '/placeholder.svg'
      };
      setOfficials([...officials, newOfficial]);
      toast({
        title: "Official added",
        description: "New official has been added successfully.",
      });
    }

    setFormData({ name: '', position: '', committee: '', email: '', phone: '', bio: '', status: 'active' });
    setEditingOfficial(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (official: Official) => {
    setEditingOfficial(official);
    setFormData({
      name: official.name,
      position: official.position,
      committee: official.committee,
      email: official.email,
      phone: official.phone,
      bio: official.bio,
      status: official.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setOfficials(officials.filter(official => official.id !== id));
    toast({
      title: "Official removed",
      description: "The official has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Officials Management</h1>
          <p className="text-muted-foreground">
            Manage council members and their information
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingOfficial(null);
              setFormData({ name: '', position: '', committee: '', email: '', phone: '', bio: '', status: 'active' });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Official
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingOfficial ? 'Edit Official' : 'Add New Official'}
              </DialogTitle>
              <DialogDescription>
                {editingOfficial ? 'Update the official information' : 'Add a new council member or official'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mayor">Mayor</SelectItem>
                      <SelectItem value="Vice Mayor">Vice Mayor</SelectItem>
                      <SelectItem value="Councilor">Councilor</SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                      <SelectItem value="Treasurer">Treasurer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="committee">Committee</Label>
                  <Input
                    id="committee"
                    value={formData.committee}
                    onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                    placeholder="e.g., Education, Health"
                  />
                </div>
                <div className="space-y-2">
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
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief biography or description"
                  rows={3}
                />
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingOfficial ? 'Update' : 'Add'} Official
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search officials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Officials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOfficials.map((official) => (
          <Card key={official.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-3">
                <AvatarImage src={official.image} alt={official.name} />
                <AvatarFallback className="text-lg">
                  {official.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{official.name}</CardTitle>
              <CardDescription>{official.position}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Committee:</span>
                <Badge variant="secondary">{official.committee}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={official.status === 'active' ? 'default' : 'outline'}>
                  {official.status}
                </Badge>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Email: {official.email}</p>
                <p className="text-muted-foreground">Phone: {official.phone}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(official)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(official.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOfficials.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No officials found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminOfficials;