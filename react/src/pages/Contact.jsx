import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MapComponent from "@/components/MapComponent";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock
} from "lucide-react";

const Contact = () => {

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@academixpro.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+383 44 123 456",
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Pristina, Kosovo",
      description: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "24/7 Available",
      description: "We're here when you need us"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Build the Future of 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Education Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about Academix Pro? Want to schedule a demo? We're here to help you 
              transform your educational institution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-border hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                  <p className="text-lg font-medium text-primary mb-1">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content - Just Map and Additional Info */}
          <div className="max-w-4xl mx-auto">
            {/* Interactive Map */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Visit Our Office</h3>
              <p className="text-muted-foreground mb-6">
                Located in the heart of Pristina, Kosovo. Our office is easily accessible 
                and we welcome visitors by appointment.
              </p>
              <MapComponent />
            </div>

            {/* Additional Information */}
            <Card className="mt-8 border-border">
              <CardHeader>
                <CardTitle>Quick Response Guarantee</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Demo Requests</p>
                    <p className="text-sm text-muted-foreground">Scheduled within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">General Inquiries</p>
                    <p className="text-sm text-muted-foreground">Response within 4 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Technical Support</p>
                    <p className="text-sm text-muted-foreground">Available 24/7 for clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't wait to revolutionize your educational institution. Start your free trial today.
          </p>
          <Button variant="secondary" size="lg">
            Contact Our Team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;