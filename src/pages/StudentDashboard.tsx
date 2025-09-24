import { useState, useEffect } from "react";
import { Play, Trophy, Target, Clock, Users, Star, BookOpen, Zap, Bell, AlertTriangle, MapPin, Leaf, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GameificationStats } from "@/components/GameificationStats";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import { PersistentAlertBanner } from "@/components/PersistentAlertBanner";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { disasterModules } from "@/data/app-data";

export const StudentDashboard = () => {
  const [userName, setUserName] = useState("");
  const [userInstitution, setUserInstitution] = useState("");
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Punjab disaster alerts
  const punjabAlerts = [
    {
      id: 1,
      type: "weather",
      title: "Heavy Rain Alert - Active",
      message: "Moderate to heavy rainfall expected in Ludhiana and surrounding areas. Stay safe indoors.",
      district: "Ludhiana",
      severity: "moderate",
      time: "30 mins ago"
    },
    {
      id: 2,
      type: "flood",
      title: "Flood Watch - Active",
      message: "Water levels rising in Sutlej river. Residents near riverbank advised to stay alert.",
      district: "Ferozepur", 
      severity: "high",
      time: "2 hours ago"
    }
  ];

  // Nature preservation thoughts
  const naturalThoughts = [
    {
      id: 1,
      title: "Plant a Tree Today 🌳",
      message: "Trees act as natural barriers against floods and landslides. Plant native species to strengthen your community's resilience.",
      action: "Learn Tree Planting",
      impact: "Reduces flood risk by 40%"
    },
    {
      id: 2,
      title: "Water Conservation 💧",
      message: "Save water today for tomorrow's emergencies. Every drop counts in building disaster-resilient communities.",
      action: "Start Water Saving",
      impact: "Critical for drought preparedness"
    }
  ];

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "Student");
    setUserInstitution(localStorage.getItem("userInstitution") || "");
    
    // Load completed modules from localStorage
    const completed = localStorage.getItem("completedModules");
    if (completed) {
      setCompletedModules(JSON.parse(completed));
    }
  }, []);

  const calculateOverallProgress = () => {
    return Math.round((completedModules.length / disasterModules.length) * 100);
  };

  const getNextRecommendedModule = () => {
    return disasterModules.find(module => !completedModules.includes(module.id));
  };

  const weeklyActivities = [
    { day: "Mon", completed: true, type: "quiz" },
    { day: "Tue", completed: true, type: "drill" },
    { day: "Wed", completed: false, type: "module" },
    { day: "Thu", completed: false, type: "quiz" },
    { day: "Fri", completed: false, type: "drill" },
  ];

  const handleShareAchievement = (achievement: string) => {
    const shareText = `🏆 I just completed "${achievement}" on SafeGuard Punjab! 🚀 Building disaster preparedness skills for a safer community. Join me in making Punjab disaster-ready! #SafeGuardPunjab #DisasterPreparedness #PunjabGovt #SafetyFirst`;
    
    if (navigator.share) {
      navigator.share({
        title: 'SafeGuard Punjab Achievement',
        text: shareText,
        url: window.location.origin
      }).catch(() => {
        // Fallback if share fails
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Achievement Ready to Share! 📱",
          description: "Share text copied to clipboard. Paste it on your favorite social media platform.",
        });
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Achievement Ready to Share! 📱", 
        description: "Share text copied to clipboard. Paste it on your favorite social media platform.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Persistent Alert Banner */}
      <PersistentAlertBanner />
      
      <div className="py-6">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 🎒</h1>
            <p className="text-muted-foreground">{userInstitution}</p>
          </div>

          {/* Emergency Contacts Section */}
          <div className="mb-8">
            <EmergencyContacts />
          </div>

        {/* Gamification Stats */}
        <GameificationStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended Module */}
            {getNextRecommendedModule() && (
              <Card className="shadow-glow border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Recommended for You</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">
                        {getNextRecommendedModule()?.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {getNextRecommendedModule()?.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getNextRecommendedModule()?.duration}
                        </div>
                        <Badge variant="outline">Next Level</Badge>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate("/training")}
                      variant="hero"
                      size="lg"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-glow transition-all hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-gradient-hero p-3 rounded-xl inline-block mb-3">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Training Modules</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Interactive disaster preparedness courses
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate("/training")}
                    >
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-glow transition-all hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-gradient-emergency p-3 rounded-xl inline-block mb-3">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Virtual Drills</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Practice emergency response scenarios
                    </p>
                    <Button 
                      variant="emergency" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate("/virtual-drill")}
                    >
                      Start Drill
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-glow transition-all hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-gradient-warning p-3 rounded-xl inline-block mb-3">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Emergency Help</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Quick access to emergency contacts
                    </p>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate("/emergency")}
                    >
                      Get Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-success" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{calculateOverallProgress()}%</span>
                    </div>
                    <Progress value={calculateOverallProgress()} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {disasterModules.map((module) => (
                      <div key={module.id} className="text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          completedModules.includes(module.id) 
                            ? "bg-success text-white" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {completedModules.includes(module.id) ? (
                            <Trophy className="h-6 w-6" />
                          ) : (
                            <BookOpen className="h-6 w-6" />
                          )}
                        </div>
                        <p className="text-xs font-medium">{module.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {completedModules.includes(module.id) ? "Completed" : "Not Started"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week's Activity</CardTitle>
                <CardDescription>Keep up your learning streak!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.completed ? "bg-success text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {activity.completed ? (
                            <Trophy className="h-4 w-4" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </div>
                        <span className="font-medium">{activity.day}</span>
                      </div>
                      <Badge variant={activity.completed ? "default" : "outline"}>
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                    <div className="bg-gradient-hero p-2 rounded-lg">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">First Timer</p>
                      <p className="text-xs text-muted-foreground">Completed first drill</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                    <div className="bg-gradient-success p-2 rounded-lg">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quick Learner</p>
                      <p className="text-xs text-muted-foreground">Completed quiz in under 2 mins</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};