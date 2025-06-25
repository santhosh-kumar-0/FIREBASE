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
];
