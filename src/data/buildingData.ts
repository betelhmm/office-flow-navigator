
import { 
  MapPin, StairsIcon, Workflow, Coffee, 
  Users, Phone, Presentation, Printer, 
  Box, Mail, FileText, Calculator 
} from "lucide-react";

export type RoomType = 
  | 'office' 
  | 'meeting' 
  | 'stairs' 
  | 'elevator' 
  | 'restroom' 
  | 'kitchen' 
  | 'reception'
  | 'storage'
  | 'print'
  | 'mail'
  | 'finance'
  | 'general';

export interface Room {
  id: string;
  name: string;
  floor: number;
  type: RoomType;
  position: {
    x: number;
    y: number;
  };
  description?: string;
  icon?: any;
  isAccessible?: boolean;
}

export interface Floor {
  level: number;
  name: string;
  rooms: Room[];
}

export const iconByType = {
  office: Users,
  meeting: Presentation,
  stairs: StairsIcon,
  elevator: Workflow,
  restroom: MapPin,
  kitchen: Coffee,
  reception: Phone,
  storage: Box,
  print: Printer,
  mail: Mail,
  finance: Calculator,
  general: FileText
};

export const floors: Floor[] = [
  {
    level: 1,
    name: "Ground Floor",
    rooms: [
      { id: "reception", name: "Reception", floor: 1, type: "reception", position: { x: 50, y: 50 } },
      { id: "meeting-101", name: "Meeting Room 101", floor: 1, type: "meeting", position: { x: 150, y: 50 } },
      { id: "meeting-102", name: "Meeting Room 102", floor: 1, type: "meeting", position: { x: 250, y: 50 } },
      { id: "stairs-1", name: "Stairs", floor: 1, type: "stairs", position: { x: 350, y: 50 } },
      { id: "elevator-1", name: "Elevator", floor: 1, type: "elevator", position: { x: 450, y: 50 } },
      { id: "kitchen-1", name: "Kitchen", floor: 1, type: "kitchen", position: { x: 50, y: 150 } },
      { id: "restroom-1m", name: "Men's Restroom", floor: 1, type: "restroom", position: { x: 150, y: 150 } },
      { id: "restroom-1w", name: "Women's Restroom", floor: 1, type: "restroom", position: { x: 250, y: 150 }, isAccessible: true },
      { id: "office-101", name: "Office 101", floor: 1, type: "office", position: { x: 350, y: 150 } },
      { id: "office-102", name: "Office 102", floor: 1, type: "office", position: { x: 450, y: 150 } },
      { id: "mail-1", name: "Mail Room", floor: 1, type: "mail", position: { x: 50, y: 250 } },
      { id: "storage-1", name: "Storage Room", floor: 1, type: "storage", position: { x: 150, y: 250 } },
      { id: "print-1", name: "Print Station", floor: 1, type: "print", position: { x: 250, y: 250 } },
      { id: "office-103", name: "Office 103", floor: 1, type: "office", position: { x: 350, y: 250 } },
      { id: "office-104", name: "Office 104", floor: 1, type: "office", position: { x: 450, y: 250 } },
    ]
  },
  {
    level: 2,
    name: "First Floor",
    rooms: [
      { id: "office-201", name: "Office 201", floor: 2, type: "office", position: { x: 50, y: 50 } },
      { id: "office-202", name: "Office 202", floor: 2, type: "office", position: { x: 150, y: 50 } },
      { id: "office-203", name: "Office 203", floor: 2, type: "office", position: { x: 250, y: 50 } },
      { id: "stairs-2", name: "Stairs", floor: 2, type: "stairs", position: { x: 350, y: 50 } },
      { id: "elevator-2", name: "Elevator", floor: 2, type: "elevator", position: { x: 450, y: 50 } },
      { id: "meeting-201", name: "Meeting Room 201", floor: 2, type: "meeting", position: { x: 50, y: 150 } },
      { id: "meeting-202", name: "Meeting Room 202", floor: 2, type: "meeting", position: { x: 150, y: 150 } },
      { id: "restroom-2m", name: "Men's Restroom", floor: 2, type: "restroom", position: { x: 250, y: 150 } },
      { id: "restroom-2w", name: "Women's Restroom", floor: 2, type: "restroom", position: { x: 350, y: 150 }, isAccessible: true },
      { id: "kitchen-2", name: "Kitchen", floor: 2, type: "kitchen", position: { x: 450, y: 150 } },
      { id: "finance-1", name: "Finance Dept", floor: 2, type: "finance", position: { x: 50, y: 250 } },
      { id: "office-204", name: "Office 204", floor: 2, type: "office", position: { x: 150, y: 250 } },
      { id: "office-205", name: "Office 205", floor: 2, type: "office", position: { x: 250, y: 250 } },
      { id: "office-206", name: "Office 206", floor: 2, type: "office", position: { x: 350, y: 250 } },
      { id: "print-2", name: "Print Station", floor: 2, type: "print", position: { x: 450, y: 250 } },
    ]
  },
  {
    level: 3,
    name: "Second Floor",
    rooms: [
      { id: "office-301", name: "Office 301", floor: 3, type: "office", position: { x: 50, y: 50 } },
      { id: "office-302", name: "Office 302", floor: 3, type: "office", position: { x: 150, y: 50 } },
      { id: "meeting-301", name: "Meeting Room 301", floor: 3, type: "meeting", position: { x: 250, y: 50 } },
      { id: "stairs-3", name: "Stairs", floor: 3, type: "stairs", position: { x: 350, y: 50 } },
      { id: "elevator-3", name: "Elevator", floor: 3, type: "elevator", position: { x: 450, y: 50 } },
      { id: "office-303", name: "Office 303", floor: 3, type: "office", position: { x: 50, y: 150 } },
      { id: "office-304", name: "Office 304", floor: 3, type: "office", position: { x: 150, y: 150 } },
      { id: "meeting-302", name: "Meeting Room 302", floor: 3, type: "meeting", position: { x: 250, y: 150 } },
      { id: "restroom-3m", name: "Men's Restroom", floor: 3, type: "restroom", position: { x: 350, y: 150 }, isAccessible: true },
      { id: "restroom-3w", name: "Women's Restroom", floor: 3, type: "restroom", position: { x: 450, y: 150 } },
      { id: "storage-3", name: "Storage Room", floor: 3, type: "storage", position: { x: 50, y: 250 } },
      { id: "print-3", name: "Print Station", floor: 3, type: "print", position: { x: 150, y: 250 } },
      { id: "office-305", name: "Office 305", floor: 3, type: "office", position: { x: 250, y: 250 } },
      { id: "office-306", name: "Office 306", floor: 3, type: "office", position: { x: 350, y: 250 } },
      { id: "office-307", name: "Office 307", floor: 3, type: "office", position: { x: 450, y: 250 } },
    ]
  }
];

export const getRoom = (id: string): Room | undefined => {
  for (const floor of floors) {
    const room = floor.rooms.find(room => room.id === id);
    if (room) return room;
  }
  return undefined;
};

export const getRoomsByFloor = (floorLevel: number): Room[] => {
  const floor = floors.find(f => f.level === floorLevel);
  return floor ? floor.rooms : [];
};

export const getRoomsByType = (type: RoomType): Room[] => {
  return floors.flatMap(floor => floor.rooms.filter(room => room.type === type));
};

export const searchRooms = (query: string): Room[] => {
  const lowerQuery = query.toLowerCase();
  return floors.flatMap(floor => 
    floor.rooms.filter(room => 
      room.name.toLowerCase().includes(lowerQuery) || 
      (room.description && room.description.toLowerCase().includes(lowerQuery))
    )
  );
};
