import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthPage } from "./pages/AuthPage";
import Index from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { Training } from "./pages/Training";
import { Emergency } from "./pages/Emergency";
import { Reporting } from "./pages/Reporting";
import { Admin } from "./pages/Admin";
import { VirtualDrill } from "./pages/VirtualDrill";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Role-based Dashboard Router
const DashboardRouter = () => {
  const userRole = localStorage.getItem("userRole");
  
  switch (userRole) {
    case "student":
      return <StudentDashboard />;
    case "admin":
      return <Navigate to="/admin" replace />;
    default:
      return <Dashboard />;
  }
};

function App() {
  const showHeader = () => {
    const path = window.location.pathname;
    return !["/auth", "/login", "/registration", "/"].includes(path);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            {showHeader() && <Header />}
            <Routes>
              {/* Public Routes */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/registration" element={<AuthPage />} />
              <Route path="/" element={<Index />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/training" 
                element={
                  <ProtectedRoute>
                    <Training />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/emergency" 
                element={
                  <ProtectedRoute>
                    <Emergency />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reporting" 
                element={
                  <ProtectedRoute>
                    <Reporting />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/virtual-drill" 
                element={
                  <ProtectedRoute>
                    <VirtualDrill />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;