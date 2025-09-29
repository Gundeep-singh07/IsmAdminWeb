// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Edit, Trash2, Image as ImageIcon, Calendar, FileText } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
//   image: string;
//   createdAt: string;
// }

// const BlogManager = () => {
//   const [blogs, setBlogs] = useState<BlogPost[]>([
//     {
//       id: "1",
//       title: "Welcome to Our Blog",
//       content: "This is our first blog post with some sample content to demonstrate the blog functionality.",
//       image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
//       createdAt: "2024-01-15"
//     }
//   ]);
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: ""
//   });
//   const { toast } = useToast();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.title.trim() || !formData.content.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Please fill in all required fields.",
//       });
//       return;
//     }

//     if (editingBlog) {
//       // Update existing blog
//       setBlogs(blogs.map(blog =>
//         blog.id === editingBlog.id
//           ? { ...blog, ...formData }
//           : blog
//       ));
//       toast({
//         title: "Success",
//         description: "Blog post updated successfully!",
//       });
//       setEditingBlog(null);
//     } else {
//       // Create new blog
//       const newBlog: BlogPost = {
//         id: Date.now().toString(),
//         ...formData,
//         createdAt: new Date().toISOString().split('T')[0]
//       };
//       setBlogs([newBlog, ...blogs]);
//       toast({
//         title: "Success",
//         description: "Blog post created successfully!",
//       });
//       setIsCreating(false);
//     }

//     setFormData({ title: "", content: "", image: "" });
//   };

//   const handleEdit = (blog: BlogPost) => {
//     setEditingBlog(blog);
//     setFormData({
//       title: blog.title,
//       content: blog.content,
//       image: blog.image
//     });
//     setIsCreating(true);
//   };

//   const handleDelete = (id: string) => {
//     setBlogs(blogs.filter(blog => blog.id !== id));
//     toast({
//       title: "Deleted",
//       description: "Blog post deleted successfully.",
//     });
//   };

//   const cancelForm = () => {
//     setIsCreating(false);
//     setEditingBlog(null);
//     setFormData({ title: "", content: "", image: "" });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-admin-card-foreground">Blog Posts</h2>
//           <p className="text-muted-foreground mt-1">Manage your blog content</p>
//         </div>
//         {!isCreating && (
//           <Button
//             onClick={() => setIsCreating(true)}
//             className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             New Post
//           </Button>
//         )}
//       </div>

//       {/* Create/Edit Form */}
//       {isCreating && (
//         <Card className="shadow-card">
//           <CardHeader>
//             <CardTitle>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
//             <CardDescription>
//               {editingBlog ? "Update your blog post" : "Add a new blog post to your website"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Title *</Label>
//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   placeholder="Enter blog post title"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="image">Image URL</Label>
//                 <div className="relative">
//                   <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="image"
//                     value={formData.image}
//                     onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                     placeholder="https://example.com/image.jpg"
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="content">Content *</Label>
//                 <Textarea
//                   id="content"
//                   value={formData.content}
//                   onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                   placeholder="Write your blog post content here..."
//                   className="min-h-[200px]"
//                   required
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   type="submit"
//                   className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
//                 >
//                   {editingBlog ? "Update Post" : "Create Post"}
//                 </Button>
//                 <Button type="button" variant="outline" onClick={cancelForm}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       )}

