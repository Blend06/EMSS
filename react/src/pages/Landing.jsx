import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Calendar, 
  GraduationCap, 
  Shield, 
  Zap, 
  Star,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Efficiently organize and manage all your courses, curricula, and learning materials in one place."
    },
    {
      icon: Users,
      title: "Student Portal",
      description: "Comprehensive student management system with enrollment, progress tracking, and communication tools."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get detailed insights into student performance, attendance, and institutional metrics."
    },
    {
      icon: Calendar,
      title: "Schedule Management",
      description: "Smart scheduling system for classes, exams, events, and resource allocation."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with full compliance to educational data protection standards."
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Lightning-fast performance with 99.9% uptime guarantee for uninterrupted learning."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal, Lincoln High School",
      content: "Academix Pro transformed how we manage our institution. Student engagement increased by 40%.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "IT Director, Springfield University",
      content: "The most intuitive school management system we've used. Setup was seamless and support is excellent.",
      rating: 5
    },
    {
      name: "Amanda Rodriguez",
      role: "Teacher, Maple Elementary",
      content: "Finally, a system that teachers actually love using. It saves me hours every week.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-4 text-sm font-medium">
                🎓 #1 School Management Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Transform Your
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Educational </span>
                Institution
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Streamline operations, enhance learning experiences, and drive academic success with our comprehensive school management solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Professional Solution
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Expert Support
                </span>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img 
                src={heroImage} 
                alt="Students using Academix Pro" 
                className="rounded-lg shadow-strong w-full h-auto animate-float"
              />
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-medium">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">500+ Schools</p>
                    <p className="text-xs text-muted-foreground">Trust Academix Pro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage Your School
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From enrollment to graduation, handle every aspect of your educational institution with ease.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:scale-105 border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Loved by Educators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what educators are saying about their experience with Academix Pro.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are already using Academix Pro to streamline their operations and enhance learning outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Contact Us Today
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;