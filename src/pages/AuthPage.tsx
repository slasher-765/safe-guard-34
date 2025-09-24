import { useState } from "react";
import { Shield, Eye, EyeOff, User, Lock, AlertCircle, GraduationCap, Heart, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "parent" | "staff" | "admin";

interface Credential {
  username: string;
  password: string;
  role: string;
  name: string;
  institution?: string;
}

interface FormData {
  username: string;
  password: string;
}

export const AuthPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Test credentials for development
  const testCredentials: Credential[] = [
    {
      username: "student",
      password: "student",
      role: "student",
      name: "Student User",
      institution: "Test Institution"
    },
    {
      username: "admin",
      password: "admin",
      role: "admin",
      name: "Admin User",
      institution: "Test Institution"
    }
  ];

  const handleLogin = async () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You must select your role before logging in.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const credential = testCredentials.find(
      cred => cred.username === formData.username && cred.password === formData.password && cred.role === selectedRole
    );

    if (credential) {
      // Store user data and complete onboarding in one step
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", credential.role);
      localStorage.setItem("userName", credential.name);
      localStorage.setItem("userInstitution", credential.institution || "");
      localStorage.setItem("username", credential.username);
      localStorage.setItem("onboardingComplete", "true");
      localStorage.setItem("registrationComplete", "true");

      toast({
        title: "Login Successful!",
        description: `Welcome, ${credential.name}`,
      });

      // Navigate based on role
      if (credential.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials for the selected role. Please check your username, password, and role selection.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleTestLogin = (credential: Credential) => {
    setFormData(prev => ({
      ...prev,
      username: credential.username,
      password: credential.password
    }));
  };

  const getFilteredCredentials = () => {
    if (selectedRole) {
      return testCredentials.filter(cred => cred.role === selectedRole);
    }
    return testCredentials;
  };

  // Single Login Screen with Role Selection
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-hero p-4 rounded-xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">SafeGuard Punjab</h1>
              <p className="text-lg text-muted-foreground">Disaster Preparedness Platform</p>
            </div>
          </div>
        </div>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Select your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Your Role</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "student", label: "Student", icon: GraduationCap, color: "text-blue-600" },
                    { id: "parent", label: "Parent", icon: Heart, color: "text-pink-600" },
                    { id: "staff", label: "Staff", icon: Users, color: "text-green-600" },
                    { id: "admin", label: "Admin", icon: Building2, color: "text-purple-600" }
                  ].map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <Card
                        key={role.id}
                        className={`cursor-pointer transition-all border-2 hover:shadow-card-custom ${
                          selectedRole === role.id 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary"
                        }`}
                        onClick={() => setSelectedRole(role.id as UserRole)}
                      >
                        <CardContent className="pt-4 pb-4">
                          <div className="text-center">
                            <IconComponent className={`h-8 w-8 mx-auto mb-2 ${role.color}`} />
                            <p className="font-medium text-sm">{role.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleLogin} 
                  className="w-full" 
                  disabled={loading || !formData.username || !formData.password || !selectedRole}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};