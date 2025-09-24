import { Phone, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { emergencyContacts, alertsData } from "@/data/app-data";
import { useState } from "react";

export const Emergency = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [simulatedAlert, setSimulatedAlert] = useState(false);

  const handleEmergencyCall = (number: string, type: string) => {
    // Simulate emergency call
    alert(`Calling ${type} at ${number}...\n\nThis is a simulation. In a real emergency, this would dial the number.`);
  };

  const triggerIoTAlert = () => {
    setSimulatedAlert(true);
    setTimeout(() => setSimulatedAlert(false), 5000);
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Flame: () => <div className="w-6 h-6 text-emergency">🔥</div>,
      Shield: () => <div className="w-6 h-6 text-info">🛡️</div>,
      Heart: () => <div className="w-6 h-6 text-emergency">❤️</div>,
      Phone: () => <div className="w-6 h-6 text-success">📞</div>,
    };
    return icons[iconName] || icons.Phone;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-emergency">Emergency Response Portal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick access to emergency services, real-time alerts, and immediate response tools.
          </p>
        </div>

        {/* System Status */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-success">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isOnline ? (
                    <>
                      <Wifi className="h-5 w-5 text-success" />
                      <span className="font-medium">System Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-5 w-5 text-emergency" />
                      <span className="font-medium">System Offline</span>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-success border-success">
                    All Services Active
                  </Badge>
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={triggerIoTAlert}
                  >
                    Simulate IoT Alert
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simulated Alert */}
        {simulatedAlert && (
          <div className="mb-8 animate-shake">
            <Card className="border-l-4 border-l-emergency bg-emergency/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-emergency animate-pulse-emergency" />
                  <div>
                    <p className="font-semibold text-emergency">IoT SENSOR ALERT TRIGGERED</p>
                    <p className="text-sm text-muted-foreground">
                      Seismic activity detected by IoT sensors. Magnitude 5.2 - Take immediate safety precautions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Emergency Contacts</h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact) => {
                const IconComponent = getIconComponent(contact.icon);
                
                return (
                  <Card key={contact.id} className="hover:shadow-card-custom transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-gradient-emergency">
                            <IconComponent />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{contact.type}</h3>
                            <p className="text-2xl font-bold text-primary">{contact.number}</p>
                          </div>
                        </div>
                        <Button 
                          variant="emergency"
                          onClick={() => handleEmergencyCall(contact.number, contact.type)}
                          className="gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Call Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Real-time Alerts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Live Alert Feed</h2>
              <Badge variant="outline" className="animate-pulse-emergency">
                Live
              </Badge>
            </div>
            
            <div className="space-y-4">
              {alertsData.map((alert) => (
                <Card 
                  key={alert.id} 
                  className={`border-l-4 ${
                    alert.type === 'emergency' ? 'border-l-emergency bg-emergency/5' :
                    alert.type === 'warning' ? 'border-l-warning bg-warning/5' :
                    'border-l-info bg-info/5'
                  } transition-all duration-300 hover:shadow-glow`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className={`text-lg ${
                        alert.type === 'emergency' ? 'text-emergency' :
                        alert.type === 'warning' ? 'text-warning' :
                        'text-info'
                      }`}>
                        {alert.type === 'emergency' ? '🚨 EMERGENCY' :
                         alert.type === 'warning' ? '⚠️ WARNING' :
                         'ℹ️ INFO'}
                      </CardTitle>
                      <Badge 
                        variant="outline"
                        className={
                          alert.severity === 'high' ? 'border-emergency text-emergency' :
                          alert.severity === 'medium' ? 'border-warning text-warning' :
                          'border-info text-info'
                        }
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-2">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Quick Emergency Actions</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="emergency" size="lg">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Report Emergency
            </Button>
            <Button variant="warning" size="lg">
              Request Immediate Help
            </Button>
            <Button variant="info" size="lg">
              View Safety Guidelines
            </Button>
            <Button variant="success" size="lg">
              Mark Safe & Accounted
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};