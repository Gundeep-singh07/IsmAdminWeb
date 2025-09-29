import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Star, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  createdAt: string;
}

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      customerName: "John Smith",
      review: "Excellent service! The team was professional and delivered exactly what we needed. Highly recommended!",
      rating: 5,
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      review: "Great experience working with them. Quick turnaround and quality results.",
      rating: 4,
      createdAt: "2024-01-08"
    }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    review: "",
    rating: 5
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim() || !formData.review.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (editingTestimonial) {
      // Update existing testimonial
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === editingTestimonial.id 
          ? { ...testimonial, ...formData }
          : testimonial
      ));
      toast({
        title: "Success",
        description: "Testimonial updated successfully!",
      });
      setEditingTestimonial(null);
    } else {
      // Create new testimonial
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTestimonials([newTestimonial, ...testimonials]);
      toast({
        title: "Success",
        description: "Testimonial added successfully!",
      });
      setIsCreating(false);
    }

    setFormData({ customerName: "", review: "", rating: 5 });
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customerName: testimonial.customerName,
      review: testimonial.review,
      rating: testimonial.rating
    });
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    toast({
      title: "Deleted",
      description: "Testimonial deleted successfully.",
    });
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingTestimonial(null);
    setFormData({ customerName: "", review: "", rating: 5 });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-admin-card-foreground">Testimonials</h2>
          <p className="text-muted-foreground mt-1">Manage customer reviews and testimonials</p>
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
            <CardTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</CardTitle>
            <CardDescription>
              {editingTestimonial ? "Update the testimonial" : "Add a customer review to showcase"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Enter customer name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
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
                <Label htmlFor="review">Review *</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Enter the customer's review..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit"
                  className="bg-admin-primary hover:bg-admin-primary/90 text-admin-primary-foreground"
                >
                  {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelForm}>
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
          <Card key={testimonial.id} className="shadow-card hover:shadow-admin transition-smooth">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-admin-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-admin-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-admin-card-foreground">
                      {testimonial.customerName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-muted-foreground">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                    </div>
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
                    onClick={() => handleDelete(testimonial.id)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.review}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && !isCreating && (
        <Card className="text-center py-12">
          <CardContent>
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No testimonials yet</h3>
            <p className="text-muted-foreground mb-4">Add your first customer testimonial to get started.</p>
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