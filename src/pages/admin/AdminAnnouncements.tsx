import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Search, MessageSquare, Calendar, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'meeting' | 'event' | 'notice' | 'alert';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  expiryDate?: string;
  author: string;
  featured: boolean;
  tags: string[];
}

const AdminAnnouncements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  // Mock data
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Council Session Schedule for March 2024',
      content: 'The regular council session for March 2024 will be held every Tuesday at 9:00 AM in the Council Chamber. All sessions are open to the public.',
      category: 'meeting',
      priority: 'high',
      status: 'published',
      publishDate: '2024-02-25',
      expiryDate: '2024-03-31',
      author: 'Maria Santos',
      featured: true,
      tags: ['council', 'schedule', 'march']
    },
    {
      id: '2',
      title: 'Public Consultation on Budget Allocation',
      content: 'The municipal government invites the public to participate in the budget consultation meeting on March 15, 2024. Your input is valuable for community development.',
      category: 'event',
      priority: 'high',
      status: 'published',
      publishDate: '2024-02-20',
      expiryDate: '2024-03-15',
      author: 'Juan dela Cruz',
      featured: true,
      tags: ['budget', 'consultation', 'public']
    },
    {
      id: '3',
      title: 'New Traffic Management Policy',
      content: 'A new traffic management policy has been approved and will take effect starting April 1, 2024. Please review the updated guidelines.',
      category: 'notice',
      priority: 'medium',
      status: 'published',
      publishDate: '2024-02-18',
      author: 'Ana Rodriguez',
      featured: false,
      tags: ['traffic', 'policy', 'announcement']
    },
    {
      id: '4',
      title: 'Christmas Holiday Schedule 2024',
      content: 'Municipal offices will be closed during the Christmas holidays. Emergency services will remain available 24/7.',
      category: 'general',
      priority: 'low',
      status: 'draft',
      publishDate: '2024-12-01',
      author: 'Maria Santos',
      featured: false,
      tags: ['holiday', 'schedule', 'christmas']
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as Announcement['category'],
    priority: 'medium' as Announcement['priority'],
    status: 'draft' as Announcement['status'],
    publishDate: '',
    expiryDate: '',
    author: '',
    featured: false,
    tags: ''
  });

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || announcement.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(announcement =>
        announcement.id === editingAnnouncement.id
          ? {
              ...announcement,
              ...formData,
              tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            }
          : announcement
      ));
      toast({
        title: "Announcement updated",
        description: "The announcement has been updated successfully.",
      });
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setAnnouncements([...announcements, newAnnouncement]);
      toast({
        title: "Announcement created",
        description: "New announcement has been created successfully.",
      });
    }

    setFormData({
      title: '',
      content: '',
      category: 'general',
      priority: 'medium',
      status: 'draft',
      publishDate: '',
      expiryDate: '',
      author: '',
      featured: false,
      tags: ''
    });
    setEditingAnnouncement(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      priority: announcement.priority,
      status: announcement.status,
      publishDate: announcement.publishDate,
      expiryDate: announcement.expiryDate || '',
      author: announcement.author,
      featured: announcement.featured,
      tags: announcement.tags.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    toast({
      title: "Announcement deleted",
      description: "The announcement has been deleted successfully.",
    });
  };

  const handleToggleStatus = (id: string) => {
    setAnnouncements(announcements.map(announcement =>
      announcement.id === id
        ? {
            ...announcement,
            status: announcement.status === 'published' ? 'draft' : 'published' as Announcement['status']
          }
        : announcement
    ));
    toast({
      title: "Status updated",
      description: "Announcement status has been updated.",
    });
  };

  const handleToggleFeatured = (id: string) => {
    setAnnouncements(announcements.map(announcement =>
      announcement.id === id
        ? { ...announcement, featured: !announcement.featured }
        : announcement
    ));
    toast({
      title: "Featured status updated",
      description: "Announcement featured status has been updated.",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-gray-100 text-gray-800';
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'notice': return 'bg-yellow-100 text-yellow-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Announcements Management</h1>
          <p className="text-muted-foreground">
            Create and manage public announcements
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingAnnouncement(null);
              setFormData({
                title: '',
                content: '',
                category: 'general',
                priority: 'medium',
                status: 'draft',
                publishDate: '',
                expiryDate: '',
                author: '',
                featured: false,
                tags: ''
              });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
              </DialogTitle>
              <DialogDescription>
                {editingAnnouncement ? 'Update the announcement information' : 'Create a new public announcement'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: Announcement['category']) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="notice">Notice</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value: Announcement['priority']) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: Announcement['status']) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., meeting, budget, public"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured announcement</Label>
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAnnouncement ? 'Update' : 'Create'} Announcement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="notice">Notice</SelectItem>
            <SelectItem value="alert">Alert</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    <Badge className={getCategoryColor(announcement.category)}>
                      {announcement.category}
                    </Badge>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                    <Badge className={getStatusColor(announcement.status)}>
                      {announcement.status}
                    </Badge>
                    {announcement.featured && (
                      <Badge variant="default">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-1">{announcement.title}</CardTitle>
                  <CardDescription>
                    By {announcement.author} • {announcement.publishDate}
                    {announcement.expiryDate && ` • Expires: ${announcement.expiryDate}`}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(announcement.id)}
                  >
                    {announcement.status === 'published' ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(announcement)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(announcement.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-3">{announcement.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {announcement.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Published: {announcement.publishDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured(announcement.id)}
                  >
                    {announcement.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button
                    variant={announcement.status === 'published' ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleToggleStatus(announcement.id)}
                  >
                    {announcement.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No announcements found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminAnnouncements;