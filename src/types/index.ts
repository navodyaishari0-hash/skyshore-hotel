export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: "general" | "room" | "dining" | "wellness" | "activities" | "business";
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  type: "deluxe" | "suite" | "presidential" | "ocean-view" | "garden-view" | "family" | "penthouse" | "junior-suite" | "kabana";
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  images: string[];
  thumbnail: string;
  capacity: number;
  bedType: string;
  size: number;
  view: string;
  floor: number;
  amenities: Amenity[];
  features: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "paid" | "refunded" | "partial";
  specialRequests?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "guest" | "admin" | "staff";
  loyaltyPoints: number;
  memberSince: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  date: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  allergens: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  description: string;
  image: string;
  menuItems: MenuItem[];
}

export interface SpaService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  category: string;
  benefits: string[];
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  type: "image" | "video";
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: string;
  difficulty: "easy" | "moderate" | "challenging";
  rating: number;
  reviewCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export interface Event {
  id: string;
  name: string;
  type: "wedding" | "conference" | "party";
  description: string;
  image: string;
  capacity: number;
  price: number;
  features: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  roomId: string;
  rating: number;
  comment: string;
  createdAt: string;
  reply?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minAmount: number;
  maxUses: number;
  expiresAt: string;
  isActive: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface TranslationKeys {
  [key: string]: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: string;
  icon: string;
}
