import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText, Mail, User } from "lucide-react";

const Committees = () => {
  // Sample data - in a real app, this would come from an API
  const committees = [
    {
      id: 1,
      name: "Committee on Finance & Appropriations",
      chairman: "Hon. Juan dela Cruz",
      members: ["Hon. Maria Santos", "Hon. Anna Reyes", "Hon. Roberto Martinez"],
      description: "Oversees municipal finances, budget preparation, and appropriation of funds for various municipal programs and projects.",
      responsibilities: [
        "Review and approve annual municipal budget",
        "Monitor budget execution and financial performance",
        "Evaluate revenue generation programs",
        "Assess fiscal policies and financial regulations"
      ],
      meetingSchedule: "2nd Tuesday of every month, 2:00 PM",
      recentActivities: [
        { date: "2024-01-15", activity: "Reviewed Q4 2023 Budget Performance" },
        { date: "2024-01-08", activity: "Approved 2024 Annual Budget" }
      ]
    },
    {
      id: 2,
      name: "Committee on Health & Social Services",
      chairman: "Hon. Anna Reyes",
      members: ["Hon. Carmen Lopez", "Hon. Patricia Garcia", "Hon. Michael Torres"],
      description: "Focuses on health programs, social welfare services, and community development initiatives for the municipality.",
      responsibilities: [
        "Develop health and wellness programs",
        "Oversee social welfare services",
        "Monitor public health facilities",
        "Coordinate with NGOs and community organizations"
      ],
      meetingSchedule: "3rd Wednesday of every month, 10:00 AM",
      recentActivities: [
        { date: "2024-01-20", activity: "Health Center Facility Assessment" },
        { date: "2024-01-12", activity: "Senior Citizens Program Review" }
      ]
    },
    {
      id: 3,
      name: "Committee on Infrastructure & Public Works",
      chairman: "Hon. Roberto Martinez",
      members: ["Hon. Juan dela Cruz", "Hon. Michael Torres", "Hon. Patricia Garcia"],
      description: "Manages public infrastructure projects, road maintenance, and public works development throughout the municipality.",
      responsibilities: [
        "Plan and oversee infrastructure projects",
        "Monitor road and bridge construction",
        "Assess public works quality and compliance",
        "Coordinate with engineering departments"
      ],
      meetingSchedule: "1st Friday of every month, 9:00 AM",
      recentActivities: [
        { date: "2024-01-25", activity: "Road Improvement Project Inspection" },
        { date: "2024-01-18", activity: "Bridge Construction Progress Review" }
      ]
    },
    {
      id: 4,
      name: "Committee on Education & Culture",
      chairman: "Hon. Carmen Lopez",
      members: ["Hon. Anna Reyes", "Hon. Maria Santos", "Hon. Juan dela Cruz"],
      description: "Promotes educational advancement, cultural preservation, and youth development programs in the municipality.",
      responsibilities: [
        "Support educational institutions and programs",
        "Preserve local culture and heritage",
        "Youth development and sports programs",
        "Library and cultural facility management"
      ],
      meetingSchedule: "4th Thursday of every month, 3:00 PM",
      recentActivities: [
        { date: "2024-01-28", activity: "School Facility Assessment" },
        { date: "2024-01-22", activity: "Cultural Festival Planning Meeting" }
      ]
    },
    {
      id: 5,
      name: "Committee on Environment & Natural Resources",
      chairman: "Hon. Michael Torres",
      members: ["Hon. Roberto Martinez", "Hon. Patricia Garcia", "Hon. Carmen Lopez"],
      description: "Protects environmental resources, implements sustainability programs, and manages natural resource conservation.",
      responsibilities: [
        "Environmental protection and conservation",
        "Waste management and recycling programs",
        "Natural resource preservation",
        "Climate change adaptation measures"
      ],
      meetingSchedule: "2nd Monday of every month, 1:00 PM",
      recentActivities: [
        { date: "2024-01-30", activity: "Waste Management Program Evaluation" },
        { date: "2024-01-16", activity: "Tree Planting Initiative Planning" }
      ]
    },
    {
      id: 6,
      name: "Committee on Peace & Order",
      chairman: "Hon. Patricia Garcia",
      members: ["Hon. Michael Torres", "Hon. Juan dela Cruz", "Hon. Roberto Martinez"],
      description: "Ensures public safety, peace and order, and coordinates with law enforcement agencies for community security.",
      responsibilities: [
        "Community safety and security programs",
        "Coordination with police and emergency services",
        "Crime prevention and public safety measures",
        "Disaster preparedness and response"
      ],
      meetingSchedule: "3rd Monday of every month, 2:30 PM",
      recentActivities: [
        { date: "2024-01-29", activity: "Barangay Safety Assessment" },
        { date: "2024-01-15", activity: "Emergency Response Drill Coordination" }
      ]
    }
  ];

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Committees</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Standing Committees
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our specialized committees work diligently on specific areas of governance 
            to ensure comprehensive and effective municipal services.
          </p>
        </div>

        {/* Committees Grid */}
        <div className="space-y-8">
          {committees.map((committee) => (
            <Card key={committee.id} className="government-card">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div>
                    <CardTitle className="text-xl text-foreground mb-2">
                      {committee.name}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground">
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-medium">Chairman: {committee.chairman}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="self-start lg:self-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {committee.meetingSchedule}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {committee.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Committee Members */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Committee Members
                    </h4>
                    <div className="space-y-2">
                      {committee.members.map((member, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {committee.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground/40 mt-2 mr-3 flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recent Activities */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Recent Activities</h4>
                  <div className="space-y-2">
                    {committee.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <span className="text-sm text-foreground">{activity.activity}</span>
                        <Badge variant="outline" className="text-xs">
                          {new Date(activity.date).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Committee */}
                <div className="pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Committee
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <Card className="government-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Committee Meeting Information
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                All committee meetings are open to the public. Citizens are welcome to observe 
                proceedings and may request to address the committee during designated public 
                comment periods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="government-button-primary">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Meeting Schedule
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Committee Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Committees;