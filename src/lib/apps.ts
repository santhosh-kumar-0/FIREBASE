import {
  MessageSquare,
  Camera,
  Mail,
  Globe,
  Users,
  Landmark,
  type LucideIcon,
  ShoppingBag,
  Music,
  Clock,
  Calculator,
  CalendarDays,
  CloudSun,
  FileText,
  Clapperboard,
  HeartPulse,
  Mic,
  Settings,
  Shield,
  Wallet,
} from 'lucide-react';

export interface App {
  id: number;
  name: string;
  icon: LucideIcon;
  locked: boolean;
}

export const mockAppsData: App[] = [
  { id: 1, name: 'Messages', icon: MessageSquare, locked: true },
  { id: 2, name: 'Gallery', icon: Camera, locked: true },
  { id: 3, name: 'Email', icon: Mail, locked: false },
  { id: 4, name: 'Browser', icon: Globe, locked: false },
  { id: 5, name: 'Contacts', icon: Users, locked: true },
  { id: 6, name: 'Banking', icon: Landmark, locked: true },
  { id: 7, name: 'Store', icon: ShoppingBag, locked: false },
  { id: 8, name: 'Music', icon: Music, locked: false },
  { id: 9, name: 'Clock', icon: Clock, locked: false },
  { id: 10, name: 'Calculator', icon: Calculator, locked: false },
  { id: 11, name: 'Calendar', icon: CalendarDays, locked: true },
  { id: 12, name: 'Weather', icon: CloudSun, locked: false },
  { id: 13, anme: 'Notes', icon: FileText, locked: true },
  { id: 14, name: 'Videos', icon: Clapperboard, locked: false },
  { id: 15, name: 'Health', icon: HeartPulse, locked: true },
  { id: 16, name: 'Podcasts', icon: Mic, locked: false },
  { id: 17, name: 'Settings', icon: Settings, locked: false },
  { id: 18, name: 'Authenticator', icon: Shield, locked: true },
  { id: 19, name: 'Wallet', icon: Wallet, locked: true },
];
