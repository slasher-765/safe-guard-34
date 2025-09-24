import { useState } from "react";
import { Shield, Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Credential {
  username: string;
  password: string;
  role: string;
  name: string;
  institution?: string;
}

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
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
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const credential = testCredentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (credential) {
      // Store user data
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", credential.role);
      localStorage.setItem("userName", credential.name);
      localStorage.setItem("userInstitution", credential.institution || "");
      localStorage.setItem("username", credential.username);

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${credential.name}`,
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
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleTestLogin = (credential: Credential) => {
    setUsername(credential.username);
    setPassword(credential.password);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-hero p-3 rounded-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SafeGuard Punjab</h1>
              <p className="text-sm text-muted-foreground">Secure Login Portal</p>
            </div>
          </div>
        </div>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign In to Continue</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the disaster management platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                disabled={loading || !username || !password}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>


            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                size="sm"
                onClick={() => navigate("/onboarding")}
              >
                New user? Complete onboarding first
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};