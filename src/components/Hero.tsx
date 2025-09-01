import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Users, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/government-hero.jpg";

const Hero = () => {
  const quickStats = [
    { icon: Users, label: "Council Members", value: "7", color: "bg-blue-500" },
    { icon: FileText, label: "Active Ordinances", value: "156", color: "bg-green-500" },
    { icon: Calendar, label: "Hearings This Month", value: "8", color: "bg-purple-500" },
    { icon: Bell, label: "Recent Updates", value: "23", color: "bg-orange-500" },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src={heroImage}
          alt="Municipal Government Building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full text-white">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                Official Municipal Website
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to
                <br />
                <span className="text-yellow-300">Sangguniang Bayan</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl">
                Serving our community with transparency, accountability, and dedication. 
                Access municipal documents, attend public hearings, and stay informed about local governance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/documents">
                  <Button size="lg" className="government-button-primary w-full sm:w-auto">
                    <FileText className="w-5 h-5 mr-2" />
                    Browse Documents
                  </Button>
                </Link>
                
                <Link to="/hearings">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto">
                    <Calendar className="w-5 h-5 mr-2" />
                    View Hearings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="government-card hover:scale-105 transition-transform duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${stat.color} text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;