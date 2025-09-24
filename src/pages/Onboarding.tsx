import { useState, useEffect } from "react";
import { Shield, Users, GraduationCap, Heart, Building2, Bell, Globe, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLanguage, Language } from "@/hooks/useLanguage";

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<string | null>(null);
  const navigate = useNavigate();
  const { language, setLanguage: setAppLanguage, t } = useLanguage();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setSelectedRole(storedRole);
      setStep(2);
    }
  }, []);


  const roles: Role[] = [
    {
      id: "student",
      title: "Student",
      description: "Access interactive learning modules, quizzes, and virtual drills",
      icon: GraduationCap,
      color: "text-blue-600"
    },
    {
      id: "parent",
      title: "Parent/Guardian",
      description: "Monitor child's progress and receive safety updates",
      icon: Heart,
      color: "text-pink-600"
    },
    {
      id: "staff",
      title: "Teaching Staff",
      description: "Manage classroom safety and conduct emergency drills",
      icon: Users,
      color: "text-green-600"
    },
    {
      id: "admin",
      title: "School/College Admin",
      description: "Dashboard access, analytics, and institution-wide management",
      icon: Building2,
      color: "text-purple-600"
    }
  ];

  const languages = [
    { id: "en", name: "English", native: "English" },
    { id: "hi", name: "Hindi", native: "हिंदी" },
    { id: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep(2);
  };

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
    setStep(3);
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      setStep(4);
    } else {
      setNotificationPermission("granted");
      setStep(4);
    }
  };

  const completeOnboarding = () => {
    // Store user preferences in localStorage
    localStorage.setItem("userRole", selectedRole || "");
    localStorage.setItem("userLanguage", selectedLanguage || "en");
    localStorage.setItem("notificationPermission", notificationPermission || "denied");
    localStorage.setItem("onboardingComplete", "true");
    
    // Navigate based on role
    if (selectedRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const cycleLanguage = () => {
    const languages: Language[] = ['en', 'hi', 'pa'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setAppLanguage(languages[nextIndex]);
  };

  const goBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Language Switcher */}
        <div className="absolute top-4 right-4">
          <Button variant="outline" size="sm" onClick={cycleLanguage} className="gap-2">
            <Globe className="h-4 w-4" />
            {language.toUpperCase()}
          </Button>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={goBackStep}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 1 ? t('back') : t('previous')}
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-hero p-3 rounded-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">SafeGuard Punjab</h1>
              <p className="text-muted-foreground">Government of Punjab Disaster Management Platform</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-3 h-3 rounded-full transition-all ${
                  step >= stepNum ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <Card className="shadow-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome! Please select your role</CardTitle>
              <CardDescription>
                This helps us customize your experience and provide relevant features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <Card
                      key={role.id}
                      className="cursor-pointer hover:shadow-card-custom transition-all hover:scale-105 border-2 hover:border-primary"
                      onClick={() => handleRoleSelect(role.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="mb-4">
                            <IconComponent className={`h-12 w-12 mx-auto ${role.color}`} />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Language Selection */}
        {step === 2 && (
          <Card className="shadow-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Choose your preferred language</CardTitle>
              <CardDescription>
                Select the language you're most comfortable with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <Card
                    key={lang.id}
                    className="cursor-pointer hover:shadow-card-custom transition-all hover:scale-105 border-2 hover:border-primary"
                    onClick={() => handleLanguageSelect(lang.id)}
                  >
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Globe className="h-8 w-8 mx-auto text-primary mb-3" />
                        <h3 className="font-semibold text-lg">{lang.name}</h3>
                        <p className="text-xl text-muted-foreground mt-2">{lang.native}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Notification Permission */}
        {step === 3 && (
          <Card className="shadow-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Enable Emergency Alerts</CardTitle>
              <CardDescription>
                Stay safe with real-time disaster alerts and emergency notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="bg-gradient-emergency p-4 rounded-lg inline-block mb-4">
                  <Bell className="h-16 w-16 text-white" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Earthquake & Tsunami warnings</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Flood & Weather alerts</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Fire & Emergency notifications</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>School safety updates</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={requestNotificationPermission}
                  variant="emergency"
                  size="lg"
                  className="w-full"
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Enable Emergency Alerts
                </Button>
                <Button 
                  onClick={() => {
                    setNotificationPermission("denied");
                    setStep(4);
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Skip for now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <Card className="shadow-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">All Set! Welcome to SafeGuard Punjab</CardTitle>
              <CardDescription>
                Your personalized disaster management platform is ready
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="bg-gradient-hero p-4 rounded-full inline-block mb-4">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Selected Role:</span>
                    <Badge variant="outline">
                      {roles.find(r => r.id === selectedRole)?.title}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Language:</span>
                    <Badge variant="outline">
                      {languages.find(l => l.id === selectedLanguage)?.native}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Emergency Alerts:</span>
                    <Badge variant="outline" className={notificationPermission === "granted" ? "text-success border-success" : "text-warning border-warning"}>
                      {notificationPermission === "granted" ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={completeOnboarding}
                variant="hero"
                size="lg"
                className="w-full"
              >
                Enter SafeGuard Platform
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};