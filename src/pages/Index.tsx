import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/hooks/useLanguage";

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Check if user is already registered and authenticated
    const isRegistered = localStorage.getItem("registrationComplete") === "true";
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const onboardingComplete = localStorage.getItem("onboardingComplete") === "true";

    if (isAuthenticated && onboardingComplete) {
      // Redirect to appropriate dashboard based on role
      const userRole = localStorage.getItem("userRole");
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else if (isRegistered && onboardingComplete) {
      navigate("/login");
    } else if (isRegistered) {
      navigate("/onboarding");
    } else {
      navigate("/registration");
    }
  }, [navigate]);

  const handleBack = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("userInstitution");
    navigate("/login");
  };

  const cycleLanguage = () => {
    const languages: Language[] = ['en', 'hi', 'pa'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-subtle p-4">
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="sm" onClick={cycleLanguage} className="gap-2">
          <Globe className="h-4 w-4" />
          {language.toUpperCase()}
        </Button>
      </div>

      <Button
        variant="secondary"
        className="mb-6 gap-2"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </Button>

      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">{t('loading')}</p>
      </div>
    </div>
  );
};

export default Index;
