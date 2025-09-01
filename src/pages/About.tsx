import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building, Target, Eye, Heart, Users, Calendar, MapPin } from "lucide-react";

const About = () => {
  const milestones = [
    { year: "1901", event: "Establishment of Municipal Government" },
    { year: "1972", event: "Formation of Sangguniang Bayan under Presidential Decree" },
    { year: "1991", event: "Local Government Code Implementation" },
    { year: "2019", event: "Digital Governance Initiative Launch" },
    { year: "2024", event: "Launch of Online Legislative Portal" },
  ];

  const coreValues = [
    {
      icon: Heart,
      title: "Integrity",
      description: "We uphold the highest standards of honesty and ethical conduct in all our actions."
    },
    {
      icon: Users,
      title: "Service",
      description: "We are committed to serving our constituents with dedication and responsiveness."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in governance and public service delivery."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We believe in open and accountable governance for all citizens."
    }
  ];

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">About Us</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sangguniang Bayan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The legislative body of our municipality, dedicated to serving the community 
            through effective governance, transparency, and public service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* History Section */}
          <div>
            <Card className="government-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Building className="w-6 h-6 mr-3 text-primary" />
                  Our History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  The Sangguniang Bayan has been the cornerstone of local governance in our municipality 
                  for over a century. Established in 1901 during the American colonial period, it has 
                  evolved from a simple consultative body to a modern legislative institution.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Throughout the decades, we have adapted to changing times while maintaining our 
                  commitment to public service. From the implementation of the Local Government Code 
                  in 1991 to our recent digital transformation initiatives, we continue to modernize 
                  our operations to better serve our constituents.
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Milestones</h4>
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Badge variant="secondary" className="font-mono">
                        {milestone.year}
                      </Badge>
                      <span className="text-muted-foreground text-sm">
                        {milestone.event}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission & Vision */}
          <div className="space-y-6">
            <Card className="government-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Target className="w-6 h-6 mr-3 text-primary" />
                  Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To enact responsive legislation, promote transparency in governance, and ensure 
                  the effective delivery of public services that enhance the quality of life for 
                  all residents of our municipality.
                </p>
              </CardContent>
            </Card>

            <Card className="government-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Eye className="w-6 h-6 mr-3 text-primary" />
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  A progressive municipality with sustainable development, empowered citizens, 
                  and a government that is transparent, accountable, and responsive to the needs 
                  of every resident.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Core Values</h2>
            <p className="text-muted-foreground">
              The principles that guide our actions and decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="government-card text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary text-primary-foreground">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Functions & Responsibilities */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="text-2xl">Functions & Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Legislative Functions</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Enact ordinances and approve resolutions</li>
                  <li>• Review and approve municipal budget</li>
                  <li>• Exercise oversight functions over executive departments</li>
                  <li>• Conduct public hearings on proposed legislation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Public Service</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Represent constituent interests and concerns</li>
                  <li>• Facilitate community development programs</li>
                  <li>• Promote transparency and good governance</li>
                  <li>• Ensure compliance with national and local laws</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;