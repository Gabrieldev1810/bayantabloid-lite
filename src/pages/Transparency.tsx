import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, TrendingUp, Users, DollarSign } from "lucide-react";

const Transparency = () => {
  const reports = [
    {
      id: 1,
      title: "Annual Financial Report 2023",
      category: "Financial",
      description: "Comprehensive financial report including budget execution, revenue collection, and expenditure details.",
      date: "2024-01-30",
      size: "4.2 MB",
      downloads: 234
    },
    {
      id: 2,
      title: "Procurement Report Q4 2023",
      category: "Procurement",
      description: "Quarterly report on government procurement activities, contracts awarded, and vendor information.",
      date: "2024-01-15",
      size: "2.1 MB",
      downloads: 156
    },
    {
      id: 3,
      title: "Municipal Development Progress Report",
      category: "Development",
      description: "Progress update on ongoing development projects and infrastructure improvements.",
      date: "2024-01-10",
      size: "5.7 MB",
      downloads: 189
    }
  ];

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Transparency</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Reports & Documents
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access public records, financial reports, and transparency documents as part of our commitment to open governance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <Card className="government-card">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">₱45.2M</h3>
              <p className="text-sm text-muted-foreground">Annual Budget 2024</p>
            </CardContent>
          </Card>
          <Card className="government-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">89%</h3>
              <p className="text-sm text-muted-foreground">Budget Utilization</p>
            </CardContent>
          </Card>
          <Card className="government-card">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">12,450</h3>
              <p className="text-sm text-muted-foreground">Registered Voters</p>
            </CardContent>
          </Card>
          <Card className="government-card">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-sm text-muted-foreground">Public Documents</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {reports.map(report => (
            <Card key={report.id} className="government-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{report.category}</Badge>
                      <span className="text-sm text-muted-foreground">{report.size}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                    <p className="text-muted-foreground mb-3">{report.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {report.downloads} downloads
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transparency;