import { useState, useEffect } from "react";
import { AlertTriangle, X, Volume2, Bell, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: number;
  type: "weather" | "flood" | "fire" | "earthquake" | "general";
  title: string;
  message: string;
  district: string;
  severity: "critical" | "high" | "moderate" | "low";
  time: string;
  isActive: boolean;
}

export const PersistentAlertBanner = () => {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const activeAlerts: Alert[] = [
    {
      id: 1,
      type: "weather",
      title: "Heavy Rain Alert - Active",
      message: "Moderate to heavy rainfall expected in Ludhiana and surrounding areas. Stay safe indoors.",
      district: "Ludhiana",
      severity: "moderate",
      time: "30 mins ago",
      isActive: true
    },
    {
      id: 2,
      type: "flood",
      title: "Flood Watch - Active",
      message: "Water levels rising in Sutlej river. Residents near riverbank advised to stay alert.",
      district: "Ferozepur",
      severity: "high",
      time: "2 hours ago",
      isActive: true
    },
    {
      id: 3,
      type: "general",
      title: "Emergency Preparedness Reminder",
      message: "Keep emergency kit ready and stay updated with official announcements.",
      district: "Statewide",
      severity: "low",
      time: "1 hour ago",
      isActive: true
    }
  ];

  // Auto-rotate alerts every 5 seconds
  useEffect(() => {
    if (activeAlerts.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % activeAlerts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeAlerts.length, isPaused]);

  if (!isVisible || activeAlerts.length === 0) return null;

  const currentAlert = activeAlerts[currentAlertIndex];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-gradient-emergency text-emergency-foreground animate-pulse border-emergency/50";
      case "high":
        return "bg-gradient-emergency text-emergency-foreground border-emergency/30";
      case "moderate":
        return "bg-warning text-warning-foreground border-warning/30";
      case "low":
        return "bg-info text-info-foreground border-info/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "weather":
        return <AlertTriangle className="h-5 w-5" />;
      case "flood":
        return <AlertTriangle className="h-5 w-5" />;
      case "fire":
        return <AlertTriangle className="h-5 w-5" />;
      case "earthquake":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className={`border-2 p-4 ${getSeverityStyles(currentAlert.severity)} transition-all duration-500`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              {getAlertIcon(currentAlert.type)}
              <Volume2 className="h-4 w-4 animate-bounce" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-sm truncate">{currentAlert.title}</h3>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${currentAlert.severity === 'critical' ? 'bg-white/20 text-white border-white/30' : ''}`}
                >
                  {currentAlert.severity.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-sm opacity-90 line-clamp-2 mb-1">{currentAlert.message}</p>
              
              <div className="flex items-center gap-4 text-xs opacity-80">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{currentAlert.district}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{currentAlert.time}</span>
                </div>
                {activeAlerts.length > 1 && (
                  <span className="hidden sm:inline">
                    Alert {currentAlertIndex + 1} of {activeAlerts.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {activeAlerts.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="text-current hover:bg-white/20 h-8 w-8 p-0"
                title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
              >
                {isPaused ? "▶" : "⏸"}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-current hover:bg-white/20 h-8 w-8 p-0"
              title="Dismiss alert"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress indicator for multiple alerts */}
        {activeAlerts.length > 1 && (
          <div className="flex gap-1 mt-3">
            {activeAlerts.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded transition-all duration-300 ${
                  index === currentAlertIndex ? "bg-white/80" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};