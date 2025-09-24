import { Shield, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [language, setLanguage] = useState("en");
  const location = useLocation();

  const toggleLanguage = () => {
    const languages = ["en", "hi", "pa"];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card shadow-card-custom border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                SafeGuard Punjab
              </h1>
              <p className="text-sm text-muted-foreground">
                Government of Punjab
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/training" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/training') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Training
            </Link>
            <Link 
              to="/emergency" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/emergency') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Emergency
            </Link>
            <Link 
              to="/reporting" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/reporting') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Reporting
            </Link>
            <Link 
              to="/virtual-drill" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/virtual-drill') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Virtual Drills
            </Link>
            <Link 
              to="/admin" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "EN" : language === "hi" ? "हिं" : "ਪੰ"}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};