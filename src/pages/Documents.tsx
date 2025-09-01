import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  Tag,
  Clock
} from "lucide-react";

const Documents = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState(category || "all");

  // Sample data - in a real app, this would come from an API
  const documents = [
    {
      id: 1,
      title: "Municipal Ordinance No. 2024-001",
      type: "Ordinance",
      number: "2024-001",
      description: "An ordinance regulating the use of public parks and recreation areas within the municipality",
      date: "2024-01-15",
      status: "Published",
      author: "Hon. Maria Santos",
      tags: ["Parks", "Recreation", "Public Use"],
      fileSize: "2.3 MB",
      views: 156
    },
    {
      id: 2,
      title: "Resolution No. 2024-012",
      type: "Resolution",
      number: "2024-012",
      description: "A resolution approving the Municipal Development Plan for 2024-2027",
      date: "2024-01-10",
      status: "Published",
      author: "Committee on Planning",
      tags: ["Development", "Planning", "2024-2027"],
      fileSize: "5.1 MB",
      views: 342
    },
    {
      id: 3,
      title: "Municipal Ordinance No. 2023-089",
      type: "Ordinance",
      number: "2023-089",
      description: "An ordinance establishing guidelines for street vendor operations",
      date: "2023-12-20",
      status: "Published",
      author: "Hon. Juan dela Cruz",
      tags: ["Street Vendors", "Business", "Guidelines"],
      fileSize: "1.8 MB",
      views: 89
    },
    {
      id: 4,
      title: "Resolution No. 2024-008",
      type: "Resolution",
      number: "2024-008",
      description: "A resolution declaring support for the National Clean Air Program",
      date: "2024-01-05",
      status: "Published",
      author: "Hon. Michael Torres",
      tags: ["Environment", "Clean Air", "Support"],
      fileSize: "0.9 MB",
      views: 67
    },
    {
      id: 5,
      title: "Municipal Ordinance No. 2024-002",
      type: "Ordinance",
      number: "2024-002",
      description: "An ordinance amending the Municipal Revenue Code",
      date: "2024-01-20",
      status: "Under Review",
      author: "Committee on Finance",
      tags: ["Revenue", "Tax", "Amendment"],
      fileSize: "3.7 MB",
      views: 23
    },
    {
      id: 6,
      title: "Resolution No. 2023-145",
      type: "Resolution",
      number: "2023-145",
      description: "A resolution commending outstanding public school teachers",
      date: "2023-12-15",
      status: "Published",
      author: "Hon. Carmen Lopez",
      tags: ["Education", "Teachers", "Commendation"],
      fileSize: "1.2 MB",
      views: 134
    }
  ];

  // Filter documents based on search term, year, status, and active tab
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesYear = selectedYear === "all" || new Date(doc.date).getFullYear().toString() === selectedYear;
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
    const matchesTab = activeTab === "all" || doc.type.toLowerCase() === activeTab;

    return matchesSearch && matchesYear && matchesStatus && matchesTab;
  });

  const getAvailableYears = () => {
    const years = [...new Set(documents.map(doc => new Date(doc.date).getFullYear().toString()))];
    return years.sort((a, b) => b.localeCompare(a));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-500";
      case "Under Review": return "bg-yellow-500";
      case "Draft": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Document Library</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ordinances & Resolutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our comprehensive collection of municipal ordinances, resolutions, 
            and legislative documents. Search, filter, and download official municipal records.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="government-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search documents by title, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {getAvailableYears().map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Categories Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Documents ({documents.length})</TabsTrigger>
            <TabsTrigger value="ordinance">
              Ordinances ({documents.filter(d => d.type === "Ordinance").length})
            </TabsTrigger>
            <TabsTrigger value="resolution">
              Resolutions ({documents.filter(d => d.type === "Resolution").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
              </p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>

            {/* Documents Grid */}
            <div className="space-y-4">
              {filteredDocuments.map(doc => (
                <Card key={doc.id} className="government-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      
                      {/* Document Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={doc.type === 'Ordinance' ? 'default' : 'secondary'}>
                                {doc.type}
                              </Badge>
                              <Badge variant="outline">
                                {doc.number}
                              </Badge>
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(doc.status)}`} />
                              <span className="text-xs text-muted-foreground">{doc.status}</span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                              {doc.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {doc.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(doc.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <span>By {doc.author}</span>
                          <span>{doc.fileSize}</span>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {doc.views} views
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex lg:flex-col gap-2">
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredDocuments.length === 0 && (
                <Card className="government-card">
                  <CardContent className="p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Documents Found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria or filters to find what you're looking for.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documents;