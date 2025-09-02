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
import { Plus, Edit, Trash2, Search, FileText, Download, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  title: string;
  referenceNumber: string;
  type: 'ordinance' | 'resolution';
  author: string;
  status: 'draft' | 'pending' | 'approved' | 'published';
  dateCreated: string;
  datePublished?: string;
  description: string;
  fileUrl?: string;
  tags: string[];
}

const AdminDocuments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  // Mock data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Budget Allocation for Education Infrastructure',
      referenceNumber: 'ORD-2024-001',
      type: 'ordinance',
      author: 'Maria Santos',
      status: 'published',
      dateCreated: '2024-01-15',
      datePublished: '2024-01-20',
      description: 'Allocation of funds for the construction and renovation of school buildings.',
      fileUrl: '/documents/ord-2024-001.pdf',
      tags: ['education', 'budget', 'infrastructure']
    },
    {
      id: '2',
      title: 'Resolution Recognizing Outstanding Teachers',
      referenceNumber: 'RES-2024-005',
      type: 'resolution',
      author: 'Juan dela Cruz',
      status: 'approved',
      dateCreated: '2024-02-01',
      description: 'Recognition of exemplary performance of public school teachers.',
      tags: ['education', 'recognition', 'teachers']
    },
    {
      id: '3',
      title: 'Traffic Management and Road Safety Ordinance',
      referenceNumber: 'ORD-2024-002',
      type: 'ordinance',
      author: 'Ana Rodriguez',
      status: 'pending',
      dateCreated: '2024-02-10',
      description: 'Implementation of comprehensive traffic management system.',
      tags: ['traffic', 'safety', 'transportation']
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    referenceNumber: '',
    type: 'ordinance' as 'ordinance' | 'resolution',
    author: '',
    status: 'draft' as 'draft' | 'pending' | 'approved' | 'published',
    description: '',
    tags: ''
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDocument) {
      setDocuments(documents.map(doc =>
        doc.id === editingDocument.id
          ? {
              ...doc,
              ...formData,
              tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            }
          : doc
      ));
      toast({
        title: "Document updated",
        description: "The document has been updated successfully.",
      });
    } else {
      const newDocument: Document = {
        id: Date.now().toString(),
        ...formData,
        dateCreated: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setDocuments([...documents, newDocument]);
      toast({
        title: "Document created",
        description: "New document has been created successfully.",
      });
    }

    setFormData({
      title: '',
      referenceNumber: '',
      type: 'ordinance',
      author: '',
      status: 'draft',
      description: '',
      tags: ''
    });
    setEditingDocument(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (document: Document) => {
    setEditingDocument(document);
    setFormData({
      title: document.title,
      referenceNumber: document.referenceNumber,
      type: document.type,
      author: document.author,
      status: document.status,
      description: document.description,
      tags: document.tags.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been deleted successfully.",
    });
  };

  const handleStatusChange = (id: string, newStatus: Document['status']) => {
    setDocuments(documents.map(doc =>
      doc.id === id
        ? {
            ...doc,
            status: newStatus,
            datePublished: newStatus === 'published' ? new Date().toISOString().split('T')[0] : doc.datePublished
          }
        : doc
    ));
    toast({
      title: "Status updated",
      description: `Document status changed to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Legislation Management</h1>
          <p className="text-muted-foreground">
            Manage ordinances and resolutions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingDocument(null);
              setFormData({
                title: '',
                referenceNumber: '',
                type: 'ordinance',
                author: '',
                status: 'draft',
                description: '',
                tags: ''
              });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingDocument ? 'Edit Document' : 'Create New Document'}
              </DialogTitle>
              <DialogDescription>
                {editingDocument ? 'Update the document information' : 'Create a new ordinance or resolution'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input
                    id="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                    placeholder="e.g., ORD-2024-001"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: 'ordinance' | 'resolution') => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ordinance">Ordinance</SelectItem>
                      <SelectItem value="resolution">Resolution</SelectItem>
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
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: Document['status']) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., education, budget, infrastructure"
                />
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDocument ? 'Update' : 'Create'} Document
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
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ordinance">Ordinances</SelectItem>
            <SelectItem value="resolution">Resolutions</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <Badge variant="outline" className="capitalize">
                      {document.type}
                    </Badge>
                    <Badge className={getStatusColor(document.status)}>
                      {document.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-1">{document.title}</CardTitle>
                  <CardDescription>
                    {document.referenceNumber} • By {document.author}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(document)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(document.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{document.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {document.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {document.dateCreated}</span>
                  </div>
                  {document.datePublished && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Published: {document.datePublished}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select 
                    value={document.status} 
                    onValueChange={(value: Document['status']) => handleStatusChange(document.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {document.fileUrl && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No documents found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDocuments;