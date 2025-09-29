import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, FileText, Star } from "lucide-react";
import BlogManager from "@/components/admin/BlogManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  const menuItems = [
    { id: "blogs", label: "Blog Posts", icon: FileText },
    { id: "testimonials", label: "Testimonials", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-admin-sidebar shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-admin-secondary/20">
            <h1 className="text-xl font-bold text-admin-sidebar-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-admin-sidebar-foreground/60 mt-1">
              Content Management
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-smooth ${
                    activeTab === item.id
                      ? "bg-admin-primary text-admin-primary-foreground shadow-admin"
                      : "text-admin-sidebar-foreground hover:bg-admin-sidebar-foreground/10"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-admin-secondary/20">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start bg-black text-admin-sidebar-foreground border-admin-sidebar-foreground/20 hover:bg-admin-sidebar-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2 " />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "blogs" && <BlogManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
