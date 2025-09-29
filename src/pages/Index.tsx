import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-admin flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-admin text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-admin-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-admin-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-admin-card-foreground">
            Welcome to Admin Portal
          </CardTitle>
          <CardDescription>
            Access the content management system to manage your blog posts and testimonials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/admin/login")}
            className="w-full bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground transition-smooth"
          >
            Access Admin Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
