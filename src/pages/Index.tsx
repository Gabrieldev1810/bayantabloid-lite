import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  Bell, 
  Users, 
  Download,
  Eye,
  ChevronRight,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Sample data - in a real app, this would come from an API
  const recentDocuments = [
    {
      id: 1,
      title: "Municipal Ordinance No. 2024-001",
      type: "Ordinance",
      description: "Regulating the Use of Public Parks and Recreation Areas",
      date: "2024-01-15",
      status: "Published"
    },
    {
      id: 2,
      title: "Resolution No. 2024-012",
      type: "Resolution",
      description: "Approving the Municipal Development Plan for 2024-2027",
      date: "2024-01-10",
      status: "Published"
    },
    {
      id: 3,
      title: "Municipal Ordinance No. 2023-089",
      type: "Ordinance",
      description: "Establishing Guidelines for Street Vendor Operations",
      date: "2023-12-20",
      status: "Published"
    }
  ];

  const upcomingHearings = [
    {
      id: 1,
      title: "Public Hearing on Budget Appropriation",
      date: "2024-02-15",
      time: "2:00 PM",
      venue: "Municipal Hall Session Hall"
    },
    {
      id: 2,
      title: "Committee Hearing on Infrastructure Development",
      date: "2024-02-20",
      time: "10:00 AM",
      venue: "Committee Room A"
    }
  ];

  const latestAnnouncements = [
    {
      id: 1,
      title: "Notice of Public Consultation",
      excerpt: "The Sangguniang Bayan invites all residents to participate in the public consultation for the proposed Municipal Revenue Code...",
      date: "2024-01-25",
      category: "Public Notice"
    },
    {
      id: 2,
      title: "Schedule Change for Regular Session",
      excerpt: "Please be informed that the regular session scheduled for February 5, 2024 has been moved to February 7, 2024...",
      date: "2024-01-20",
      category: "Schedule Update"
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Top Officials Section */}
      <div className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Top Officials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated leaders serving our municipality with integrity and commitment to public service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mayor */}
            <Card className="government-card text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Hon. Maria Santos</h3>
                <p className="text-primary font-medium mb-2">Municipal Mayor</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Leading with vision and dedication to serve our community's needs.
                </p>
                <Link to="/officials">
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Vice Mayor */}
            <Card className="government-card text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Hon. Jose Garcia</h3>
                <p className="text-primary font-medium mb-2">Vice Mayor</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Presiding officer of the Sangguniang Bayan and legislative leader.
                </p>
                <Link to="/officials">
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* SB Member */}
            <Card className="government-card text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Hon. Juan dela Cruz</h3>
                <p className="text-primary font-medium mb-2">SB Member</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Chair, Committee on Finance & Appropriations.
                </p>
                <Link to="/officials">
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* SB Member */}
            <Card className="government-card text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Hon. Anna Reyes</h3>
                <p className="text-primary font-medium mb-2">SB Member</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Chair, Committee on Health & Social Services.
                </p>
                <Link to="/officials">
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/officials">
              <Button variant="default">
                View All Officials <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Documents */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Recent Documents</h2>
                <Link to="/documents">
                  <Button variant="outline" size="sm">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <Card key={doc.id} className="government-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={doc.type === 'Ordinance' ? 'default' : 'secondary'}>
                              {doc.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {doc.status}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {doc.title}
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            {doc.description}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(doc.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              
              {/* Upcoming Hearings */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">Upcoming Hearings</h3>
                  <Link to="/hearings">
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {upcomingHearings.map((hearing) => (
                    <Card key={hearing.id} className="government-card">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-2">
                          {hearing.title}
                        </h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(hearing.date).toLocaleDateString()} at {hearing.time}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {hearing.venue}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Latest Announcements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">Latest News</h3>
                  <Link to="/announcements">
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {latestAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="government-card">
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {announcement.category}
                        </Badge>
                        <h4 className="font-semibold text-foreground mb-2">
                          {announcement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {announcement.excerpt}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {new Date(announcement.date).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="government-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/documents" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Browse Documents
                    </Button>
                  </Link>
                  <Link to="/hearings" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Hearings
                    </Button>
                  </Link>
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
