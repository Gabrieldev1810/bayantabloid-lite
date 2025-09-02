import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      title: "Officials",
      value: "12",
      description: "Active council members",
      icon: Users,
      trend: "+2 this month",
      link: "/admin/officials"
    },
    {
      title: "Documents",
      value: "156",
      description: "Ordinances & Resolutions",
      icon: FileText,
      trend: "+8 this week",
      link: "/admin/documents"
    },
    {
      title: "Hearings",
      value: "24",
      description: "Total hearings this year",
      icon: Calendar,
      trend: "+3 upcoming",
      link: "/admin/hearings"
    },
    {
      title: "Announcements",
      value: "43",
      description: "Published announcements",
      icon: MessageSquare,
      trend: "+5 this week",
      link: "/admin/announcements"
    }
  ];

  const recentActivity = [
    {
      action: "New ordinance published",
      item: "Ordinance No. 2024-015",
      time: "2 hours ago",
      type: "document"
    },
    {
      action: "Hearing scheduled",
      item: "Budget Review Meeting",
      time: "4 hours ago",
      type: "hearing"
    },
    {
      action: "Announcement posted",
      item: "Christmas Holiday Schedule",
      time: "1 day ago",
      type: "announcement"
    },
    {
      action: "Official profile updated",
      item: "Councilor Maria Santos",
      time: "2 days ago",
      type: "official"
    }
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
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-xs text-green-600">
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.item} • {activity.time}
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

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/documents/new">
                <FileText className="w-4 h-4 mr-2" />
                Create New Ordinance
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/hearings/new">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Hearing
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/announcements/new">
                <MessageSquare className="w-4 h-4 mr-2" />
                Post Announcement
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/officials/new">
                <Users className="w-4 h-4 mr-2" />
                Add Official
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;