//       {/* Blog Posts List */}
//       <div className="grid gap-6">
//         {blogs.map((blog) => (
//           <Card key={blog.id} className="shadow-card hover:shadow-admin transition-smooth">
//             <CardContent className="p-6">
//               <div className="flex gap-6">
//                 {blog.image && (
//                   <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
//                     <img
//                       src={blog.image}
//                       alt={blog.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-semibold text-admin-card-foreground truncate">
//                       {blog.title}
//                     </h3>
//                     <div className="flex gap-2 ml-4">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleEdit(blog)}
//                         className="hover:bg-admin-primary hover:text-admin-primary-foreground"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleDelete(blog.id)}
//                         className="hover:bg-destructive hover:text-destructive-foreground"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                   <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
//                     {blog.content}
//                   </p>
//                   <div className="flex items-center text-sm text-muted-foreground">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     {new Date(blog.createdAt).toLocaleDateString()}
//                     <Badge variant="outline" className="ml-4">Published</Badge>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {blogs.length === 0 && !isCreating && (
//         <Card className="text-center py-12">
//           <CardContent>
//             <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
//             <p className="text-muted-foreground mb-4">Create your first blog post to get started.</p>
//             <Button
//               onClick={() => setIsCreating(true)}
//               className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create First Post
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default BlogManager;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Calendar,
  FileText,
  Loader,
  Search,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  blogAPI,
  BlogPost,
  formatDate,
  truncateText,
} from "../../../services/constants";

const BlogManager = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
    status: "published",
  });
  const { toast } = useToast();

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchBlogs(searchTerm);
      } else {
        fetchBlogs();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const fetchBlogs = async (search?: string) => {
    try {
      setIsLoading(true);
      const fetchedBlogs = await blogAPI.getAll({
        search,
        status: "published",
      });
      setBlogs(fetchedBlogs);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to fetch blogs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        image: formData.image.trim(),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        status: formData.status,
      };

      if (editingBlog) {
        // Update existing blog
        await blogAPI.update(editingBlog._id, blogData);
        toast({
          title: "Success",
          description: "Blog post updated successfully!",
        });
        setEditingBlog(null);
      } else {
        // Create new blog
        await blogAPI.create(blogData);
        toast({
          title: "Success",
          description: "Blog post created successfully!",
        });
        setIsCreating(false);
      }

      resetForm();
      await fetchBlogs(); // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save blog post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image || "",
      tags: blog.tags.join(", "),
      status: blog.status,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await blogAPI.delete(id);
      toast({
        title: "Deleted",
        description: "Blog post deleted successfully.",
      });
      await fetchBlogs(); // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete blog post",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      image: "",
      tags: "",
      status: "published",
    });
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingBlog(null);
    resetForm();
  };

  if (isLoading && blogs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <Loader className="w-5 h-5 animate-spin" />
          <span>Loading blogs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-admin-card-foreground">
            Blog Posts
          </h2>
          <p className="text-muted-foreground mt-1">Manage your blog content</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
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
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </CardTitle>
            <CardDescription>
              {editingBlog
                ? "Update your blog post"
                : "Add a new blog post to your website"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter blog post title"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled={isSubmitting}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="Enter tags separated by commas"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-muted-foreground">
                  Separate tags with commas (e.g., tech, web, development)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your blog post content here..."
                  className="min-h-[200px]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      {editingBlog ? "Updating..." : "Creating..."}
                    </>
                  ) : editingBlog ? (
                    "Update Post"
                  ) : (
                    "Create Post"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelForm}
                  disabled={isSubmitting}
                >
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
          <Card
            key={blog._id}
            className="shadow-card hover:shadow-admin transition-smooth"
          >
            <CardContent className="p-6">
              <div className="flex gap-6">
                {blog.image && (
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-admin-card-foreground truncate">
                        {blog.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            blog.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {blog.status}
                        </Badge>
                        {blog.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
                        onClick={() => handleDelete(blog._id, blog.title)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {truncateText(blog.content)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(blog.createdAt)}
                      </div>
                      {blog.viewCount > 0 && (
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {blog.viewCount} views
                        </div>
                      )}
                    </div>
                    <div className="text-xs">By {blog.author.username}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading state for search */}
      {isLoading && blogs.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Loader className="w-5 h-5 animate-spin mr-2" />
          <span>Searching...</span>
        </div>
      )}

      {/* Empty state */}
      {blogs.length === 0 && !isLoading && !isCreating && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm ? "No blogs found" : "No blog posts yet"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? `No blogs match "${searchTerm}". Try a different search term.`
                : "Create your first blog post to get started."}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            )}
            {searchTerm && (
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogManager;
