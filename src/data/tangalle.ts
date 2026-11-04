export type TangalleLocation = {
  name: string;
  coordinates: { lat: number; lng: number } | null;
  hotelAddress?: string;
};

export type TangalleAttraction = {
  name: string;
  category: string;
  image: string;
  description: string;
  distance: string | null;
  travelTime: string | null;
  coordinates: { lat: number; lng: number } | null;
  mapUrl: string;
};

export type TangalleExperience = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type FoodExperience = {
  title: string;
  description: string;
  image: string;
};

export const hotelLocation: TangalleLocation = {
  name: 'Skyshore',
  coordinates: null,
  hotelAddress: 'Tangalle, Southern Sri Lanka — exact address shared on confirmation',
};

export const tangalleAttractions: TangalleAttraction[] = [
  {
    name: 'Tangalle Beach',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=900&fit=crop',
    description: "Discover Tangalle's beautiful palm-fringed southern coastline.",
    distance: null,
    travelTime: null,
    coordinates: null,
    mapUrl: 'https://maps.google.com/?q=Tangalle+Beach+Sri+Lanka',
  },
  {
    name: 'Goyambokka Beach',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=900&fit=crop',
    description: 'A beautiful palm-lined sandy bay near Tangalle.',
    distance: null,
    travelTime: null,
    coordinates: null,
    mapUrl: 'https://maps.google.com/?q=Goyambokka+Beach+Sri+Lanka',
  },
  {
    name: 'Rekawa Turtle Watching',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=900&fit=crop',
    description: "Experience one of southern Sri Lanka's best-known sea turtle nesting areas.",
    distance: null,
    travelTime: null,
    coordinates: null,
    mapUrl: 'https://maps.google.com/?q=Rekawa+Sri+Lanka',
  },
  {
    name: 'Hummanaya Blow Hole',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=900&fit=crop',
    description: 'Discover the spectacular coastal blowhole near Kudawella.',
    distance: null,
    travelTime: null,
    coordinates: null,
    mapUrl: 'https://maps.google.com/?q=Hummanaya+Blowhole+Sri+Lanka',
  },
  {
    name: 'Mulkirigala Rock Temple',
    category: 'Culture & Heritage',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&h=900&fit=crop',
    description: 'Explore the historic rock temple, cave shrines and panoramic surroundings.',
    distance: null,
    travelTime: null,
    coordinates: null,
    mapUrl: 'https://maps.google.com/?q=Mulkirigala+Rock+Temple+Sri+Lanka',
  },
  {
    name: 'Kalametiya Bird Sanctuary',
    category: 'Nature & Wildlife',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&h=900&fit=crop',
    description: 'Explore lagoons, wetlands and birdlife on Sri Lanka\'s southern coast.',
    distance: null,
    travelTime: null,
    coordinates: null,
    mapUrl: 'https://maps.google.com/?q=Kalametiya+Bird+Sanctuary+Sri+Lanka',
  },
  {
    name: 'Hiriketiya',
    category: 'Beach & Surf',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&h=900&fit=crop',
    description: "Discover one of the south coast's popular tropical beach and surf destinations.",
    distance: null,
    travelTime: null,
    coordinates: null,
    mapUrl: 'https://maps.google.com/?q=Hiriketiya+Beach+Sri+Lanka',
  },
];

export const tangalleExperiences: TangalleExperience[] = [
  {
    id: 'turtle-watching',
    title: 'Turtle Watching',
    category: 'Wildlife',
    description: 'Evening turtle experiences and quiet coastal walks near the southern shore.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'beach-escape',
    title: 'Beach Escape',
    category: 'Beach',
    description: 'Palm-fringed beaches, warm sand and slow afternoons by the Indian Ocean.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'surf-experience',
    title: 'Surf Experience',
    category: 'Adventure',
    description: 'Popular points and gentle surf sessions for both beginners and confident riders.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'bird-watching',
    title: 'Bird Watching',
    category: 'Nature',
    description: 'Lagoon walks and coastal wetlands alive with colour and birdlife.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'rock-temple-visit',
    title: 'Rock Temple Visit',
    category: 'Culture',
    description: 'Historic cave shrines and panoramic temple viewpoints in the hills.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'lagoon-experience',
    title: 'Lagoon Experience',
    category: 'Nature',
    description: 'Slow lagoon afternoons, mangroves and wide open skies in the south coast wetlands.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'southern-coast-tour',
    title: 'Southern Coast Tour',
    category: 'Discovery',
    description: 'A curated day of beaches, local culture, wildlife and coastal viewpoints.',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'sri-lankan-food-experience',
    title: 'Sri Lankan Food Experience',
    category: 'Dining',
    description: 'Breakfasts, seafood and slow island flavours shaped by local produce.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'sunset-experience',
    title: 'Sunset Experience',
    category: 'Wellbeing',
    description: 'Golden-hour skies, open ocean and calm evenings under tropical light.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&h=700&fit=crop',
    enabled: true,
  },
  {
    id: 'local-village-experience',
    title: 'Local Village Experience',
    category: 'Culture',
    description: 'Small village encounters, local stories and everyday southern Sri Lankan life.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=700&fit=crop',
    enabled: true,
  },
];

export const tasteSriLanka: FoodExperience[] = [
  {
    title: 'Sri Lankan Breakfast',
    description: 'Warm local breakfasts, fresh fruit and comforting island staples.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900&h=700&fit=crop',
  },
  {
    title: 'Hoppers & String Hoppers',
    description: 'Soft, savoury favourites served with curries, sambol and local sides.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&h=700&fit=crop',
  },
  {
    title: 'Coconut Sambol',
    description: 'Bright and fragrant coconut flavours that define Sri Lankan coastal dining.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&h=700&fit=crop',
  },
  {
    title: 'Fresh Seafood',
    description: 'Sun-warmed seafood, grilled catches and island-inspired coastal meals.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&h=700&fit=crop',
  },
  {
    title: 'Ceylon Tea',
    description: 'Slow sips of fragrant Ceylon tea for gentle island afternoons.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&h=700&fit=crop',
  },
  {
    title: 'Tropical Fruit',
    description: 'Sweet fruit, local juices and seasonal island produce at every turn.',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=900&h=700&fit=crop',
  },
];
