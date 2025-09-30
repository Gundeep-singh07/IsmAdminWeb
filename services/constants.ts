// services/constants.ts
const API_BASE_URL = "http://localhost:81/api";

// Interface definitions
interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  details?: Array<{ field: string; message: string }>;
}

interface BlogResponse {
  blogs: BlogPost[];
  pagination?: {
    total: number;
    pages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface TestimonialResponse {
  testimonials: Testimonial[];
  pagination?: {
    total: number;
    pages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  status: "draft" | "published" | "archived";
  tags?: string[];
  viewCount: number;
  author?: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  email?: string;
  company?: string;
  position?: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  addedBy: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Set auth token in localStorage
const setAuthToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

// Remove auth token from localStorage
const removeAuthToken = (): void => {
  localStorage.removeItem("authToken");
};

// Create headers with auth token
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API call function with better error handling
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  console.log(`🔄 API Call: ${options.method || "GET"} ${url}`);

  try {
    const response = await fetch(url, config);

    console.log(
      `📡 Response Status: ${response.status} ${response.statusText}`
    );

    let data;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("❌ Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    if (!response.ok) {
      // Handle validation errors
      if (response.status === 400 && data.details) {
        const errorMessage = data.details
          .map((err: any) => err.message)
          .join(", ");
        throw new Error(errorMessage);
      }

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        console.error("🔒 Authentication error, clearing tokens");
        removeAuthToken();
        localStorage.removeItem("isAdminLoggedIn");
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }

      throw new Error(data.message || data.error || "An error occurred");
    }

    console.log("✅ API Call Successful");
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("❌ Network Error: Cannot connect to backend at", url);
      throw new Error(
        `Cannot connect to server. Make sure backend is running on port 81.`
      );
    }

    if (error instanceof Error) {
      console.error("❌ API Error:", error.message);
      throw error;
    }

    throw new Error("Network error occurred");
  }
};

// Auth API calls
export const authAPI = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await apiCall<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (response.token) {
      setAuthToken(response.token);
      console.log("🔑 Token saved to localStorage");
    }

    return response;
  },

  getCurrentUser: async () => {
    return await apiCall("/auth/me", {
      method: "GET",
      headers: getAuthHeaders(),
    });
  },

  logout: (): void => {
    removeAuthToken();
    localStorage.removeItem("isAdminLoggedIn");
    console.log("👋 Logged out, tokens cleared");
  },

  isAuthenticated: (): boolean => {
    const hasToken = getAuthToken() !== null;
    console.log("🔐 Is Authenticated:", hasToken);
    return hasToken;
  },
};

// Blog API calls
export const blogAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<BlogPost[]> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.status) searchParams.append("status", params.status);
    if (params?.search) searchParams.append("search", params.search);

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/blogs?${queryString}` : "/blogs";

    const response = await apiCall<BlogResponse>(endpoint);
    return response.blogs;
  },

  getById: async (id: string): Promise<BlogPost> => {
    const response = await apiCall<{ blog: BlogPost }>(`/blogs/${id}`);
    return response.blog;
  },

  create: async (blogData: {
    title: string;
    content: string;
    image?: string;
    tags?: string[];
    status?: string;
  }): Promise<{ message: string; blog: BlogPost }> => {
    return await apiCall("/blogs", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData),
    });
  },

  update: async (
    id: string,
    blogData: {
      title?: string;
      content?: string;
      image?: string;
      tags?: string[];
      status?: string;
    }
  ): Promise<{ message: string; blog: BlogPost }> => {
    return await apiCall(`/blogs/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData),
    });
  },

  delete: async (id: string): Promise<{ message: string }> => {
    return await apiCall(`/blogs/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

// Testimonials API calls
export const testimonialsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    rating?: number;
  }): Promise<Testimonial[]> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.status) searchParams.append("status", params.status);
    if (params?.rating) searchParams.append("rating", params.rating.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString
      ? `/testimonials?${queryString}`
      : "/testimonials";

    const response = await apiCall<TestimonialResponse>(endpoint);
    return response.testimonials;
  },

  getById: async (id: string): Promise<Testimonial> => {
    const response = await apiCall<{ testimonial: Testimonial }>(
      `/testimonials/${id}`
    );
    return response.testimonial;
  },

  create: async (testimonialData: {
    customerName: string;
    review: string;
    rating: number;
    email?: string;
    company?: string;
    position?: string;
    featured?: boolean;
  }): Promise<{ message: string; testimonial: Testimonial }> => {
    return await apiCall("/testimonials", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(testimonialData),
    });
  },

  update: async (
    id: string,
    testimonialData: {
      customerName?: string;
      review?: string;
      rating?: number;
      email?: string;
      company?: string;
      position?: string;
      featured?: boolean;
      status?: string;
    }
  ): Promise<{ message: string; testimonial: Testimonial }> => {
    return await apiCall(`/testimonials/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(testimonialData),
    });
  },

  delete: async (id: string): Promise<{ message: string }> => {
    return await apiCall(`/testimonials/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

// Health check
export const healthCheck = async (): Promise<{
  status: string;
  timestamp: string;
  database: string;
}> => {
  return await apiCall("/health");
};

// Utility functions
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(dateString);
};
