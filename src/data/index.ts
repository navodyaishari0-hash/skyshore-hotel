import type {
  Amenity,
  Room,
  Testimonial,
  Experience,
  GalleryItem,
  TeamMember,
} from "@/types";

export const amenities: Amenity[] = [
  { id: "amenity-1", name: "High-Speed WiFi", icon: "Wifi", category: "general" },
  { id: "amenity-2", name: "Private Deck", icon: "Sunset", category: "room" },
  { id: "amenity-3", name: "Air Conditioning", icon: "Snowflake", category: "room" },
  { id: "amenity-4", name: "Open-Air Bathroom", icon: "Flower2", category: "room" },
  { id: "amenity-5", name: "King Bed", icon: "Bed", category: "room" },
  { id: "amenity-6", name: "Guest Kitchen", icon: "UtensilsCrossed", category: "dining" },
  { id: "amenity-7", name: "Kitchen Utensils", icon: "UtensilsCrossed", category: "dining" },
  { id: "amenity-8", name: "Nature Trails", icon: "TreePine", category: "activities" },
  { id: "amenity-9", name: "Airport Transfer", icon: "Car", category: "general" },
  { id: "amenity-10", name: "Concierge", icon: "Bell", category: "general" },
  { id: "amenity-11", name: "Outdoor Shower", icon: "Droplets", category: "room" },
  { id: "amenity-12", name: "Hammock", icon: "Wind", category: "room" },
  { id: "amenity-13", name: "Mini Bar", icon: "Wine", category: "room" },
  { id: "amenity-14", name: "Safe Box", icon: "Lock", category: "room" },
  { id: "amenity-15", name: "Tea & Coffee", icon: "Coffee", category: "room" },
  { id: "amenity-16", name: "Host Support", icon: "Bell", category: "general" },
];

