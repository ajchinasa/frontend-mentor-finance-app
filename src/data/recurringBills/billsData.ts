import { Zap, Leaf, Droplets, Cloud, Gamepad2, GraduationCap, Scissors, Crown } from 'lucide-react';


export interface Bill {
  id: number;
  title: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'overdue' | 'pending';
  icon: React.ElementType; 
  iconBg: string;
}

export const bills: Bill[] = [
  { id: 1, title: 'Spark Electric Solutions', dueDate: 'Monthly-2nd', amount: 100.00, status: 'paid', icon: Zap, iconBg: 'bg-[#C64B3F]' },
  { id: 2, title: 'Serenity Spa & Wellness', dueDate: 'Monthly-3rd', amount: 30.00, status: 'paid', icon: Scissors, iconBg: 'bg-[#EBC9AB]' },
  { id: 3, title: 'Elevate Education', dueDate: 'Monthly-4th', amount: 50.00, status: 'paid', icon: GraduationCap, iconBg: 'bg-[#2E7D73]' },
  { id: 4, title: 'Pixel Playground', dueDate: 'Monthly-11th', amount: 10.00, status: 'paid', icon: Gamepad2, iconBg: 'bg-[#9181BD]' },
  { id: 5, title: 'Nimbus Data Storage', dueDate: 'Monthly-21st', amount: 9.99, status: 'overdue', icon: Cloud, iconBg: 'bg-[#B36B4D]' },
  { id: 6, title: 'ByteWise', dueDate: 'Monthly-23rd', amount: 49.99, status: 'overdue', icon: Crown, iconBg: 'bg-[#BE95C4]' },
  { id: 7, title: 'EcoFuel Energy', dueDate: 'Monthly-29th', amount: 35.00, status: 'pending', icon: Leaf, iconBg: 'bg-[#6D8A88]' },
  { id: 8, title: 'Aqua Flow Utilities', dueDate: 'Monthly-30th', amount: 100.00, status: 'pending', icon: Droplets, iconBg: 'bg-[#5F6375]' },
];