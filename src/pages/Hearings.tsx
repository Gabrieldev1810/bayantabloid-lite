import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Video,
  Play,
  Download,
  Bell,
  ChevronRight
} from "lucide-react";

const Hearings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Sample data - in a real app, this would come from an API
  const hearings = [
    {
      id: 1,
      title: "Public Hearing on Municipal Budget for FY 2024",
      description: "Discussion and public consultation on the proposed municipal budget allocation for the fiscal year 2024.",
      type: "Public Hearing",
      date: "2024-02-15",
      time: "2:00 PM",
      venue: "Municipal Hall - Session Hall",
      status: "Scheduled",
      agenda: [
        "Opening and invocation",
        "Presentation of proposed budget",
        "Public comments and questions",
        "Committee deliberation",
        "Closing remarks"
      ],
      documents: [
        { name: "Proposed Budget 2024", size: "3.2 MB" },
        { name: "Budget Briefing Materials", size: "1.8 MB" }
      ],
      expectedAttendees: 45,
      livestream: true
    },
    {
      id: 2,
      title: "Committee Hearing on Infrastructure Development",
      description: "Review of ongoing infrastructure projects and discussion of new development proposals.",
      type: "Committee Hearing",
      date: "2024-02-20",
      time: "10:00 AM",
      venue: "Municipal Hall - Committee Room A",
      status: "Scheduled",
      agenda: [
        "Roll call and opening",
        "Status report on ongoing projects",
        "New project proposals",
        "Budget allocation discussion",
        "Next steps and adjournment"
      ],
      documents: [
        { name: "Infrastructure Report Q4 2023", size: "2.1 MB" },
        { name: "Project Proposals 2024", size: "4.5 MB" }
      ],
      expectedAttendees: 25,
      livestream: false
    },
    {
      id: 3,
      title: "Special Session on Environmental Protection Ordinance",
      description: "Special session to discuss and vote on the proposed Environmental Protection Ordinance.",
      type: "Special Session",
      date: "2024-02-10",
      time: "3:00 PM",
      venue: "Municipal Hall - Session Hall",
      status: "Completed",
      agenda: [
        "Call to order",
        "Reading of the proposed ordinance",
        "Committee report presentation",
        "Floor discussions and amendments",
        "Voting and resolution"
      ],
      documents: [
        { name: "Environmental Protection Ordinance Draft", size: "1.5 MB" },
        { name: "Committee Report", size: "0.9 MB" }
      ],
      attendees: 38,
      outcome: "Ordinance approved with amendments",
      videoRecording: "Available",
      journalMinutes: "Published"
    },
    {
      id: 4,
      title: "Regular Session - January 2024",
      description: "Monthly regular session covering various municipal matters and legislative business.",
      type: "Regular Session",
      date: "2024-01-30",
      time: "2:00 PM",
      venue: "Municipal Hall - Session Hall",
      status: "Completed",
      agenda: [
        "Opening ceremonies",
        "Approval of previous minutes",
        "Committee reports",
        "New business items",
        "Public participation",
        "Adjournment"
      ],
      documents: [
        { name: "Session Agenda", size: "0.3 MB" },
        { name: "Committee Reports", size: "2.7 MB" },
        { name: "Session Minutes", size: "1.2 MB" }
      ],
      attendees: 42,
      videoRecording: "Available",
      journalMinutes: "Published"
    }
  ];

  const upcomingHearings = hearings.filter(h => h.status === "Scheduled");
  const pastHearings = hearings.filter(h => h.status === "Completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-500";
      case "Ongoing": return "bg-green-500";
      case "Completed": return "bg-gray-500";
      case "Cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const HearingCard = ({ hearing, isUpcoming = true }: { hearing: any, isUpcoming?: boolean }) => (
    <Card className="government-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{hearing.type}</Badge>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(hearing.status)}`} />
              <span className="text-xs text-muted-foreground">{hearing.status}</span>
              {hearing.livestream && isUpcoming && (
                <Badge variant="outline" className="text-xs">
                  <Video className="w-3 h-3 mr-1" />
                  Live Stream
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl">{hearing.title}</CardTitle>
          </div>
          
          {isUpcoming && (
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notify Me
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {hearing.description}
        </p>

        {/* Date, Time, and Venue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <div>
              <p className="font-medium">{formatDate(hearing.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <div>
              <p className="font-medium">{hearing.time}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <div>
              <p className="font-medium">{hearing.venue}</p>
            </div>
          </div>
        </div>

        {/* Agenda */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Agenda</h4>
          <div className="space-y-2">
            {hearing.agenda.map((item: string, index: number) => (
              <div key={index} className="flex items-start text-sm text-muted-foreground">
                <span className="font-medium text-primary mr-3 min-w-[1.5rem]">{index + 1}.</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Documents and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Documents */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </h4>
            <div className="space-y-2">
              {hearing.documents.map((doc: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Additional Information
            </h4>
            <div className="space-y-3">
              {isUpcoming ? (
                <div className="text-sm">
                  <p className="text-muted-foreground">Expected Attendees</p>
                  <p className="font-medium">{hearing.expectedAttendees} participants</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Attendees</p>
                    <p className="font-medium">{hearing.attendees} participants</p>
                  </div>
                  {hearing.outcome && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Outcome</p>
                      <p className="font-medium">{hearing.outcome}</p>
                    </div>
                  )}
                </div>
              )}
              
              {!isUpcoming && hearing.videoRecording && (
                <Button variant="outline" size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Recording
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          {isUpcoming ? (
            <>
              <Button className="government-button-primary flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
              {hearing.livestream && (
                <Button variant="outline" className="flex-1">
                  <Video className="w-4 h-4 mr-2" />
                  Join Live Stream
                </Button>
              )}
            </>
          ) : (
            <>
              {hearing.journalMinutes && (
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  View Minutes
                </Button>
              )}
              {hearing.videoRecording && (
                <Button variant="outline" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Recording
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Public Hearings</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Hearings & Sessions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about upcoming public hearings, committee meetings, and legislative sessions. 
            Access documents, watch live streams, and participate in democratic processes.
          </p>
        </div>

        {/* Hearings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming Hearings ({upcomingHearings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Hearings ({pastHearings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-8">
            <div className="space-y-6">
              {upcomingHearings.map(hearing => (
                <HearingCard key={hearing.id} hearing={hearing} isUpcoming={true} />
              ))}
              
              {upcomingHearings.length === 0 && (
                <Card className="government-card">
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Hearings</h3>
                    <p className="text-muted-foreground">
                      Check back soon for updates on scheduled hearings and sessions.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            <div className="space-y-6">
              {pastHearings.map(hearing => (
                <HearingCard key={hearing.id} hearing={hearing} isUpcoming={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Information Card */}
        <Card className="government-card mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Participate in Local Democracy
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              All public hearings are open to citizens. Your participation and input are valuable 
              to our decision-making process. Join us in shaping our community's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="government-button-primary">
                <Bell className="w-4 h-4 mr-2" />
                Get Hearing Notifications
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Participation Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hearings;