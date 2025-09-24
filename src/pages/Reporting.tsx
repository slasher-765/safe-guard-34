import { useState } from "react";
import { Upload, MessageCircle, Send, FileText, Camera, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Reporting = () => {
  const [reportForm, setReportForm] = useState({
    disasterType: "",
    location: "",
    description: "",
    severity: "",
    photos: [] as File[],
  });
  
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "bot",
      message: "Hello! I'm here to help you with post-disaster support. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);

  const disasterTypes = [
    "Earthquake",
    "Flood",
    "Fire",
    "Cyclone",
    "Landslide",
    "Other"
  ];

  const severityLevels = [
    "Low - Minor damage/disruption",
    "Medium - Moderate damage requiring assistance",
    "High - Severe damage requiring immediate attention",
    "Critical - Life-threatening situation"
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    alert(`Report submitted successfully!\n\nType: ${reportForm.disasterType}\nLocation: ${reportForm.location}\nSeverity: ${reportForm.severity}\nDescription: ${reportForm.description}\nPhotos: ${reportForm.photos.length} uploaded\n\nReport ID: #RPT-${Date.now()}`);
    
    // Reset form
    setReportForm({
      disasterType: "",
      location: "",
      description: "",
      severity: "",
      photos: [],
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReportForm({ ...reportForm, photos: [...reportForm.photos, ...files] });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: chatHistory.length + 1,
      sender: "user" as const,
      message: chatMessage,
      timestamp: new Date(),
    };

    // Simulate bot response
    const botResponse = {
      id: chatHistory.length + 2,
      sender: "bot" as const,
      message: getBotResponse(chatMessage),
      timestamp: new Date(),
    };

    setChatHistory([...chatHistory, userMessage, botResponse]);
    setChatMessage("");
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I can help you with:\n• Filing disaster reports\n• Emergency contact information\n• Recovery assistance programs\n• Insurance claim guidance\n\nWhat specific help do you need?";
    } else if (lowerMessage.includes("report") || lowerMessage.includes("damage")) {
      return "To file a damage report, please use the form on this page. Make sure to include:\n• Disaster type and date\n• Exact location\n• Photos of damage\n• Description of impact\n\nIs there anything specific you'd like help with regarding your report?";
    } else if (lowerMessage.includes("insurance") || lowerMessage.includes("claim")) {
      return "For insurance claims:\n• Contact your insurance provider immediately\n• Document all damage with photos\n• Keep receipts for temporary repairs\n• Our report can support your claim\n\nWould you like contact information for major insurance providers?";
    } else {
      return "Thank you for your message. I'm here to assist with post-disaster reporting and support. You can ask me about filing reports, emergency contacts, or recovery assistance. How can I help you today?";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Post-Disaster Reporting & Support</h1>
          <p className="text-xl text-muted-foreground">
            Submit incident reports, access support services, and get assistance with recovery efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Submit Disaster Report
                </CardTitle>
                <CardDescription>
                  Provide details about the incident to help us coordinate appropriate response and support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="disaster-type">Disaster Type *</Label>
                      <Select 
                        value={reportForm.disasterType} 
                        onValueChange={(value) => setReportForm({ ...reportForm, disasterType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select disaster type" />
                        </SelectTrigger>
                        <SelectContent>
                          {disasterTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={reportForm.location}
                          onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                          placeholder="Enter affected location"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level *</Label>
                    <Select 
                      value={reportForm.severity} 
                      onValueChange={(value) => setReportForm({ ...reportForm, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={reportForm.description}
                      onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                      placeholder="Describe the situation, damage, and any immediate needs..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photos">Photos (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        <span className="text-primary hover:underline">Click to upload photos</span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </Label>
                      <Input
                        id="photo-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      {reportForm.photos.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {reportForm.photos.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Support Panel */}
          <div className="space-y-6">
            {/* Chatbot */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Support Assistant
                </CardTitle>
                <CardDescription>
                  Get instant help and guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={chatOpen} onOpenChange={setChatOpen}>
                  <DialogTrigger asChild>
                    <Button variant="info" className="w-full">
                      Start Chat Support
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Support Chat</DialogTitle>
                      <DialogDescription>
                        Our AI assistant is here to help with your questions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="h-64 overflow-y-auto space-y-3 p-3 border rounded-lg">
                        {chatHistory.map((chat) => (
                          <div
                            key={chat.id}
                            className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-2 rounded-lg text-sm ${
                                chat.sender === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              <p className="whitespace-pre-line">{chat.message}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {chat.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <form onSubmit={handleChatSubmit} className="flex gap-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1"
                        />
                        <Button type="submit" size="icon" variant="hero">
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Fast access to essential services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="emergency" className="w-full justify-start" size="sm">
                  Emergency Services
                </Button>
                <Button variant="warning" className="w-full justify-start" size="sm">
                  Insurance Support
                </Button>
                <Button variant="info" className="w-full justify-start" size="sm">
                  Recovery Resources
                </Button>
                <Button variant="success" className="w-full justify-start" size="sm">
                  Community Support
                </Button>
              </CardContent>
            </Card>

            {/* Helplines */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>24/7 Helplines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Disaster Helpline</span>
                  <span className="font-mono font-bold">1078</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mental Health Support</span>
                  <span className="font-mono font-bold">1800-599-0019</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Relief Coordination</span>
                  <span className="font-mono font-bold">1800-233-3663</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};