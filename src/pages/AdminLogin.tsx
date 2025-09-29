import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "../../services/constants";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter both username and password.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.login(username, password);

      // Set the old localStorage flag for compatibility with existing code
      localStorage.setItem("isAdminLoggedIn", "true");

      toast({
        title: "Welcome back!",
        description: "Successfully logged in to admin dashboard.",
      });

      navigate("/admin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error instanceof Error ? error.message : "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-admin p-4">
      <Card className="w-full max-w-md shadow-admin">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-admin-primary rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-admin-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-admin-card-foreground">
            Admin Dashboard
          </CardTitle>
          <CardDescription>Sign in to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground transition-smooth"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials:</p>
            <p>
              Username: <code className="bg-muted px-1 rounded">ism@1</code>
            </p>
            <p>
              Password: <code className="bg-muted px-1 rounded">ism@12.</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
