// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Plus, Edit, Trash2, Star, User } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface Testimonial {
//   id: string;
//   customerName: string;
//   review: string;
//   rating: number;
//   createdAt: string;
// }

// const TestimonialsManager = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([
//     {
//       id: "1",
//       customerName: "John Smith",
//       review: "Excellent service! The team was professional and delivered exactly what we needed. Highly recommended!",
//       rating: 5,
//       createdAt: "2024-01-10"
//     },
//     {
//       id: "2",
//       customerName: "Sarah Johnson",
//       review: "Great experience working with them. Quick turnaround and quality results.",
//       rating: 4,
//       createdAt: "2024-01-08"
//     }
//   ]);
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
//   const [formData, setFormData] = useState({
//     customerName: "",
//     review: "",
//     rating: 5
//   });
//   const { toast } = useToast();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.customerName.trim() || !formData.review.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Please fill in all required fields.",
//       });
//       return;
//     }

//     if (editingTestimonial) {
//       // Update existing testimonial
//       setTestimonials(testimonials.map(testimonial =>
//         testimonial.id === editingTestimonial.id
//           ? { ...testimonial, ...formData }
//           : testimonial
//       ));
//       toast({
//         title: "Success",
//         description: "Testimonial updated successfully!",
//       });
//       setEditingTestimonial(null);
//     } else {
//       // Create new testimonial
//       const newTestimonial: Testimonial = {
//         id: Date.now().toString(),
//         ...formData,
//         createdAt: new Date().toISOString().split('T')[0]
//       };
//       setTestimonials([newTestimonial, ...testimonials]);
//       toast({
//         title: "Success",
//         description: "Testimonial added successfully!",
//       });
//       setIsCreating(false);
//     }

//     setFormData({ customerName: "", review: "", rating: 5 });
//   };

//   const handleEdit = (testimonial: Testimonial) => {
//     setEditingTestimonial(testimonial);
//     setFormData({
//       customerName: testimonial.customerName,
//       review: testimonial.review,
//       rating: testimonial.rating
//     });
//     setIsCreating(true);
//   };

//   const handleDelete = (id: string) => {
//     setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
//     toast({
//       title: "Deleted",
//       description: "Testimonial deleted successfully.",
//     });
//   };

//   const cancelForm = () => {
//     setIsCreating(false);
//     setEditingTestimonial(null);
//     setFormData({ customerName: "", review: "", rating: 5 });
//   };

//   const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => interactive && onRatingChange?.(star)}
//             className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
//             disabled={!interactive}
//           >
//             <Star
//               className={`w-5 h-5 ${
//                 star <= rating
//                   ? "fill-yellow-400 text-yellow-400"
//                   : "fill-gray-200 text-gray-200"
//               }`}
//             />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-admin-card-foreground">Testimonials</h2>
//           <p className="text-muted-foreground mt-1">Manage customer reviews and testimonials</p>
//         </div>
//         {!isCreating && (
//           <Button
//             onClick={() => setIsCreating(true)}
//             className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Add Testimonial
//           </Button>
//         )}
//       </div>

