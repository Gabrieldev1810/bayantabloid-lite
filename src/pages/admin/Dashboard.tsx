import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Plus,
  TrendingUp,
  Eye,
  Edit
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: "Pending Documents",
      value: "8",
      description: "Awaiting review/approval",
      icon: FileText,
      trend: "+3 this week",
      link: "/admin/documents",
      urgent: true
    },
    {
      title: "Upcoming Hearings",
      value: "5",
      description: "Scheduled this month",
      icon: Calendar,
      trend: "+2 new scheduled",
      link: "/admin/hearings",
      urgent: false
    },
    {
      title: "Published Ordinances",
      value: "156",
      description: "Total published documents",
      icon: FileText,
      trend: "+12 this quarter",
      link: "/admin/documents",
      urgent: false
    },
    {
      title: "Active Officials",
      value: "12",
      description: "Council members",
      icon: Users,
      trend: "All profiles updated",
      link: "/admin/officials",
      urgent: false
    }
  ];

  const recentActivity = [
    {
      action: "Document pending approval",
      item: "Ordinance No. 2024-015 - Budget Allocation",
      time: "2 hours ago",
      type: "document",
      priority: "high",
      user: "Juan dela Cruz"
    },
    {
      action: "Hearing scheduled",
      item: "Public Budget Consultation",
      time: "4 hours ago",
      type: "hearing",
      priority: "medium",
      user: "Maria Santos"
    },
    {
      action: "Document published",
      item: "Resolution No. 2024-025",
      time: "1 day ago",
      type: "document",
      priority: "low",
      user: "System"
    },
    {
      action: "Announcement posted",
      item: "Traffic Management Update",
      time: "2 days ago",
      type: "announcement",
      priority: "medium",
      user: "Ana Rodriguez"
    },
    {
      action: "Hearing completed",
      item: "Monthly Council Session",
      time: "3 days ago",
      type: "hearing",
      priority: "low",
      user: "Maria Santos"
    }
  ];

  const upcomingHearings = [
    {
      title: "Budget Review 2024",
      date: "2024-03-15",
      time: "09:00",
      status: "scheduled",
      participants: 8
    },
    {
      title: "Traffic Policy Discussion",
      date: "2024-03-18",
      time: "14:00",
      status: "scheduled",
      participants: 5
    },
    {
      title: "Public Consultation",
      date: "2024-03-22",
      time: "10:00",
      status: "scheduled",
      participants: 12
    }
  ];

  const publicMetrics = [
    { label: "Document Views", value: "2,453", trend: "+15%" },
    { label: "Hearing Attendees", value: "186", trend: "+8%" },
    { label: "Public Inquiries", value: "47", trend: "+22%" },
    { label: "Website Visitors", value: "1,234", trend: "+31%" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Sangguniang Bayan CMS
          </p>
        </div>
        <div className="flex space-x-2">
          <Button asChild>
            <Link to="/admin/documents/new">
              <Plus className="w-4 h-4 mr-2" />
              New Document
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`hover:shadow-md transition-shadow ${stat.urgent ? 'border-orange-200 bg-orange-50/50' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                  {stat.urgent && <span className="ml-2 text-orange-600 text-xs">● URGENT</span>}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.urgent ? 'text-orange-600' : 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`flex items-center text-xs ${stat.urgent ? 'text-orange-600' : 'text-green-600'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="p-0 h-auto">
                    <Link to={stat.link}>
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest administrative actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.priority === 'high' ? 'bg-red-500' :
                    activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.item} • {activity.time} • by {activity.user}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Hearings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Hearings</CardTitle>
            <CardDescription>Scheduled council sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingHearings.map((hearing, index) => (
              <div key={index} className="p-3 border rounded-md hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{hearing.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {hearing.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {hearing.date} at {hearing.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {hearing.participants} participants
                  </div>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/hearings">
                <Calendar className="w-4 h-4 mr-2" />
                View All Hearings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Public Transparency Metrics & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Public Transparency Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Public Transparency Metrics</CardTitle>
            <CardDescription>Citizen engagement and access statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {publicMetrics.map((metric, index) => (
                <div key={index} className="text-center p-3 rounded-md bg-accent/30">
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <div className="text-xs text-green-600 mt-1">{metric.trend}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative Tools</CardTitle>
            <CardDescription>Essential CMS management functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/documents/new">
                <FileText className="w-4 h-4 mr-2" />
                Draft New Ordinance/Resolution
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/hearings/new">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Public Hearing
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/announcements/new">
                <MessageSquare className="w-4 h-4 mr-2" />
                Publish Announcement
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/officials/new">
                <Users className="w-4 h-4 mr-2" />
                Add Council Member
              </Link>
            </Button>
            <div className="pt-2 border-t">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Website
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;