import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Award,
  Users,
  Globe,
  TrendingUp,
  Shield
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, ensuring our platform exceeds expectations."
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description: "Every decision we make is focused on improving educational outcomes for students."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions for modern education."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We maintain the highest standards of data security and privacy protection."
    }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Schools Served" },
    { icon: Globe, number: "50+", label: "Countries" },
    { icon: TrendingUp, number: "99.9%", label: "Uptime" },
    { icon: Award, number: "15+", label: "Industry Awards" }
  ];

  const team = [
    {
      name: "Dr. Elena Vasquez",
      role: "CEO & Founder",
      description: "Former educator with 15 years of experience in school administration and educational technology."
    },
    {
      name: "Marcus Thompson",
      role: "CTO",
      description: "Tech veteran with expertise in scalable educational platforms and data security."
    },
    {
      name: "Sarah Kim",
      role: "Head of Product",
      description: "Product strategist focused on creating intuitive experiences for educators and students."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Empowering Education Through 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Founded by educators, for educators. Academix Pro was born from the vision of creating 
              a comprehensive platform that simplifies school management while enhancing the learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize access to high-quality educational technology by providing institutions 
                of all sizes with powerful, intuitive tools that streamline operations and enhance 
                learning outcomes.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that by removing administrative burdens from educators, we can help them 
                focus on what matters most: inspiring and educating the next generation.
              </p>
              <Link to="/contact">
                <Button variant="educational" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-border hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make and every feature we build.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border hover:shadow-medium transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet the Minds Behind Academix Pro
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A diverse team of educators, technologists, and innovators working together to transform education.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="outline">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Whether you're an educator, administrator, or technology enthusiast, we'd love to have you on board.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Get in Touch
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;