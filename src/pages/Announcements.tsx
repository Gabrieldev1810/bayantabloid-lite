import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  Calendar, 
  User, 
  Search,
  Filter,
  Share2,
  Bookmark,
  Clock,
  Tag,
  ChevronRight,
  ExternalLink
} from "lucide-react";

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data - in a real app, this would come from an API
  const announcements = [
    {
      id: 1,
      title: "Public Consultation on Municipal Revenue Code Amendment",
      excerpt: "The Sangguniang Bayan invites all residents to participate in the public consultation for the proposed amendments to the Municipal Revenue Code. Your input is crucial in shaping our tax policies.",
      content: `The Municipal Government, through the Sangguniang Bayan, is pleased to announce a series of public consultations regarding the proposed amendments to the Municipal Revenue Code.

Key proposed changes include:
• Revision of business permit fees structure
• Updates to real property tax assessments  
• New provisions for small business incentives
• Enhanced collection procedures

The consultation sessions will be held at the Municipal Hall Session Hall on the following dates:
• February 20, 2024 - 2:00 PM (General Public)
• February 22, 2024 - 10:00 AM (Business Sector)
• February 24, 2024 - 3:00 PM (Professional Groups)

All interested parties are encouraged to attend and provide their valuable feedback. Written comments may also be submitted to the Sangguniang Bayan Secretary's Office until February 28, 2024.

For more information, please contact the Municipal Treasury Office at (02) 8XXX-XXXX or email treasury@municipality.gov.ph`,
      category: "Public Notice",
      author: "Sangguniang Bayan Secretariat",
      date: "2024-01-25",
      featured: true,
      urgent: true,
      tags: ["Revenue Code", "Public Consultation", "Tax Policy", "Business"],
      readTime: "3 min read",
      views: 489
    },
    {
      id: 2,
      title: "Schedule Change for Regular Session",
      excerpt: "Important notice: The regular session scheduled for February 5, 2024 has been moved to February 7, 2024 at 2:00 PM due to a scheduling conflict.",
      content: `Please be informed that the Regular Session of the Sangguniang Bayan originally scheduled for Monday, February 5, 2024, has been rescheduled to Wednesday, February 7, 2024, at 2:00 PM.

This change is due to a scheduling conflict with the Provincial Government's Special Assembly which requires the attendance of municipal officials.

The agenda for the rescheduled session remains the same:
1. Call to Order and Invocation
2. Roll Call
3. Approval of Minutes from Previous Session  
4. Committee Reports
5. Unfinished Business
6. New Business
7. Public Participation
8. Adjournment

We apologize for any inconvenience this may cause and appreciate your understanding. The session will still be held at the Municipal Hall Session Hall and will be open to the public.

For questions, please contact the Sangguniang Bayan Secretary at sb.secretary@municipality.gov.ph`,
      category: "Schedule Update",
      author: "SB Secretary",
      date: "2024-01-20",
      featured: false,
      urgent: false,
      tags: ["Session", "Schedule", "Meeting"],
      readTime: "2 min read",
      views: 156
    },
    {
      id: 3,
      title: "Community Development Program Applications Now Open",
      excerpt: "Applications for the 2024 Community Development Program are now being accepted. The program provides funding support for barangay-level development projects.",
      content: `The Municipal Government is pleased to announce that applications for the 2024 Community Development Program (CDP) are now open for submission.

Program Overview:
The CDP provides financial assistance to barangays for community-driven development projects that directly benefit residents and improve quality of life.

Eligible Projects:
• Infrastructure improvements (roads, bridges, water systems)
• Health and wellness facilities
• Educational support programs  
• Livelihood and economic development initiatives
• Environmental protection projects

Application Requirements:
• Completed CDP application form
• Detailed project proposal with budget
• Barangay resolution of support
• Environmental compliance certificate (if applicable)
• Timeline and implementation plan

Important Dates:
• Application Period: January 15 - March 15, 2024
• Evaluation Period: March 16 - April 15, 2024
• Notification of Results: April 30, 2024
• Project Implementation: May - December 2024

Maximum grant amount per project is PHP 500,000. Priority will be given to projects that demonstrate community participation and sustainability.

Application forms and guidelines are available at the Municipal Planning and Development Office or can be downloaded from our website. 

For assistance, contact MPDO at (02) 8XXX-XXXX or email mpdo@municipality.gov.ph`,
      category: "Program Announcement",
      author: "Municipal Planning Office",
      date: "2024-01-18",
      featured: true,
      urgent: false,
      tags: ["Community Development", "Funding", "Barangay Projects", "Applications"],
      readTime: "4 min read",
      views: 342
    },
    {
      id: 4,
      title: "New COVID-19 Health Protocols Effective January 15",
      excerpt: "Updated health and safety protocols for public facilities and municipal offices are now in effect. Please review the new guidelines to ensure compliance.",
      content: `In line with the latest guidelines from the Department of Health and Inter-Agency Task Force, the Municipal Government has updated its health and safety protocols effective January 15, 2024.

New Protocol Highlights:
• Face masks are optional in well-ventilated outdoor spaces
• Face masks remain required in enclosed public spaces
• Physical distancing of 1 meter is encouraged in crowded areas
• Hand sanitizing stations available at all municipal facilities

Municipal Office Operations:
• All offices operate at full capacity
• Online services remain available for convenience
• Appointment scheduling recommended for complex transactions
• Senior citizens and PWD priority lanes maintained

Public Transportation:
• Jeepneys and tricycles operate at full capacity
• Drivers and passengers encouraged to wear masks
• Regular sanitization of vehicles required

Public Events:
• Outdoor events with up to 100% capacity allowed
• Indoor events limited to 75% capacity
• Event organizers must ensure compliance with minimum health standards

Health Monitoring:
• Contact tracing continues for confirmed cases
• Free testing available at the Rural Health Unit
• Vaccination boosters available for eligible individuals

The Municipal Health Office continues to monitor the situation and will adjust protocols as needed based on local health conditions.

For health-related inquiries, contact the Rural Health Unit at (02) 8XXX-XXXX or visit our health center during office hours.`,
      category: "Health Advisory",
      author: "Municipal Health Office",
      date: "2024-01-14",
      featured: false,
      urgent: true,
      tags: ["COVID-19", "Health Protocols", "Public Safety", "Guidelines"],
      readTime: "3 min read",
      views: 267
    },
    {
      id: 5,
      title: "Municipal Website Maintenance Scheduled",
      excerpt: "The municipal website will undergo scheduled maintenance on January 30, 2024 from 11:00 PM to 3:00 AM. Some services may be temporarily unavailable.",
      content: `Please be advised that the Municipal Government website will undergo scheduled maintenance to improve system performance and security.

Maintenance Schedule:
Date: January 30, 2024
Time: 11:00 PM - 3:00 AM (estimated 4 hours)

Services Affected:
• Website accessibility may be intermittent
• Online payment systems temporarily unavailable
• Document download services may be slow
• Email services may experience delays

Services Remaining Available:
• Emergency hotlines (24/7)
• Physical office transactions during regular hours
• Mobile app basic features

We apologize for any inconvenience this may cause. The maintenance is necessary to ensure better service delivery and enhanced user experience.

During the maintenance period, for urgent concerns, please call our 24-hour hotline at (02) 8XXX-XXXX or visit our offices during regular business hours.

Thank you for your patience and understanding.`,
      category: "System Notice",
      author: "IT Department",
      date: "2024-01-12",
      featured: false,
      urgent: false,
      tags: ["Website", "Maintenance", "IT", "System"],
      readTime: "2 min read",
      views: 89
    }
  ];

  // Filter announcements based on search and category
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredAnnouncements = announcements.filter(a => a.featured);
  const urgentAnnouncements = announcements.filter(a => a.urgent);

  const categories = [...new Set(announcements.map(a => a.category))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Public Notice": "bg-blue-500",
      "Schedule Update": "bg-yellow-500",
      "Program Announcement": "bg-green-500",
      "Health Advisory": "bg-red-500",
      "System Notice": "bg-purple-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">News & Updates</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Announcements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and important information 
            from the Sangguniang Bayan and municipal government.
          </p>
        </div>

        {/* Quick Alerts */}
        {urgentAnnouncements.length > 0 && (
          <Card className="government-card mb-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Urgent Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentAnnouncements.map(announcement => (
                <div key={announcement.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{announcement.title}</h4>
                    <p className="text-sm text-muted-foreground">{announcement.excerpt.substring(0, 100)}...</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="government-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="w-full lg:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            Showing {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {filteredAnnouncements.map(announcement => (
              <Card key={announcement.id} className={`government-card ${announcement.featured ? 'border-primary shadow-lg' : ''}`}>
                {announcement.featured && (
                  <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                    Featured Announcement
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between space-y-2">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(announcement.category)}`} />
                        <Badge variant="secondary">{announcement.category}</Badge>
                        {announcement.urgent && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{announcement.readTime}</span>
                      </div>
                      
                      <CardTitle className="text-xl hover:text-primary cursor-pointer">
                        {announcement.title}
                      </CardTitle>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {announcement.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {announcement.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {announcement.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(announcement.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {announcement.views} views
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="pt-4">
                    <Button variant="outline" size="sm">
                      Read Full Article
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredAnnouncements.length === 0 && (
              <Card className="government-card">
                <CardContent className="p-12 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Announcements Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or check back later for new updates.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Newsletter Signup */}
            <Card className="government-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Subscribe to receive email notifications about important announcements and updates.
                </p>
                <Button className="government-button-primary w-full">
                  Subscribe to Updates
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="government-card">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map(category => {
                  const count = announcements.filter(a => a.category === category).length;
                  return (
                    <div key={category} className="flex items-center justify-between p-2 rounded hover:bg-accent cursor-pointer">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)} mr-3`} />
                        <span className="text-sm">{category}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{count}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Archive */}
            <Card className="government-card">
              <CardHeader>
                <CardTitle className="text-lg">Archive</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  January 2024 (5)
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  December 2023 (8)
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  November 2023 (12)
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                  View All Archives
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;