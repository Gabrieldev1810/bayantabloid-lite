import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";

const Officials = () => {
  // Sample data - in a real app, this would come from an API
  const officials = [
    {
      id: 1,
      name: "Hon. Maria Santos",
      position: "Sangguniang Bayan Chairwoman / Vice Mayor",
      photo: null,
      email: "chairwoman@municipality.gov.ph",
      phone: "(02) 8XXX-XXXX",
      committee: "Presiding Officer",
      termStart: "2022-06-30",
      termEnd: "2025-06-30",
      bio: "Hon. Maria Santos brings over 15 years of public service experience to her role as Chairwoman of the Sangguniang Bayan. She is committed to transparent governance and community development."
    },
    {
      id: 2,
      name: "Hon. Juan dela Cruz",
      position: "Sangguniang Bayan Member",
      photo: null,
      email: "j.delacruz@municipality.gov.ph",
      phone: "(02) 8XXX-XXXX",
      committee: "Committee on Finance & Appropriations",
      termStart: "2022-06-30",
      termEnd: "2025-06-30",
      bio: "A former businessman turned public servant, Hon. Juan dela Cruz chairs the Committee on Finance and Appropriations, focusing on fiscal responsibility and economic development."
    },
    {
      id: 3,
      name: "Hon. Anna Reyes",
      position: "Sangguniang Bayan Member",
      photo: null,
      email: "a.reyes@municipality.gov.ph",
      phone: "(02) 8XXX-XXXX",
      committee: "Committee on Health & Social Services",
      termStart: "2022-06-30",
      termEnd: "2025-06-30",
      bio: "With a background in social work, Hon. Anna Reyes advocates for health and social services, ensuring that vulnerable sectors receive adequate support and attention."
    },
    {
      id: 4,
      name: "Hon. Roberto Martinez",
      position: "Sangguniang Bayan Member",
      photo: null,
      email: "r.martinez@municipality.gov.ph",
      phone: "(02) 8XXX-XXXX",
      committee: "Committee on Infrastructure & Public Works",
      termStart: "2022-06-30",
      termEnd: "2025-06-30",
      bio: "An engineer by profession, Hon. Roberto Martinez leads the Infrastructure Committee, overseeing the planning and implementation of public works projects."
    },
    {
      id: 5,
      name: "Hon. Carmen Lopez",
      position: "Sangguniang Bayan Member",
      photo: null,
      email: "c.lopez@municipality.gov.ph",
      phone: "(02) 8XXX-XXXX",
      committee: "Committee on Education & Culture",
      termStart: "2022-06-30",
      termEnd: "2025-06-30",
      bio: "A former educator, Hon. Carmen Lopez champions education and cultural preservation, working to improve educational facilities and promote local heritage."
    },
    {
      id: 6,
      name: "Hon. Michael Torres",
      position: "Sangguniang Bayan Member",
      photo: null,
      email: "m.torres@municipality.gov.ph",
      phone: "(02) 8XXX-XXXX",
      committee: "Committee on Environment & Natural Resources",
      termStart: "2022-06-30",
      termEnd: "2025-06-30",
      bio: "An environmental advocate, Hon. Michael Torres leads efforts in environmental protection, waste management, and sustainable development initiatives."
    },
    {
      id: 7,
      name: "Hon. Patricia Garcia",
      position: "Sangguniang Bayan Member",
      photo: null,
      email: "p.garcia@municipality.gov.ph",
      phone: "(02) 8XXX-XXXX",
      committee: "Committee on Peace & Order",
      termStart: "2022-06-30",
      termEnd: "2025-06-30",
      bio: "With experience in law enforcement, Hon. Patricia Garcia focuses on public safety, peace and order, and community security programs."
    }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Municipal Officials</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sangguniang Bayan Members
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated public servants who represent your interests and work 
            towards the betterment of our municipality.
          </p>
        </div>

        {/* Officials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {officials.map((official, index) => (
            <Card key={official.id} className={`government-card ${index === 0 ? 'lg:col-span-2' : ''}`}>
              <CardContent className="p-6">
                <div className={`flex flex-col ${index === 0 ? 'md:flex-row' : ''} space-y-4 md:space-y-0 md:space-x-6`}>
                  
                  {/* Photo/Avatar */}
                  <div className={`flex-shrink-0 ${index === 0 ? 'self-start' : 'self-center'}`}>
                    <div className={`${index === 0 ? 'w-32 h-32' : 'w-24 h-24'} rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold ${index === 0 ? 'text-2xl' : 'text-lg'} mx-auto`}>
                      {getInitials(official.name)}
                    </div>
                  </div>

                  {/* Official Information */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className={`${index === 0 ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>
                        {official.name}
                      </h2>
                      <p className="text-primary font-semibold">
                        {official.position}
                      </p>
                      {official.committee && (
                        <Badge variant="secondary" className="mt-2">
                          {official.committee}
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {official.bio}
                    </p>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 mr-2" />
                          <a href={`mailto:${official.email}`} className="hover:text-primary transition-colors">
                            {official.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{official.phone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Term: {formatDate(official.termStart)} - {formatDate(official.termEnd)}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Municipal Hall</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Button */}
                    <div className="pt-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Official
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <Card className="government-card max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Get in Touch with Your Representatives
              </h3>
              <p className="text-muted-foreground mb-6">
                Our Sangguniang Bayan members are here to serve you. Whether you have concerns, 
                suggestions, or need assistance with municipal matters, don't hesitate to reach out 
                to your elected representatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="government-button-primary">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Municipal Hall
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Directory
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Officials;