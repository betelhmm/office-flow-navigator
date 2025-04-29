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
  | 'corridor'
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
  wing?: 'north' | 'south' | 'east' | 'west' | 'central';
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
  corridor: Square,
  general: FileText
};

// Redesigned floor data with corridors and wing-based layout
export const floors: Floor[] = [
  {
    level: 1,
    name: "Ground Floor",
    rooms: [
      // Central area
      { id: "reception-1", name: "Reception", floor: 1, type: "reception", position: { x: 250, y: 250 }, width: 120, height: 80, wing: "central" },
      { id: "main-corridor-1", name: "Main Corridor", floor: 1, type: "corridor", position: { x: 250, y: 350 }, width: 400, height: 60, wing: "central" },
      { id: "east-corridor-1", name: "East Corridor", floor: 1, type: "corridor", position: { x: 420, y: 250 }, width: 60, height: 260, wing: "east" },
      { id: "west-corridor-1", name: "West Corridor", floor: 1, type: "corridor", position: { x: 80, y: 250 }, width: 60, height: 260, wing: "west" },
      
      // Common facilities
      { id: "stairs-central-1", name: "Central Stairs", floor: 1, type: "stairs", position: { x: 250, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "elevator-1", name: "Elevator", floor: 1, type: "elevator", position: { x: 320, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "kitchen-1", name: "Kitchen", floor: 1, type: "kitchen", position: { x: 480, y: 150 }, width: 100, height: 80, wing: "east" },
      { id: "restroom-1", name: "Restroom", floor: 1, type: "restroom", position: { x: 170, y: 150 }, width: 60, height: 60, wing: "west" },
      
      // East wing offices
      { id: "office-101", name: "Office 101", floor: 1, type: "office", position: { x: 480, y: 250 }, width: 100, height: 80, wing: "east" },
      { id: "office-102", name: "Office 102", floor: 1, type: "office", position: { x: 480, y: 350 }, width: 100, height: 80, wing: "east" },
      { id: "office-103", name: "Office 103", floor: 1, type: "office", position: { x: 480, y: 450 }, width: 100, height: 80, wing: "east" },
      
      // West wing offices
      { id: "office-104", name: "Office 104", floor: 1, type: "office", position: { x: 20, y: 250 }, width: 100, height: 80, wing: "west" },
      { id: "office-105", name: "Office 105", floor: 1, type: "office", position: { x: 20, y: 350 }, width: 100, height: 80, wing: "west" },
      { id: "office-106", name: "Office 106", floor: 1, type: "office", position: { x: 20, y: 450 }, width: 100, height: 80, wing: "west" },
      
      // Break room
      { id: "break-room-1", name: "Break Room", floor: 1, type: "break", position: { x: 250, y: 450 }, width: 120, height: 100, wing: "central" },
    ]
  },
  {
    level: 2,
    name: "First Floor",
    rooms: [
      // Central corridors
      { id: "main-corridor-2", name: "Main Corridor", floor: 2, type: "corridor", position: { x: 250, y: 350 }, width: 400, height: 60, wing: "central" },
      { id: "east-corridor-2", name: "East Corridor", floor: 2, type: "corridor", position: { x: 420, y: 250 }, width: 60, height: 260, wing: "east" },
      { id: "west-corridor-2", name: "West Corridor", floor: 2, type: "corridor", position: { x: 80, y: 250 }, width: 60, height: 260, wing: "west" },
      
      // Common facilities
      { id: "stairs-central-2", name: "Central Stairs", floor: 2, type: "stairs", position: { x: 250, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "elevator-2", name: "Elevator", floor: 2, type: "elevator", position: { x: 320, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "kitchen-2", name: "Kitchen", floor: 2, type: "kitchen", position: { x: 480, y: 150 }, width: 100, height: 80, wing: "east" },
      { id: "restroom-2", name: "Restroom", floor: 2, type: "restroom", position: { x: 170, y: 150 }, width: 60, height: 60, wing: "west" },
      
      // Meeting rooms in central area
      { id: "meeting-201", name: "Meeting Room 201", floor: 2, type: "meeting", position: { x: 250, y: 250 }, width: 120, height: 80, wing: "central" },
      { id: "meeting-202", name: "Meeting Room 202", floor: 2, type: "meeting", position: { x: 250, y: 450 }, width: 120, height: 80, wing: "central" },
      
      // East wing offices
      { id: "office-201", name: "Office 201", floor: 2, type: "office", position: { x: 480, y: 250 }, width: 100, height: 80, wing: "east" },
      { id: "office-202", name: "Office 202", floor: 2, type: "office", position: { x: 480, y: 350 }, width: 100, height: 80, wing: "east" },
      { id: "office-203", name: "Office 203", floor: 2, type: "office", position: { x: 480, y: 450 }, width: 100, height: 80, wing: "east" },
      
      // West wing offices
      { id: "office-204", name: "Office 204", floor: 2, type: "office", position: { x: 20, y: 250 }, width: 100, height: 80, wing: "west" },
      { id: "office-205", name: "Office 205", floor: 2, type: "office", position: { x: 20, y: 350 }, width: 100, height: 80, wing: "west" },
      { id: "office-206", name: "Office 206", floor: 2, type: "office", position: { x: 20, y: 450 }, width: 100, height: 80, wing: "west" },
    ]
  },
  {
    level: 3,
    name: "Second Floor",
    rooms: [
      // Central corridors
      { id: "main-corridor-3", name: "Main Corridor", floor: 3, type: "corridor", position: { x: 250, y: 350 }, width: 400, height: 60, wing: "central" },
      { id: "east-corridor-3", name: "East Corridor", floor: 3, type: "corridor", position: { x: 420, y: 250 }, width: 60, height: 260, wing: "east" },
      { id: "west-corridor-3", name: "West Corridor", floor: 3, type: "corridor", position: { x: 80, y: 250 }, width: 60, height: 260, wing: "west" },
      
      // Common facilities
      { id: "stairs-central-3", name: "Central Stairs", floor: 3, type: "stairs", position: { x: 250, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "elevator-3", name: "Elevator", floor: 3, type: "elevator", position: { x: 320, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "kitchen-3", name: "Kitchen", floor: 3, type: "kitchen", position: { x: 480, y: 150 }, width: 100, height: 80, wing: "east" },
      { id: "restroom-3", name: "Restroom", floor: 3, type: "restroom", position: { x: 170, y: 150 }, width: 60, height: 60, wing: "west" },
      
      // Finance department in central area
      { id: "finance-office", name: "Finance Department", floor: 3, type: "finance", position: { x: 250, y: 250 }, width: 120, height: 80, wing: "central" },
      { id: "storage-3", name: "Storage Room", floor: 3, type: "storage", position: { x: 250, y: 450 }, width: 120, height: 80, wing: "central" },
      
      // East wing offices
      { id: "office-301", name: "Office 301", floor: 3, type: "office", position: { x: 480, y: 250 }, width: 100, height: 80, wing: "east" },
      { id: "office-302", name: "Office 302", floor: 3, type: "office", position: { x: 480, y: 350 }, width: 100, height: 80, wing: "east" },
      { id: "office-303", name: "Office 303", floor: 3, type: "office", position: { x: 480, y: 450 }, width: 100, height: 80, wing: "east" },
      
      // West wing offices
      { id: "office-304", name: "Office 304", floor: 3, type: "office", position: { x: 20, y: 250 }, width: 100, height: 80, wing: "west" },
      { id: "office-305", name: "Office 305", floor: 3, type: "office", position: { x: 20, y: 350 }, width: 100, height: 80, wing: "west" },
      { id: "office-306", name: "Office 306", floor: 3, type: "office", position: { x: 20, y: 450 }, width: 100, height: 80, wing: "west" },
    ]
  },
  {
    level: 4,
    name: "Third Floor",
    rooms: [
      // Central corridors
      { id: "main-corridor-4", name: "Main Corridor", floor: 4, type: "corridor", position: { x: 250, y: 350 }, width: 400, height: 60, wing: "central" },
      { id: "east-corridor-4", name: "East Corridor", floor: 4, type: "corridor", position: { x: 420, y: 250 }, width: 60, height: 260, wing: "east" },
      { id: "west-corridor-4", name: "West Corridor", floor: 4, type: "corridor", position: { x: 80, y: 250 }, width: 60, height: 260, wing: "west" },
      
      // Common facilities
      { id: "stairs-central-4", name: "Central Stairs", floor: 4, type: "stairs", position: { x: 250, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "elevator-4", name: "Elevator", floor: 4, type: "elevator", position: { x: 320, y: 150 }, width: 60, height: 60, wing: "central" },
      { id: "kitchen-4", name: "Kitchen", floor: 4, type: "kitchen", position: { x: 480, y: 150 }, width: 100, height: 80, wing: "east" },
      { id: "restroom-4", name: "Restroom", floor: 4, type: "restroom", position: { x: 170, y: 150 }, width: 60, height: 60, wing: "west" },
      
      // Executive offices in central area
      { id: "exec-office", name: "Executive Office", floor: 4, type: "office", position: { x: 250, y: 250 }, width: 120, height: 80, wing: "central" },
      { id: "boardroom", name: "Boardroom", floor: 4, type: "meeting", position: { x: 250, y: 450 }, width: 120, height: 80, wing: "central" },
      
      // East wing offices
      { id: "office-401", name: "Office 401", floor: 4, type: "office", position: { x: 480, y: 250 }, width: 100, height: 80, wing: "east" },
      { id: "office-402", name: "Office 402", floor: 4, type: "office", position: { x: 480, y: 350 }, width: 100, height: 80, wing: "east" },
      { id: "office-403", name: "Office 403", floor: 4, type: "office", position: { x: 480, y: 450 }, width: 100, height: 80, wing: "east" },
      
      // West wing offices
      { id: "office-404", name: "Office 404", floor: 4, type: "office", position: { x: 20, y: 250 }, width: 100, height: 80, wing: "west" },
      { id: "office-405", name: "Office 405", floor: 4, type: "office", position: { x: 20, y: 350 }, width: 100, height: 80, wing: "west" },
      { id: "office-406", name: "Office 406", floor: 4, type: "office", position: { x: 20, y: 450 }, width: 100, height: 80, wing: "west" },
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