//       {/* Create/Edit Form */}
//       {isCreating && (
//         <Card className="shadow-card">
//           <CardHeader>
//             <CardTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</CardTitle>
//             <CardDescription>
//               {editingTestimonial ? "Update the testimonial" : "Add a customer review to showcase"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="customerName">Customer Name *</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="customerName"
//                     value={formData.customerName}
//                     onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
//                     placeholder="Enter customer name"
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="rating">Rating *</Label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(formData.rating, true, (rating) =>
//                     setFormData({ ...formData, rating })
//                   )}
//                   <span className="text-sm text-muted-foreground ml-2">
//                     {formData.rating} out of 5 stars
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="review">Review *</Label>
//                 <Textarea
//                   id="review"
//                   value={formData.review}
//                   onChange={(e) => setFormData({ ...formData, review: e.target.value })}
//                   placeholder="Enter the customer's review..."
//                   className="min-h-[120px]"
//                   required
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   type="submit"
//                   className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
//                 >
//                   {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
//                 </Button>
//                 <Button type="button" variant="outline" onClick={cancelForm}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       )}

//       {/* Testimonials List */}
//       <div className="grid gap-4">
//         {testimonials.map((testimonial) => (
//           <Card key={testimonial.id} className="shadow-card hover:shadow-admin transition-smooth">
//             <CardContent className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-admin-primary rounded-full flex items-center justify-center">
//                     <User className="w-5 h-5 text-admin-primary-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-admin-card-foreground">
//                       {testimonial.customerName}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       {renderStars(testimonial.rating)}
//                       <span className="text-sm text-muted-foreground">
//                         {new Date(testimonial.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => handleEdit(testimonial)}
//                     className="hover:bg-admin-primary hover:text-admin-primary-foreground"
//                   >
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => handleDelete(testimonial.id)}
//                     className="hover:bg-destructive hover:text-destructive-foreground"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//               <p className="text-muted-foreground leading-relaxed">
//                 "{testimonial.review}"
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {testimonials.length === 0 && !isCreating && (
//         <Card className="text-center py-12">
//           <CardContent>
//             <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-lg font-semibold mb-2">No testimonials yet</h3>
//             <p className="text-muted-foreground mb-4">Add your first customer testimonial to get started.</p>
//             <Button
//               onClick={() => setIsCreating(true)}
//               className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add First Testimonial
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default TestimonialsManager;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  User,
  Loader,
  Building,
  Mail,
  UserCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  testimonialsAPI,
  Testimonial,
  formatDate,
} from "../../../services/constants";

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    review: "",
    rating: 5,
    email: "",
    company: "",
    position: "",
    featured: false,
  });
  const { toast } = useToast();

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const fetchedTestimonials = await testimonialsAPI.getAll({
        status: "approved",
      });
      setTestimonials(fetchedTestimonials);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to fetch testimonials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.review.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const testimonialData = {
        customerName: formData.customerName.trim(),
        review: formData.review.trim(),
        rating: formData.rating,
        email: formData.email.trim() || undefined,
        company: formData.company.trim() || undefined,
        position: formData.position.trim() || undefined,
        featured: formData.featured,
      };

      if (editingTestimonial) {
        // Update existing testimonial
        await testimonialsAPI.update(editingTestimonial._id, testimonialData);
        toast({
          title: "Success",
          description: "Testimonial updated successfully!",
        });
        setEditingTestimonial(null);
      } else {
        // Create new testimonial
        await testimonialsAPI.create(testimonialData);
        toast({
          title: "Success",
          description: "Testimonial added successfully!",
        });
        setIsCreating(false);
      }

      resetForm();
      await fetchTestimonials(); // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save testimonial",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customerName: testimonial.customerName,
      review: testimonial.review,
      rating: testimonial.rating,
      email: testimonial.email || "",
      company: testimonial.company || "",
      position: testimonial.position || "",
      featured: testimonial.featured,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string, customerName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete the testimonial by ${customerName}?`
      )
    ) {
      return;
    }

    try {
      await testimonialsAPI.delete(id);
      toast({
        title: "Deleted",
        description: "Testimonial deleted successfully.",
      });
      await fetchTestimonials(); // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete testimonial",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      review: "",
      rating: 5,
      email: "",
      company: "",
      position: "",
      featured: false,
    });
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingTestimonial(null);
    resetForm();
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRatingChange?: (rating: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange?.(star)}
            className={`${
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            } transition-transform`}
            disabled={!interactive || isSubmitting}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <Loader className="w-5 h-5 animate-spin" />
          <span>Loading testimonials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-admin-card-foreground">
            Testimonials
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage customer reviews and testimonials
          </p>
        </div>
        {!isCreating && (
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </CardTitle>
            <CardDescription>
              {editingTestimonial
                ? "Update the testimonial"
                : "Add a customer review to showcase"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerName: e.target.value,
                        })
                      }
                      placeholder="Enter customer name"
                      className="pl-10"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="customer@example.com"
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Company name"
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      placeholder="Job position"
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating *</Label>
                  <div className="flex items-center gap-2">
                    {renderStars(formData.rating, true, (rating) =>
                      setFormData({ ...formData, rating })
                    )}
                    <span className="text-sm text-muted-foreground ml-2">
                      {formData.rating} out of 5 stars
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured">Featured Testimonial</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="rounded border-gray-300 text-admin-primary focus:ring-admin-primary"
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="featured" className="text-sm font-normal">
                      Mark as featured testimonial
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Review *</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                  placeholder="Enter the customer's review..."
                  className="min-h-[120px]"
                  required
                  disabled={isSubmitting}
                />
                <p className="text-sm text-muted-foreground">
                  {formData.review.length}/1000 characters
                </p>
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
                      {editingTestimonial ? "Updating..." : "Adding..."}
                    </>
                  ) : editingTestimonial ? (
                    "Update Testimonial"
                  ) : (
                    "Add Testimonial"
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

      {/* Testimonials List */}
      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial._id}
            className="shadow-card hover:shadow-admin transition-smooth"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-admin-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-admin-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-admin-card-foreground">
                        {testimonial.customerName}
                      </h3>
                      {testimonial.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(testimonial.createdAt)}
                      </span>
                    </div>
                    {(testimonial.company || testimonial.position) && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        {testimonial.position && (
                          <span>{testimonial.position}</span>
                        )}
                        {testimonial.position && testimonial.company && (
                          <span>at</span>
                        )}
                        {testimonial.company && (
                          <span>{testimonial.company}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(testimonial)}
                    className="hover:bg-admin-primary hover:text-admin-primary-foreground"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleDelete(testimonial._id, testimonial.customerName)
                    }
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-admin-primary pl-4">
                "{testimonial.review}"
              </blockquote>
              {testimonial.email && (
                <div className="mt-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 inline mr-1" />
                  {testimonial.email}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && !isCreating && (
        <Card className="text-center py-12">
          <CardContent>
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No testimonials yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first customer testimonial to get started.
            </p>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Testimonial
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestimonialsManager;
