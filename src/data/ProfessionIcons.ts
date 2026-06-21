import {
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  PenTool,
  Palette,
  Camera,
  Video,
  Music,
  Mic,
  Clapperboard,
  Newspaper,
  HeartPulse,
  Stethoscope,
  Shield,
  Scale,
  Building2,
  Hammer,
  HardHat,
  Wrench,
  Truck,
  Plane,
  Ship,
  Factory,
  ShoppingBag,
  Store,
  DollarSign,
  Landmark,
  BarChart3,
  Calculator,
  Globe,
  Languages,
  Brain,
  Cpu,
  Code2,
  Database,
  Smartphone,
  Monitor,
  Server,
  Cloud,
  Bot,
  Leaf,
  Trees,
  Mountain,
  FlaskConical,
  Atom,
  Microscope,
  TestTube,
  Trophy,
  Dumbbell,
  Bike,
  Gamepad2,
  BookMarked,
  Library,
  Users,
  MessageSquare,
  Handshake,
  Lightbulb,
  Sparkles,
  Target,
  Compass,
  Rocket,
  Settings,
  Cog,
  Star,
  type LucideIcon,
} from "lucide-react";

export interface ProfessionIconItem {
  label: string;
  value: string;
  icon: LucideIcon;
  group: string;
}

export const PROFESSION_ICONS: ProfessionIconItem[] = [
  // Generic
  { label: "Profile", value: "profile", icon: User, group: "Generic" },
  { label: "Career", value: "career", icon: Briefcase, group: "Generic" },
  { label: "Skills", value: "skills", icon: Star, group: "Generic" },

  // Education
  { label: "Education", value: "education", icon: GraduationCap, group: "Education" },
  { label: "Teaching", value: "teaching", icon: BookOpen, group: "Education" },
  { label: "Training", value: "training", icon: BookMarked, group: "Education" },
  { label: "Research", value: "research", icon: Library, group: "Education" },

  // Creative
  { label: "Design", value: "design", icon: Palette, group: "Creative" },
  { label: "Graphic Design", value: "graphicDesign", icon: PenTool, group: "Creative" },
  { label: "Photography", value: "photography", icon: Camera, group: "Creative" },
  { label: "Videography", value: "videography", icon: Video, group: "Creative" },
  { label: "Music", value: "music", icon: Music, group: "Creative" },
  { label: "Podcasting", value: "podcasting", icon: Mic, group: "Creative" },
  { label: "Filmmaking", value: "filmmaking", icon: Clapperboard, group: "Creative" },
  { label: "Journalism", value: "journalism", icon: Newspaper, group: "Creative" },

  // Medical
  { label: "Healthcare", value: "healthcare", icon: HeartPulse, group: "Medical" },
  { label: "Doctor", value: "doctor", icon: Stethoscope, group: "Medical" },
  { label: "Nursing", value: "nursing", icon: HeartPulse, group: "Medical" },

  // Legal & Security
  { label: "Law", value: "law", icon: Scale, group: "Legal & Security" },
  { label: "Security", value: "security", icon: Shield, group: "Legal & Security" },

  // Business
  { label: "Business", value: "business", icon: Briefcase, group: "Business" },
  { label: "Finance", value: "finance", icon: DollarSign, group: "Business" },
  { label: "Accounting", value: "accounting", icon: Calculator, group: "Business" },
  { label: "Banking", value: "banking", icon: Landmark, group: "Business" },
  { label: "Sales", value: "sales", icon: Handshake, group: "Business" },
  { label: "Marketing", value: "marketing", icon: BarChart3, group: "Business" },

  // Engineering
  { label: "Engineering", value: "engineering", icon: Cog, group: "Engineering" },
  { label: "Mechanical", value: "mechanical", icon: Wrench, group: "Engineering" },
  { label: "Civil", value: "civil", icon: Building2, group: "Engineering" },
  { label: "Construction", value: "construction", icon: HardHat, group: "Engineering" },
  { label: "Manufacturing", value: "manufacturing", icon: Factory, group: "Engineering" },

  // Transport
  { label: "Logistics", value: "logistics", icon: Truck, group: "Transport" },
  { label: "Aviation", value: "aviation", icon: Plane, group: "Transport" },
  { label: "Maritime", value: "maritime", icon: Ship, group: "Transport" },

  // Retail
  { label: "Retail", value: "retail", icon: Store, group: "Retail" },
  { label: "E-Commerce", value: "ecommerce", icon: ShoppingBag, group: "Retail" },

  // Technology
  { label: "Software", value: "software", icon: Code2, group: "Technology" },
  { label: "Frontend", value: "frontend", icon: Monitor, group: "Technology" },
  { label: "Backend", value: "backend", icon: Server, group: "Technology" },
  { label: "Mobile", value: "mobile", icon: Smartphone, group: "Technology" },
  { label: "Database", value: "database", icon: Database, group: "Technology" },
  { label: "Cloud", value: "cloud", icon: Cloud, group: "Technology" },
  { label: "Artificial Intelligence", value: "ai", icon: Bot, group: "Technology" },
  { label: "Technology", value: "technology", icon: Cpu, group: "Technology" },

  // Science
  { label: "Science", value: "science", icon: FlaskConical, group: "Science" },
  { label: "Chemistry", value: "chemistry", icon: TestTube, group: "Science" },
  { label: "Physics", value: "physics", icon: Atom, group: "Science" },
  { label: "Biology", value: "biology", icon: Microscope, group: "Science" },

  // Environment
  { label: "Agriculture", value: "agriculture", icon: Leaf, group: "Environment" },
  { label: "Forestry", value: "forestry", icon: Trees, group: "Environment" },
  { label: "Geology", value: "geology", icon: Mountain, group: "Environment" },

  // Sports
  { label: "Sports", value: "sports", icon: Trophy, group: "Sports" },
  { label: "Fitness", value: "fitness", icon: Dumbbell, group: "Sports" },
  { label: "Cycling", value: "cycling", icon: Bike, group: "Sports" },
  { label: "Gaming", value: "gaming", icon: Gamepad2, group: "Sports" },

  // Communication
  { label: "Communication", value: "communication", icon: MessageSquare, group: "Communication" },
  { label: "Community", value: "community", icon: Users, group: "Communication" },
  { label: "Languages", value: "languages", icon: Languages, group: "Communication" },

  // Personal Development
  { label: "Leadership", value: "leadership", icon: Compass, group: "Personal Development" },
  { label: "Innovation", value: "innovation", icon: Lightbulb, group: "Personal Development" },
  { label: "Creativity", value: "creativity", icon: Sparkles, group: "Personal Development" },
  { label: "Goals", value: "goals", icon: Target, group: "Personal Development" },

  // Startup
  { label: "Startup", value: "startup", icon: Rocket, group: "Startup" },

  // Misc
  { label: "Web", value: "web", icon: Globe, group: "Misc" },
  { label: "Settings", value: "settings", icon: Settings, group: "Misc" },
];

export const PROFESSION_ICON_MAP = Object.fromEntries(
  PROFESSION_ICONS.map(item => [item.value, item.icon])
);

export const GROUPED_PROFESSION_ICONS = PROFESSION_ICONS.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof PROFESSION_ICONS>);