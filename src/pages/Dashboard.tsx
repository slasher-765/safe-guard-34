import { ArrowRight, Shield, Users, AlertTriangle, TrendingUp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { AlertBanner } from "@/components/AlertBanner";
import { alertsData } from "@/data/app-data";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userInstitution");
    localStorage.removeItem("username");
    localStorage.removeItem("onboardingComplete");
    localStorage.removeItem("registrationComplete");

    toast({
      title: "Logged out successfully",
      description: "You have been logged out of SafeGuard Punjab",
    });

    navigate("/auth");
  };
  const stats = [
    {
      title: "Active Alerts",
      value: alertsData.filter(alert => alert.type === 'emergency').length,
      description: "Current emergency alerts",
      icon: AlertTriangle,
      color: "text-emergency",
    },
    {
      title: "Students Trained",
      value: "15,420",
      description: "Completed safety training",
      icon: Users,
      color: "text-success",
    },
    {
      title: "Schools Enrolled",
      value: "148",
      description: "Active in the program",
      icon: Shield,
      color: "text-info",
    },
    {
      title: "Preparedness Score",
      value: "82%",
      description: "System-wide average",
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  const quickActions = [
    {
      title: "Start Training Module",
      description: "Begin or continue your disaster preparedness training",
      icon: Shield,
      link: "/training",
      variant: "hero" as const,
    },
    {
      title: "Emergency Contacts",
      description: "Access emergency services and helplines",
      icon: AlertTriangle,
      link: "/emergency",
      variant: "emergency" as const,
    },
    {
      title: "Report Incident",
      description: "Submit post-disaster reports and get support",
      icon: Users,
      link: "/reporting",
      variant: "warning" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AlertBanner />
      
      <main className="container mx-auto px-4 py-8">
        {/* Logout Button */}
        <div className="flex justify-end mb-6">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Stay Safe, Stay Prepared
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your comprehensive disaster management platform for schools and communities. 
            Learn, prepare, and respond effectively to emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/training">
                Start Training Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/emergency">View Emergency Info</Link>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card-custom hover:shadow-glow transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-hero">
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant={action.variant} className="w-full" asChild>
                    <Link to={action.link}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Alerts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Recent Alerts</h2>
            <Button variant="outline" asChild>
              <Link to="/emergency">View All Alerts</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {alertsData.slice(0, 3).map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${
                alert.type === 'emergency' ? 'border-l-emergency' :
                alert.type === 'warning' ? 'border-l-warning' : 'border-l-info'
              }`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.type === 'emergency' ? 'bg-emergency/10 text-emergency' :
                      alert.type === 'warning' ? 'bg-warning/10 text-warning' :
                      'bg-info/10 text-info'
                    }`}>
                      {alert.type.toUpperCase()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};