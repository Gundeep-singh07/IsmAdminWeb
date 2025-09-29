import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Image as ImageIcon, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

const BlogManager = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Welcome to Our Blog",
      content: "This is our first blog post with some sample content to demonstrate the blog functionality.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
      createdAt: "2024-01-15"
    }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id 
          ? { ...blog, ...formData }
          : blog
      ));
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
      setEditingBlog(null);
    } else {
      // Create new blog
      const newBlog: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setBlogs([newBlog, ...blogs]);
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      setIsCreating(false);
    }

    setFormData({ title: "", content: "", image: "" });
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image
    });
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    toast({
      title: "Deleted",
      description: "Blog post deleted successfully.",
    });
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingBlog(null);
    setFormData({ title: "", content: "", image: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-admin-card-foreground">Blog Posts</h2>
          <p className="text-muted-foreground mt-1">Manage your blog content</p>
        </div>
        {!isCreating && (
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
            <CardDescription>
              {editingBlog ? "Update your blog post" : "Add a new blog post to your website"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter blog post title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit"
                  className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
                >
                  {editingBlog ? "Update Post" : "Create Post"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="shadow-card hover:shadow-admin transition-smooth">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {blog.image && (
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-admin-card-foreground truncate">
                      {blog.title}
                    </h3>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(blog)}
                        className="hover:bg-admin-primary hover:text-admin-primary-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(blog.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {blog.content}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                    <Badge variant="outline" className="ml-4">Published</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && !isCreating && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground mb-4">Create your first blog post to get started.</p>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogManager;