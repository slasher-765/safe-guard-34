import { useState } from "react";
import { Phone, MapPin, AlertTriangle, Clock, Users, Hospital, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EmergencyContact {
  id: number;
  name: string;
  number: string;
  type: string;
  description: string;
  priority: "high" | "medium" | "low";
  district?: string;
  available24x7: boolean;
}

export const EmergencyContacts = () => {
  const [expandedContact, setExpandedContact] = useState<number | null>(null);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: 1,
      name: "Punjab Emergency Services",
      number: "112",
      type: "general",
      description: "All emergency services - Police, Fire, Medical",
      priority: "high",
      available24x7: true
    },
    {
      id: 2,
      name: "Punjab Disaster Management",
      number: "0172-2864446",
      type: "disaster",
      description: "State Disaster Management Authority",
      priority: "high",
      district: "Chandigarh",
      available24x7: true
    },
    {
      id: 3,
      name: "Punjab Police Control Room",
      number: "100",
      type: "police",
      description: "Direct police assistance and crime reporting",
      priority: "high",
      available24x7: true
    },
    {
      id: 4,
      name: "Fire Emergency Services",
      number: "101",
      type: "fire",
      description: "Fire fighting and rescue operations",
      priority: "high",
      available24x7: true
    },
    {
      id: 5,
      name: "Medical Emergency",
      number: "108",
      type: "medical",
      description: "Ambulance and medical emergency services",
      priority: "high",
      available24x7: true
    },
    {
      id: 6,
      name: "Women Helpline",
      number: "1091",
      type: "women",
      description: "Women safety and support services",
      priority: "medium",
      available24x7: true
    },
    {
      id: 7,
      name: "Child Helpline",
      number: "1098",
      type: "child",
      description: "Child protection and support services",
      priority: "medium",
      available24x7: true
    },
    {
      id: 8,
      name: "Tourist Helpline",
      number: "1363",
      type: "tourist",
      description: "Tourist assistance and information",
      priority: "low",
      available24x7: false
    }
  ];

  const getContactIcon = (type: string) => {
    switch (type) {
      case "general":
        return <Shield className="h-5 w-5" />;
      case "disaster":
        return <AlertTriangle className="h-5 w-5" />;
      case "police":
        return <Shield className="h-5 w-5" />;
      case "fire":
        return <AlertTriangle className="h-5 w-5" />;
      case "medical":
        return <Hospital className="h-5 w-5" />;
      case "women":
        return <Users className="h-5 w-5" />;
      case "child":
        return <Users className="h-5 w-5" />;
      case "tourist":
        return <MapPin className="h-5 w-5" />;
      default:
        return <Phone className="h-5 w-5" />;
    }
  };

  const getContactColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-gradient-emergency text-emergency-foreground";
      case "medium":
        return "bg-gradient-hero text-white";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleCall = (number: string, name: string) => {
    if (confirm(`Are you sure you want to call ${name} (${number})?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  const priorityContacts = emergencyContacts.filter(contact => contact.priority === "high");
  const otherContacts = emergencyContacts.filter(contact => contact.priority !== "high");

  return (
    <div className="space-y-6">
      {/* Critical Emergency Contacts */}
      <Card className="border-emergency/20 shadow-emergency">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-emergency animate-pulse" />
            <CardTitle className="text-lg text-emergency">Critical Emergency Contacts</CardTitle>
          </div>
          <CardDescription>
            Life-threatening emergencies - Call immediately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {priorityContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 bg-emergency/5 border border-emergency/20 rounded-lg hover:shadow-glow transition-all cursor-pointer"
                onClick={() => handleCall(contact.number, contact.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-emergency p-2 rounded-lg text-white">
                    {getContactIcon(contact.type)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{contact.name}</p>
                    <p className="text-lg font-bold text-emergency">{contact.number}</p>
                    {contact.available24x7 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-success" />
                        <span className="text-xs text-success">24x7 Available</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="emergency"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(contact.number, contact.name);
                  }}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Other Emergency Services</CardTitle>
          <CardDescription>
            Additional support and assistance contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {otherContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-all cursor-pointer"
                onClick={() => setExpandedContact(expandedContact === contact.id ? null : contact.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getContactColor(contact.priority)}`}>
                    {getContactIcon(contact.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-lg font-semibold">{contact.number}</p>
                    {expandedContact === contact.id && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-muted-foreground">{contact.description}</p>
                        {contact.district && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-info" />
                            <span className="text-xs text-info">{contact.district}</span>
                          </div>
                        )}
                        {contact.available24x7 ? (
                          <Badge variant="outline" className="text-xs">24x7 Available</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Business Hours</Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(contact.number, contact.name);
                  }}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
