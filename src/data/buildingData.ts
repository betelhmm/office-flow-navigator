
import { 
  MapPin, ArrowUp, Navigation, Coffee, 
  Users, Phone, Presentation, Printer, 
  Box, Mail, FileText, Calculator,
  Bed, Sofa, Square, UtensilsCrossed
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
  | 'break'
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
  width: number;
  height: number;
  description?: string;
  icon?: any;
  isAccessible?: boolean;
  rotation?: number;
}

export interface Floor {
  level: number;
  name: string;
  rooms: Room[];
}

export const iconByType = {
  office: Users,
  meeting: Presentation,
  stairs: ArrowUp,
  elevator: Navigation,
  restroom: MapPin,
  kitchen: UtensilsCrossed,
  reception: Phone,
  storage: Box,
  print: Printer,
  mail: Mail,
  finance: Calculator,
  break: Sofa,
  general: FileText
};

// New floor data based on the provided layout
export const floors: Floor[] = [
  {
    level: 1,
    name: "Ground Floor",
    rooms: [
      // Common areas
      { id: "reception-1", name: "Reception", floor: 1, type: "reception", position: { x: 250, y: 400 }, width: 120, height: 60 },
      { id: "stairs-1", name: "Stairs", floor: 1, type: "stairs", position: { x: 70, y: 400 }, width: 60, height: 60 },
      { id: "elevator-1", name: "Elevator", floor: 1, type: "elevator", position: { x: 430, y: 400 }, width: 60, height: 60 },
      { id: "kitchen-1", name: "Kitchen", floor: 1, type: "kitchen", position: { x: 430, y: 200 }, width: 100, height: 100 },
      { id: "restroom-1", name: "Restroom", floor: 1, type: "restroom", position: { x: 430, y: 300 }, width: 100, height: 60 },
      
      // Large open office
      { id: "break-room-1", name: "Break Room", floor: 1, type: "break", position: { x: 260, y: 180 }, width: 140, height: 200 },
      { id: "office-large-1", name: "Open Office", floor: 1, type: "office", position: { x: 100, y: 150 }, width: 160, height: 200 },
      
      // Individual offices
      { id: "office-101", name: "Office 101", floor: 1, type: "office", position: { x: 80, y: 500 }, width: 120, height: 120 },
      { id: "office-102", name: "Office 102", floor: 1, type: "office", position: { x: 200, y: 500 }, width: 120, height: 120 },
      { id: "office-103", name: "Office 103", floor: 1, type: "office", position: { x: 320, y: 500 }, width: 120, height: 120 },
      { id: "office-104", name: "Office 104", floor: 1, type: "office", position: { x: 440, y: 500 }, width: 120, height: 120 },
    ]
  },
  {
    level: 2,
    name: "First Floor",
    rooms: [
      // Common areas
      { id: "stairs-2", name: "Stairs", floor: 2, type: "stairs", position: { x: 70, y: 400 }, width: 60, height: 60 },
      { id: "elevator-2", name: "Elevator", floor: 2, type: "elevator", position: { x: 430, y: 400 }, width: 60, height: 60 },
      { id: "kitchen-2", name: "Kitchen", floor: 2, type: "kitchen", position: { x: 430, y: 200 }, width: 100, height: 100 },
      { id: "restroom-2", name: "Restroom", floor: 2, type: "restroom", position: { x: 430, y: 300 }, width: 100, height: 60 },
      
      // Meeting rooms
      { id: "meeting-201", name: "Meeting Room 201", floor: 2, type: "meeting", position: { x: 260, y: 180 }, width: 140, height: 140 },
      { id: "meeting-202", name: "Meeting Room 202", floor: 2, type: "meeting", position: { x: 100, y: 150 }, width: 160, height: 180 },
      
      // Individual offices
      { id: "office-201", name: "Office 201", floor: 2, type: "office", position: { x: 80, y: 500 }, width: 120, height: 120 },
      { id: "office-202", name: "Office 202", floor: 2, type: "office", position: { x: 200, y: 500 }, width: 120, height: 120 },
      { id: "office-203", name: "Office 203", floor: 2, type: "office", position: { x: 320, y: 500 }, width: 120, height: 120 },
      { id: "office-204", name: "Office 204", floor: 2, type: "office", position: { x: 440, y: 500 }, width: 120, height: 120 },
    ]
  },
  {
    level: 3,
    name: "Second Floor",
    rooms: [
      // Common areas
      { id: "stairs-3", name: "Stairs", floor: 3, type: "stairs", position: { x: 70, y: 400 }, width: 60, height: 60 },
      { id: "elevator-3", name: "Elevator", floor: 3, type: "elevator", position: { x: 430, y: 400 }, width: 60, height: 60 },
      { id: "kitchen-3", name: "Kitchen", floor: 3, type: "kitchen", position: { x: 430, y: 200 }, width: 100, height: 100 },
      { id: "restroom-3", name: "Restroom", floor: 3, type: "restroom", position: { x: 430, y: 300 }, width: 100, height: 60 },
      
      // Finance department
      { id: "finance-office", name: "Finance Department", floor: 3, type: "finance", position: { x: 260, y: 180 }, width: 140, height: 200 },
      { id: "storage-3", name: "Storage Room", floor: 3, type: "storage", position: { x: 100, y: 150 }, width: 160, height: 200 },
      
      // Individual offices
      { id: "office-301", name: "Office 301", floor: 3, type: "office", position: { x: 80, y: 500 }, width: 120, height: 120 },
      { id: "office-302", name: "Office 302", floor: 3, type: "office", position: { x: 200, y: 500 }, width: 120, height: 120 },
      { id: "office-303", name: "Office 303", floor: 3, type: "office", position: { x: 320, y: 500 }, width: 120, height: 120 },
      { id: "office-304", name: "Office 304", floor: 3, type: "office", position: { x: 440, y: 500 }, width: 120, height: 120 },
    ]
  },
  {
    level: 4,
    name: "Third Floor",
    rooms: [
      // Common areas
      { id: "stairs-4", name: "Stairs", floor: 4, type: "stairs", position: { x: 70, y: 400 }, width: 60, height: 60 },
      { id: "elevator-4", name: "Elevator", floor: 4, type: "elevator", position: { x: 430, y: 400 }, width: 60, height: 60 },
      { id: "kitchen-4", name: "Kitchen", floor: 4, type: "kitchen", position: { x: 430, y: 200 }, width: 100, height: 100 },
      { id: "restroom-4", name: "Restroom", floor: 4, type: "restroom", position: { x: 430, y: 300 }, width: 100, height: 60 },
      
      // Executive offices
      { id: "exec-office", name: "Executive Office", floor: 4, type: "office", position: { x: 260, y: 180 }, width: 140, height: 200 },
      { id: "meeting-401", name: "Board Room", floor: 4, type: "meeting", position: { x: 100, y: 150 }, width: 160, height: 180 },
      
      // Individual offices
      { id: "office-401", name: "Office 401", floor: 4, type: "office", position: { x: 80, y: 500 }, width: 120, height: 120 },
      { id: "office-402", name: "Office 402", floor: 4, type: "office", position: { x: 200, y: 500 }, width: 120, height: 120 },
      { id: "office-403", name: "Office 403", floor: 4, type: "office", position: { x: 320, y: 500 }, width: 120, height: 120 },
      { id: "office-404", name: "Office 404", floor: 4, type: "office", position: { x: 440, y: 500 }, width: 120, height: 120 },
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
