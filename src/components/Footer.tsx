import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Youtube,
  Building
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Officials", href: "/officials" },
    { label: "Committees", href: "/committees" },
    { label: "Transparency", href: "/transparency" },
  ];

  const services = [
    { label: "Ordinances", href: "/documents/ordinances" },
    { label: "Resolutions", href: "/documents/resolutions" },
    { label: "Public Hearings", href: "/hearings" },
    { label: "Announcements", href: "/announcements" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary font-bold">
                SB
              </div>
              <div>
                <h3 className="text-lg font-bold">Sangguniang Bayan</h3>
                <p className="text-sm text-primary-foreground/80">Municipal Council</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/90">
              Dedicated to serving our community with transparency, integrity, and commitment to public welfare.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    to={service.href}
                    className="text-sm text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-foreground/80" />
                <div className="text-sm text-primary-foreground/80">
                  Municipal Hall Building<br />
                  [Municipality Name], [Province]<br />
                  Philippines
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-sm text-primary-foreground/80">
                  (02) 8XXX-XXXX
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-sm text-primary-foreground/80">
                  sanggunian@municipality.gov.ph
                </span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 text-primary-foreground/80" />
                <div className="text-sm text-primary-foreground/80">
                  Mon-Fri: 8:00 AM - 5:00 PM<br />
                  Closed on weekends & holidays
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/80">
            © {currentYear} Sangguniang Bayan. All rights reserved.
          </div>
          
          {/* Social Media */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-primary-foreground/80 mr-2">Follow us:</span>
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-white hover:bg-white/10">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-white hover:bg-white/10">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-white hover:bg-white/10">
              <Youtube className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;