export const rooms: Room[] = [
  {
    id: "kabana-1",
    name: "Kabana 01 — The Woods",
    slug: "kabana-01-the-woods",
    type: "kabana",
    description:
      "Nestled deep within a canopy of ancient tropical trees, Kabana 01 — The Woods is an intimate wooden sanctuary where nature and luxury coexist in perfect harmony. Handcrafted from sustainably sourced teak and reclaimed timber, this chalet features a spacious king-size bed draped in organic cotton linens, positioned to frame views of the verdant jungle canopy through floor-to-ceiling glass panels. The private elevated deck extends into the treetops, furnished with a handwoven rattan daybed and a freestanding copper soaking tub surrounded by tropical ferns. The open-air bathroom blurs the line between indoors and out, with a rain shower framed by living walls of orchids and bromeliads. Every morning, wake to the symphony of exotic birdsong, and every evening, fall asleep to the gentle whisper of the forest breeze.",
    shortDescription:
      "A treetop wooden sanctuary immersed in tropical jungle, with private deck, open-air bathroom, and canopy views.",
    price: 450,
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=800&fit=crop",
    ],
    thumbnail: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&h=400&fit=crop",
    capacity: 2,
    bedType: "King",
    size: 65,
    view: "Tropical Forest Canopy",
    floor: 1,
    amenities: [
      amenities[0], amenities[1], amenities[2], amenities[3],
      amenities[4], amenities[5], amenities[7], amenities[10],
      amenities[11], amenities[12], amenities[13], amenities[14],
    ],
    features: [
      "Handcrafted teak construction",
      "Floor-to-ceiling jungle canopy views",
      "Elevated private deck with daybed",
      "Freestanding copper soaking tub",
      "Open-air rain shower with living walls",
      "Organic cotton linens & bathrobes",
      "Complimentary Ceylon tea & coffee station",
      "Private hammock in the trees",
      "Access to the guest kitchen",
      "Daily turndown with local botanicals",
    ],
    rating: 4.9,
    reviewCount: 87,
    isAvailable: true,
    isFeatured: true,
    isNew: false,
    isPopular: true,
  },
  {
    id: "kabana-2",
    name: "Kabana 02 — The Creek",
    slug: "kabana-02-the-creek",
    type: "kabana",
    description:
      "Perched along the gentle curve of a private freshwater creek, Kabana 02 — The Creek offers a serene water-side escape wrapped in the warm embrace of Sri Lankan nature. Built with locally sourced stone and timber, the chalet exudes rustic elegance with modern comforts. The spacious king bed faces a panoramic window overlooking the creek, where butterflies dance over lily pads and kingfishers dive at dawn. Your private stone terrace extends to the water's edge, complete with cushioned loungers and a shaded dining pavilion perfect for meals you cook yourself under the stars. The bathroom features a deep stone tub positioned beside a louvered wall that opens to a private garden, creating a seamless connection with the natural surroundings. This is where time slows, and every moment becomes a meditation.",
    shortDescription:
      "A serene waterside retreat along a private creek, with stone terrace, garden bathroom, and a shaded dining pavilion for self-catering meals.",
    price: 320,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop",
    ],
    thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    capacity: 2,
    bedType: "King",
    size: 55,
    view: "Private Creek & Garden",
    floor: 1,
    amenities: [
      amenities[0], amenities[1], amenities[2], amenities[3],
      amenities[4], amenities[5], amenities[7], amenities[10],
      amenities[11], amenities[13], amenities[14], amenities[15],
    ],
    features: [
      "Locally sourced stone & timber construction",
      "Panoramic creek-view windows",
      "Stone terrace with water's edge loungers",
      "Shaded candlelit dining pavilion",
      "Deep stone soaking tub",
      "Private garden bathroom",
      "Guest kitchen access & dining pavilion",
      "Complimentary Ceylon tea selection",
      "Nature trail access from your door",
      "Evening turndown with tropical flowers",
    ],
    rating: 4.8,
    reviewCount: 64,
    isAvailable: true,
    isFeatured: true,
    isNew: false,
    isPopular: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Charlotte Beaumont",
    role: "Travel Writer, Condé Nast Traveller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content:
      "Skyshore is the antidote to modern luxury travel. The moment we stepped into Kabana 01, the jungle wrapped around us like a gentle embrace. Waking to birdsong, bathing in the copper tub surrounded by orchids, dining under the stars on our private deck — every moment felt sacred. This is not a hotel; it is a love letter to Sri Lanka.",
    rating: 5,
    date: "2026-01-15",
  },
  {
    id: "test-2",
    name: "James & Priya Wickramasinghe",
    role: "Anniversary Celebration",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "We chose Kabana 02 for our 10th anniversary and it exceeded every expectation. The private dining pavilion by the creek, illuminated by candlelight with the sound of water — it was the most romantic evening of our lives. We cooked a traditional Sri Lankan rice and curry feast in the guest kitchen and ate it under the stars.",
    rating: 5,
    date: "2026-02-20",
  },
  {
    id: "test-3",
    name: "Anna Lindqvist",
    role: "Sustainable Travel Advocate",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "As someone who cares deeply about responsible travel, Skyshore is a revelation. The commitment to local materials, sustainable practices, and supporting the surrounding community is woven into every detail. And yet nothing is sacrificed — the experience is pure, uncompromising luxury.",
    rating: 5,
    date: "2026-03-10",
  },
  {
    id: "test-4",
    name: "Kenji Yamamoto",
    role: "Photographer, National Geographic",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content:
      "I have photographed luxury properties across Asia, but Skyshore moved me differently. The light filtering through the canopy into Kabana 01 at golden hour is something I will never forget. The staff arranged a private dawn walk to photograph birds — it was the highlight of my assignment.",
    rating: 5,
    date: "2026-04-05",
  },
  {
    id: "test-5",
    name: "Sarah & Michael Chen",
    role: "Honeymoon Guests",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    content:
      "Our honeymoon at Skyshore was nothing short of magical. The intimacy of having only two kabanas on the property meant we had the entire natural setting practically to ourselves. The guest kitchen, the nature walks, the quiet mornings — we left feeling completely renewed.",
    rating: 5,
    date: "2026-05-18",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    name: "Guided Jungle Walk at Dawn",
    description:
      "Traverse ancient forest trails with a local naturalist who reveals the hidden world of Sri Lanka's tropical wildlife — from colorful endemic birds to elusive lizards. The walk culminates at a hidden waterfall where you can swim in crystal-clear waters.",
    price: 35,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "Nature",
    difficulty: "easy",
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "exp-2",
    name: "Traditional Sri Lankan Cooking (Self-Guided)",
    description:
      "Cook authentic Sri Lankan dishes yourself in the guest kitchen. Visit the village market to source fresh spices and ingredients, then prepare rice and curry, hoppers, and pol sambol using recipes passed down through generations.",
    price: 55,
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
    category: "Cultural",
    difficulty: "easy",
    rating: 4.8,
    reviewCount: 203,
  },
  {
    id: "exp-3",
    name: "Sunset River Safari",
    description:
      "Drift along the gentle river at golden hour aboard a traditional Sri Lankan boat. Watch for monitor lizards, water birds, and monkeys in the riverside canopy as the sky ignites with tropical color. Includes fresh king coconut and local snacks.",
    price: 45,
    duration: "2.5 hours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "Nature",
    difficulty: "easy",
    rating: 4.7,
    reviewCount: 178,
  },
  {
    id: "exp-4",
    name: "Ancient Temple Excursion",
    description:
      "Visit a centuries-old Buddhist temple carved into the hillside, guided by a monk who shares the history and spiritual significance of the sacred site. Includes a meditation session overlooking the jungle canopy.",
    price: 30,
    duration: "3.5 hours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "Cultural",
    difficulty: "easy",
    rating: 4.9,
    reviewCount: 134,
  },
  {
    id: "exp-5",
    name: "Spice Garden & Tea Estate Tour",
    description:
      "Journey through lush highlands to visit a working tea estate and aromatic spice garden. Learn how Ceylon tea is produced, taste freshly plucked varieties, and walk among cinnamon, cardamom, and pepper vines with an expert guide.",
    price: 40,
    duration: "5 hours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "Cultural",
    difficulty: "easy",
    rating: 4.8,
    reviewCount: 245,
  },
  {
    id: "exp-6",
    name: "Private Beach Picnic",
    description:
      "Be escorted to a secluded stretch of golden sand reserved exclusively for you. Bring a self-prepared picnic of local food, tropical fruits and chilled drinks to enjoy beneath a palm-fringed canopy. Snorkel the reef or simply bask in paradise.",
    price: 85,
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    category: "Ocean",
    difficulty: "easy",
    rating: 5.0,
    reviewCount: 92,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=800&fit=crop",
    title: "Kabana 01 — The Woods",
    category: "Kabanas",
    type: "image",
  },
  {
    id: "gal-2",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
    title: "Kabana 02 — The Creek",
    category: "Kabanas",
    type: "image",
  },
  {
    id: "gal-3",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=800&fit=crop",
    title: "Tropical Garden Path",
    category: "Nature",
    type: "image",
  },
  {
    id: "gal-4",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    title: "Jungle Canopy at Dawn",
    category: "Nature",
    type: "image",
  },
  {
    id: "gal-5",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=800&fit=crop",
    title: "Guest Kitchen",
    category: "Kitchen",
    type: "image",
  },
  {
    id: "gal-6",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    title: "Secluded Beach",
    category: "Beach",
    type: "image",
  },
  {
    id: "gal-7",
    image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&h=800&fit=crop",
    title: "Open-Air Bathroom",
    category: "Kabanas",
    type: "image",
  },
  {
    id: "gal-8",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
    title: "River Safari",
    category: "Experiences",
    type: "image",
  },
  {
    id: "gal-9",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop",
    title: "Kabana Interior",
    category: "Kabanas",
    type: "image",
  },
  {
    id: "gal-10",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop",
    title: "Villa Aerial View",
    category: "Resort",
    type: "image",
  },
  {
    id: "gal-11",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    title: "Mountain Landscape",
    category: "Nature",
    type: "image",
  },
  {
    id: "gal-12",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&h=800&fit=crop",
    title: "Sunset Deck",
    category: "Kabanas",
    type: "image",
  },
];

