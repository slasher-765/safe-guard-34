import { useState } from "react";
import { School, Users, TrendingUp, Send, Bell, BarChart3, AlertTriangle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { schoolData } from "@/data/app-data";

export const Admin = () => {
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    priority: "medium",
    target: "all",
  });

  const handleSendNotification = () => {
    alert(`Notification sent successfully!\n\nTitle: ${notificationForm.title}\nMessage: ${notificationForm.message}\nPriority: ${notificationForm.priority}\nTarget: ${notificationForm.target}`);
    setNotificationForm({ title: "", message: "", priority: "medium", target: "all" });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-emergency";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  const systemStats = [
    {
      title: "Total Schools",
      value: schoolData.length,
      description: "Enrolled in program",
      icon: School,
      color: "text-info",
    },
    {
      title: "Total Students",
      value: schoolData.reduce((sum, school) => sum + school.studentsCount, 0).toLocaleString(),
      description: "Under protection",
      icon: Users,
      color: "text-success",
    },
    {
      title: "Average Score",
      value: `${Math.round(schoolData.reduce((sum, school) => sum + school.preparednessScore, 0) / schoolData.length)}%`,
      description: "System preparedness",
      icon: TrendingUp,
      color: "text-warning",
    },
    {
      title: "Active Alerts",
      value: "3",
      description: "Requiring attention",
      icon: AlertTriangle,
      color: "text-emergency",
    },
  ];

  // Mock student data for progress tracking
  const mockStudents = [
    { 
      name: "Rajesh Kumar", 
      class: "Class 10", 
      school: "DAV Public School", 
      progress: 85, 
      completedModules: 4,
      lastActive: "2 hours ago",
      drillsCompleted: 3
    },
    { 
      name: "Priya Sharma", 
      class: "Class 12", 
      school: "Government Senior Secondary School", 
      progress: 92, 
      completedModules: 5,
      lastActive: "1 day ago",
      drillsCompleted: 4
    },
    { 
      name: "Arjun Singh", 
      class: "Class 9", 
      school: "Punjab School Education Board", 
      progress: 67, 
      completedModules: 3,
      lastActive: "3 days ago",
      drillsCompleted: 2
    },
    { 
      name: "Simran Kaur", 
      class: "Class 11", 
      school: "Khalsa College", 
      progress: 78, 
      completedModules: 4,
      lastActive: "1 day ago",
      drillsCompleted: 3
    },
    { 
      name: "Manpreet Singh", 
      class: "Class 8", 
      school: "Model School Chandigarh", 
      progress: 45, 
      completedModules: 2,
      lastActive: "1 week ago",
      drillsCompleted: 1
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Manage schools, monitor preparedness, and coordinate emergency responses.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg" className="gap-2">
                <Send className="h-4 w-4" />
                Send Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send System Notification</DialogTitle>
                <DialogDescription>
                  Broadcast important messages to schools and users.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                    placeholder="Notification title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                    placeholder="Notification message"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="hero" onClick={handleSendNotification} className="flex-1">
                    <Bell className="mr-2 h-4 w-4" />
                    Send Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Schedule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
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
        </div>

        {/* Schools Table */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  School Management
                </CardTitle>
                <CardDescription>
                  Monitor preparedness scores and manage school enrollments.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export Data</Button>
                <Button variant="info" size="sm">Add School</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Preparedness Score</TableHead>
                  <TableHead>Last Drill</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schoolData.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell>{school.location}</TableCell>
                    <TableCell>{school.studentsCount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold ${getScoreColor(school.preparednessScore)}`}>
                            {school.preparednessScore}%
                          </span>
                        </div>
                        <Progress value={school.preparednessScore} className="w-full" />
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(school.lastDrill).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={school.preparednessScore >= 85 ? "default" : "secondary"}>
                        {getScoreBadge(school.preparednessScore)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="info" size="sm">
                          Notify
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Student Progress Tracking Section */}
        <Card className="shadow-card-custom mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Students Progress Tracking
            </CardTitle>
            <CardDescription>Real-time monitoring of student engagement and training completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-hero p-2 rounded-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.class} • {student.school}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Active {student.lastActive}
                        </Badge>
                        {student.progress > 70 && (
                          <Badge variant="default" className="text-xs bg-success">
                            High Engagement
                          </Badge>
                        )}
                        {student.progress < 50 && (
                          <Badge variant="destructive" className="text-xs">
                            Needs Attention
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Progress value={student.progress} className="w-24 h-2" />
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{student.completedModules}/6 modules • {student.drillsCompleted} drills completed</p>
                    <div className="flex gap-1 mt-2">
                      <Button size="sm" variant="outline" className="text-xs h-6">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs h-6">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{mockStudents.filter(s => s.progress > 50).length}</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{mockStudents.filter(s => s.progress > 80).length}</p>
                <p className="text-sm text-muted-foreground">High Performers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{mockStudents.filter(s => s.progress < 50).length}</p>
                <p className="text-sm text-muted-foreground">Need Attention</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-info">{mockStudents.reduce((sum, s) => sum + s.drillsCompleted, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Drills Done</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="text-lg">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">IoT Sensors</span>
                  <Badge variant="default">98% Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Communication</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>New school enrolled</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Drill completed</span>
                  <span className="text-muted-foreground">4 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Alert broadcasted</span>
                  <span className="text-muted-foreground">6 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="text-lg">Emergency Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="emergency" size="sm" className="w-full">
                Broadcast Emergency Alert
              </Button>
              <Button variant="warning" size="sm" className="w-full">
                Initiate Evacuation Protocol
              </Button>
              <Button variant="info" size="sm" className="w-full">
                Generate Status Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};