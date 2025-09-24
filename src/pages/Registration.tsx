import { useState } from "react";
import { Shield, School, Users, UserCheck, Building2, ArrowRight, ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, Language } from "@/hooks/useLanguage";

type RegistrationType = "school" | "individual";
type UserRole = "student" | "parent" | "staff" | "admin";

export const Registration = () => {
  const [registrationType, setRegistrationType] = useState<RegistrationType | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    // School/Institution fields
    institutionName: "",
    institutionType: "",
    address: "",
    district: "",
    principalName: "",
    contactNumber: "",
    email: "",
    
    // Individual fields
    fullName: "",
    studentId: "",
    class: "",
    parentName: "",
    staffId: "",
    designation: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

  const punjabDistricts = [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib",
    "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar",
    "Kapurthala", "Ludhiana", "Mansa", "Moga", "Mohali", "Muktsar",
    "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"
  ];

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store registration data
    localStorage.setItem("registrationComplete", "true");
    localStorage.setItem("registrationType", registrationType!);
    if (userRole) localStorage.setItem("userRole", userRole);
    localStorage.setItem("institutionName", formData.institutionName);
    localStorage.setItem("userName", formData.fullName || formData.principalName);
    
    toast({
      title: "Registration Successful!",
      description: "Welcome to SafeGuard Punjab. Please complete your onboarding.",
    });
    
    navigate("/onboarding");
    setLoading(false);
  };

  const cycleLanguage = () => {
    const languages: Language[] = ['en', 'hi', 'pa'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  if (!registrationType) {
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
              onClick={() => navigate("/login")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToLogin')}
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-hero p-4 rounded-xl">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">SafeGuard Punjab</h1>
                <p className="text-lg text-muted-foreground">Disaster Preparedness Platform</p>
              </div>
            </div>
            <p className="text-xl text-foreground mb-2">Government of Punjab Initiative</p>
            <p className="text-muted-foreground">Building resilient communities through education and preparedness</p>
          </div>

          {/* Registration Type Selection */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card 
              className="cursor-pointer hover:shadow-glow transition-all border-2 hover:border-primary"
              onClick={() => setRegistrationType("school")}
            >
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-hero p-6 rounded-full w-20 h-20 mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white mx-auto mt-2" />
                </div>
                <CardTitle className="text-2xl">School/College Registration</CardTitle>
                <CardDescription className="text-base">
                  Register your educational institution with SafeGuard Punjab
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Institutional dashboard and analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Student progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Emergency coordination tools
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Drill management system
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-glow transition-all border-2 hover:border-primary"
              onClick={() => setRegistrationType("individual")}
            >
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-hero p-6 rounded-full w-20 h-20 mx-auto mb-4">
                  <Users className="h-8 w-8 text-white mx-auto mt-2" />
                </div>
                <CardTitle className="text-2xl">Individual Registration</CardTitle>
                <CardDescription className="text-base">
                  Join as a student, parent, or staff member
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Interactive training modules
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Virtual drill participation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Real-time emergency alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Achievement sharing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (registrationType === "individual" && !userRole) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Role</h2>
            <p className="text-muted-foreground">Choose the option that best describes you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-glow transition-all border-2 hover:border-primary"
              onClick={() => setUserRole("student")}
            >
              <CardHeader className="text-center">
                <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-3">
                  <School className="h-8 w-8 text-white mx-auto mt-1" />
                </div>
                <CardTitle>Student</CardTitle>
                <CardDescription>Learn disaster preparedness through interactive modules</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-glow transition-all border-2 hover:border-primary"
              onClick={() => setUserRole("parent")}
            >
              <CardHeader className="text-center">
                <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-3">
                  <Users className="h-8 w-8 text-white mx-auto mt-1" />
                </div>
                <CardTitle>Parent/Guardian</CardTitle>
                <CardDescription>Support your child's disaster preparedness journey</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-glow transition-all border-2 hover:border-primary"
              onClick={() => setUserRole("staff")}
            >
              <CardHeader className="text-center">
                <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-3">
                  <UserCheck className="h-8 w-8 text-white mx-auto mt-1" />
                </div>
                <CardTitle>Staff/Teacher</CardTitle>
                <CardDescription>Guide students and coordinate safety measures</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="secondary" 
              onClick={() => setRegistrationType(null)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToRegistrationType')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {registrationType === "school" ? "School/College Registration" : `${userRole?.charAt(0).toUpperCase()}${userRole?.slice(1)} Registration`}
            </CardTitle>
            <CardDescription className="text-center">
              Complete your registration to access SafeGuard Punjab
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registrationType === "school" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institutionName">Institution Name *</Label>
                      <Input
                        id="institutionName"
                        placeholder="Enter school/college name"
                        value={formData.institutionName}
                        onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institutionType">Institution Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, institutionType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="university">University</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select onValueChange={(value) => setFormData({...formData, district: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {punjabDistricts.map(district => (
                            <SelectItem key={district} value={district}>{district}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        placeholder="Enter contact number"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="principalName">Principal/Head Name</Label>
                      <Input
                        id="principalName"
                        placeholder="Enter principal name"
                        value={formData.principalName}
                        onChange={(e) => setFormData({...formData, principalName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Official Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter official email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  {userRole === "student" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          placeholder="Enter student ID"
                          value={formData.studentId}
                          onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="class">Class/Grade</Label>
                        <Input
                          id="class"
                          placeholder="Enter class/grade"
                          value={formData.class}
                          onChange={(e) => setFormData({...formData, class: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  {userRole === "parent" && (
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Student Name</Label>
                      <Input
                        id="parentName"
                        placeholder="Enter your child's name"
                        value={formData.parentName}
                        onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                      />
                    </div>
                  )}

                  {userRole === "staff" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="staffId">Staff ID</Label>
                        <Input
                          id="staffId"
                          placeholder="Enter staff ID"
                          value={formData.staffId}
                          onChange={(e) => setFormData({...formData, staffId: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                          id="designation"
                          placeholder="Enter designation"
                          value={formData.designation}
                          onChange={(e) => setFormData({...formData, designation: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="institutionName">School/College Name</Label>
                    <Input
                      id="institutionName"
                      placeholder="Enter institution name"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select onValueChange={(value) => setFormData({...formData, district: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {punjabDistricts.map(district => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button 
                onClick={handleSubmit} 
                className="w-full" 
                disabled={loading || !formData.institutionName || !(formData.fullName || formData.principalName)}
              >
                {loading ? "Registering..." : "Complete Registration"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => userRole ? setUserRole(null) : setRegistrationType(null)}
              >
                ← Back
              </Button>
              <Button 
                variant="link" 
                onClick={() => navigate("/login")}
                className="ml-auto"
              >
                Already registered? Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};