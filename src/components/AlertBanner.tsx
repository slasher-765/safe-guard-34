import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AlertBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-emergency text-emergency-foreground p-4 animate-pulse-emergency">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 animate-shake" />
          <div>
            <p className="font-semibold">Emergency Alert System Active</p>
            <p className="text-sm opacity-90">
              Stay prepared. Your safety is our priority. Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="text-emergency-foreground hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};