export const diningHighlights = [
  {
    title: "Local Ingredients",
    description: "Buy fresh produce, fish, eggs and spices from shops and markets around Tangalle to cook in the guest kitchen.",
    icon: "Leaf",
  },
  {
    title: "Guest Kitchen",
    description: "Skyshore does not have a restaurant or prepare meals. Guests can use the kitchen to cook their own breakfast, lunch and dinner.",
    icon: "UtensilsCrossed",
  },
  {
    title: "Sri Lankan Favourites",
    description: "Try rice and curry, hoppers or coconut sambol using local ingredients and recipes you can make yourself.",
    icon: "ChefHat",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Ruvin Peiris",
    role: "Founder & Host",
    bio: "A Sri Lankan hospitality visionary who left a career in international luxury hotels to create his dream sanctuary in his homeland. Ruvin personally hosts every guest, ensuring each stay feels like family.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    social: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "team-2",
    name: "Tharindu Silva",
    role: "Guest Support",
    bio: "Tharindu helps guests settle in and can point you to local markets, ingredients and the guest kitchen facilities during your stay.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop&crop=face",
    social: {
      instagram: "https://instagram.com",
    },
  },
  {
    id: "team-3",
    name: "Anushka Fernando",
    role: "Nature Guide",
    bio: "A certified naturalist with deep knowledge of Sri Lanka's flora and fauna, Anushka leads our guided jungle walks and river safaris, revealing the hidden wonders of the island with infectious enthusiasm.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "team-4",
    name: "Nilmini Gunawardena",
    role: "Guest Experience Manager",
    bio: "Nilmini's attention to detail and genuine warmth ensure that every aspect of your stay is seamless. From helping you find local markets to settling into the guest kitchen, she anticipates needs before they're spoken.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
    social: {
      instagram: "https://instagram.com",
    },
  },
];
