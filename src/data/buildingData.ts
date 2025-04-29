
import { 
  MapPin, ArrowUp, Navigation, Users, 
  Phone, Presentation, Printer, Box, 
  Mail, FileText, Calculator, Sofa, 
  Square, UtensilsCrossed
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

// Redesigned floor data with complex layouts and non-rectangular shapes
export const floors: Floor[] = [
  {
    level: 1,
    name: "Ground Floor",
    rooms: [
      // Complex corridor layout - irregular shapes
      { id: "main-corridor-1", name: "Main Corridor", floor: 1, type: "corridor", position: { x: 250, y: 300 }, width: 400, height: 60, wing: "central" },
      { id: "east-corridor-1", name: "East Wing", floor: 1, type: "corridor", position: { x: 420, y: 220 }, width: 60, height: 180, wing: "east" },
      { id: "west-corridor-1", name: "West Wing", floor: 1, type: "corridor", position: { x: 80, y: 220 }, width: 60, height: 180, wing: "west" },
      { id: "north-corridor-1", name: "North Wing", floor: 1, type: "corridor", position: { x: 250, y: 120 }, width: 350, height: 60, wing: "north" },
      { id: "ne-corridor-1", name: "NE Corridor", floor: 1, type: "corridor", position: { x: 350, y: 170 }, width: 60, height: 100, wing: "north" },
      { id: "nw-corridor-1", name: "NW Corridor", floor: 1, type: "corridor", position: { x: 150, y: 170 }, width: 60, height: 100, wing: "north" },
      
      // Central area with irregular shapes
      { id: "reception-1", name: "Reception", floor: 1, type: "reception", position: { x: 250, y: 220 }, width: 160, height: 100, wing: "central" },
      
      // Facility rooms
      { id: "stairs-central-1", name: "Central Stairs", floor: 1, type: "stairs", position: { x: 180, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "elevator-1", name: "Elevator", floor: 1, type: "elevator", position: { x: 320, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "kitchen-1", name: "Kitchen", floor: 1, type: "kitchen", position: { x: 480, y: 120 }, width: 100, height: 80, wing: "north" },
      { id: "restroom-1", name: "Restroom", floor: 1, type: "restroom", position: { x: 100, y: 120 }, width: 60, height: 60, wing: "north" },
      
      // East wing offices - irregular shapes
      { id: "office-101", name: "Office 101", floor: 1, type: "office", position: { x: 500, y: 180 }, width: 90, height: 80, wing: "east" },
      { id: "office-102", name: "Office 102", floor: 1, type: "office", position: { x: 500, y: 280 }, width: 90, height: 80, wing: "east" },
      { id: "office-103", name: "Office 103", floor: 1, type: "office", position: { x: 420, y: 380 }, width: 100, height: 80, wing: "east" },
      { id: "office-109", name: "Office 109", floor: 1, type: "office", position: { x: 480, y: 380 }, width: 90, height: 70, wing: "east" },
      
      // West wing offices - irregular shapes
      { id: "office-104", name: "Office 104", floor: 1, type: "office", position: { x: 0, y: 180 }, width: 100, height: 80, wing: "west" },
      { id: "office-105", name: "Office 105", floor: 1, type: "office", position: { x: 0, y: 280 }, width: 100, height: 80, wing: "west" },
      { id: "office-106", name: "Office 106", floor: 1, type: "office", position: { x: 80, y: 380 }, width: 100, height: 80, wing: "west" },
      { id: "office-110", name: "Office 110", floor: 1, type: "office", position: { x: 20, y: 380 }, width: 90, height: 70, wing: "west" },
      
      // North wing offices - various positions
      { id: "office-107", name: "Office 107", floor: 1, type: "office", position: { x: 150, y: 50 }, width: 100, height: 80, wing: "north" },
      { id: "office-108", name: "Office 108", floor: 1, type: "office", position: { x: 350, y: 50 }, width: 100, height: 80, wing: "north" },
      
      // Common areas - irregular shapes
      { id: "break-room-1", name: "Break Room", floor: 1, type: "break", position: { x: 250, y: 400 }, width: 120, height: 100, wing: "central" },
      { id: "print-1", name: "Print Station", floor: 1, type: "print", position: { x: 380, y: 400 }, width: 80, height: 60, wing: "central" },
      { id: "mail-1", name: "Mail Room", floor: 1, type: "mail", position: { x: 120, y: 400 }, width: 80, height: 60, wing: "central" },
    ]
  },
  {
    level: 2,
    name: "First Floor",
    rooms: [
      // Complex corridor system with multiple branches
      { id: "main-corridor-2", name: "Main Corridor", floor: 2, type: "corridor", position: { x: 250, y: 300 }, width: 400, height: 60, wing: "central" },
      { id: "east-corridor-2", name: "East Wing", floor: 2, type: "corridor", position: { x: 420, y: 200 }, width: 60, height: 200, wing: "east" },
      { id: "west-corridor-2", name: "West Wing", floor: 2, type: "corridor", position: { x: 80, y: 200 }, width: 60, height: 200, wing: "west" },
      { id: "north-corridor-2", name: "North Wing", floor: 2, type: "corridor", position: { x: 250, y: 120 }, width: 350, height: 60, wing: "north" },
      { id: "ne-branch-2", name: "NE Branch", floor: 2, type: "corridor", position: { x: 380, y: 170 }, width: 60, height: 100, wing: "north" },
      { id: "nw-branch-2", name: "NW Branch", floor: 2, type: "corridor", position: { x: 120, y: 170 }, width: 60, height: 100, wing: "north" },
      { id: "se-branch-2", name: "SE Branch", floor: 2, type: "corridor", position: { x: 350, y: 350 }, width: 140, height: 60, wing: "east" },
      { id: "sw-branch-2", name: "SW Branch", floor: 2, type: "corridor", position: { x: 150, y: 350 }, width: 140, height: 60, wing: "west" },
      
      // Common facilities with non-standard positions
      { id: "stairs-central-2", name: "Central Stairs", floor: 2, type: "stairs", position: { x: 180, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "elevator-2", name: "Elevator", floor: 2, type: "elevator", position: { x: 320, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "kitchen-2", name: "Kitchen", floor: 2, type: "kitchen", position: { x: 480, y: 120 }, width: 100, height: 80, wing: "north" },
      { id: "restroom-2", name: "Restroom", floor: 2, type: "restroom", position: { x: 100, y: 120 }, width: 60, height: 60, wing: "north" },
      
      // Meeting rooms and special areas - varied shapes
      { id: "meeting-201", name: "Meeting Room 201", floor: 2, type: "meeting", position: { x: 250, y: 200 }, width: 160, height: 100, wing: "central" },
      { id: "meeting-202", name: "Meeting Room 202", floor: 2, type: "meeting", position: { x: 250, y: 400 }, width: 120, height: 80, wing: "central" },
      
      // East wing - complex office layout
      { id: "office-201", name: "Office 201", floor: 2, type: "office", position: { x: 500, y: 160 }, width: 90, height: 70, wing: "east" },
      { id: "office-202", name: "Office 202", floor: 2, type: "office", position: { x: 520, y: 240 }, width: 80, height: 70, wing: "east" },
      { id: "office-203", name: "Office 203", floor: 2, type: "office", position: { x: 500, y: 320 }, width: 90, height: 80, wing: "east" },
      { id: "office-207", name: "Office 207", floor: 2, type: "office", position: { x: 420, y: 400 }, width: 100, height: 80, wing: "east" },
      { id: "office-209", name: "Office 209", floor: 2, type: "office", position: { x: 490, y: 400 }, width: 90, height: 70, wing: "east" },
      
      // West wing - complex office layout
      { id: "office-204", name: "Office 204", floor: 2, type: "office", position: { x: 0, y: 160 }, width: 90, height: 70, wing: "west" },
      { id: "office-205", name: "Office 205", floor: 2, type: "office", position: { x: -20, y: 240 }, width: 80, height: 70, wing: "west" },
      { id: "office-206", name: "Office 206", floor: 2, type: "office", position: { x: 0, y: 320 }, width: 90, height: 80, wing: "west" },
      { id: "office-208", name: "Office 208", floor: 2, type: "office", position: { x: 80, y: 400 }, width: 100, height: 80, wing: "west" },
      { id: "office-210", name: "Office 210", floor: 2, type: "office", position: { x: 10, y: 400 }, width: 90, height: 70, wing: "west" },
      
      // North wing offices
      { id: "office-211", name: "Office 211", floor: 2, type: "office", position: { x: 180, y: 50 }, width: 90, height: 70, wing: "north" },
      { id: "office-212", name: "Office 212", floor: 2, type: "office", position: { x: 320, y: 50 }, width: 90, height: 70, wing: "north" },
    ]
  },
  {
    level: 3,
    name: "Second Floor",
    rooms: [
      // Complex corridor system with curved sections (represented as multiple segments)
      { id: "main-corridor-3", name: "Main Corridor", floor: 3, type: "corridor", position: { x: 250, y: 300 }, width: 350, height: 60, wing: "central" },
      { id: "east-corridor-3", name: "East Wing", floor: 3, type: "corridor", position: { x: 400, y: 200 }, width: 60, height: 200, wing: "east" },
      { id: "west-corridor-3", name: "West Wing", floor: 3, type: "corridor", position: { x: 100, y: 200 }, width: 60, height: 200, wing: "west" },
      { id: "north-corridor-3", name: "North Wing", floor: 3, type: "corridor", position: { x: 250, y: 120 }, width: 300, height: 60, wing: "north" },
      { id: "ne-corridor-3", name: "NE Corridor", floor: 3, type: "corridor", position: { x: 370, y: 170 }, width: 60, height: 100, wing: "north" },
      { id: "nw-corridor-3", name: "NW Corridor", floor: 3, type: "corridor", position: { x: 130, y: 170 }, width: 60, height: 100, wing: "north" },
      { id: "curved-east-3", name: "East Curve", floor: 3, type: "corridor", position: { x: 450, y: 250 }, width: 80, height: 80, wing: "east" },
      { id: "curved-west-3", name: "West Curve", floor: 3, type: "corridor", position: { x: 50, y: 250 }, width: 80, height: 80, wing: "west" },
      
      // Central facilities
      { id: "stairs-central-3", name: "Central Stairs", floor: 3, type: "stairs", position: { x: 180, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "elevator-3", name: "Elevator", floor: 3, type: "elevator", position: { x: 320, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "kitchen-3", name: "Kitchen", floor: 3, type: "kitchen", position: { x: 450, y: 120 }, width: 100, height: 80, wing: "north" },
      { id: "restroom-3", name: "Restroom", floor: 3, type: "restroom", position: { x: 100, y: 120 }, width: 60, height: 60, wing: "north" },
      
      // Special areas - non-rectangular layouts
      { id: "finance-office", name: "Finance Department", floor: 3, type: "finance", position: { x: 250, y: 200 }, width: 140, height: 100, wing: "central" },
      { id: "storage-3", name: "Storage Room", floor: 3, type: "storage", position: { x: 250, y: 400 }, width: 120, height: 80, wing: "central" },
      
      // East wing offices - varied shapes and positions
      { id: "office-301", name: "Office 301", floor: 3, type: "office", position: { x: 480, y: 180 }, width: 80, height: 80, wing: "east" },
      { id: "office-302", name: "Office 302", floor: 3, type: "office", position: { x: 500, y: 260 }, width: 100, height: 70, wing: "east" },
      { id: "office-303", name: "Office 303", floor: 3, type: "office", position: { x: 480, y: 340 }, width: 90, height: 90, wing: "east" },
      { id: "office-307", name: "Office 307", floor: 3, type: "office", position: { x: 400, y: 400 }, width: 80, height: 90, wing: "east" },
      { id: "office-309", name: "Office 309", floor: 3, type: "office", position: { x: 520, y: 400 }, width: 70, height: 80, wing: "east" },
      
      // West wing offices - varied shapes and positions
      { id: "office-304", name: "Office 304", floor: 3, type: "office", position: { x: 20, y: 180 }, width: 80, height: 80, wing: "west" },
      { id: "office-305", name: "Office 305", floor: 3, type: "office", position: { x: 0, y: 260 }, width: 100, height: 70, wing: "west" },
      { id: "office-306", name: "Office 306", floor: 3, type: "office", position: { x: 20, y: 340 }, width: 90, height: 90, wing: "west" },
      { id: "office-308", name: "Office 308", floor: 3, type: "office", position: { x: 100, y: 400 }, width: 80, height: 90, wing: "west" },
      { id: "office-310", name: "Office 310", floor: 3, type: "office", position: { x: -20, y: 400 }, width: 70, height: 80, wing: "west" },
      
      // North wing offices
      { id: "office-311", name: "Office 311", floor: 3, type: "office", position: { x: 200, y: 50 }, width: 80, height: 70, wing: "north" },
      { id: "office-312", name: "Office 312", floor: 3, type: "office", position: { x: 300, y: 50 }, width: 80, height: 70, wing: "north" },
    ]
  },
  {
    level: 4,
    name: "Third Floor",
    rooms: [
      // Most complex corridor layout with many branches and asymmetrical design
      { id: "main-corridor-4", name: "Main Corridor", floor: 4, type: "corridor", position: { x: 250, y: 300 }, width: 320, height: 60, wing: "central" },
      { id: "east-corridor-4", name: "East Wing", floor: 4, type: "corridor", position: { x: 390, y: 220 }, width: 60, height: 180, wing: "east" },
      { id: "west-corridor-4", name: "West Wing", floor: 4, type: "corridor", position: { x: 110, y: 220 }, width: 60, height: 180, wing: "west" },
      { id: "north-corridor-4", name: "North Wing", floor: 4, type: "corridor", position: { x: 250, y: 120 }, width: 280, height: 60, wing: "north" },
      { id: "north-east-corridor", name: "NE Corridor", floor: 4, type: "corridor", position: { x: 370, y: 180 }, width: 60, height: 120, wing: "north" },
      { id: "north-west-corridor", name: "NW Corridor", floor: 4, type: "corridor", position: { x: 130, y: 180 }, width: 60, height: 120, wing: "north" },
      { id: "se-branch-4", name: "SE Branch", floor: 4, type: "corridor", position: { x: 390, y: 350 }, width: 120, height: 60, wing: "east" },
      { id: "sw-branch-4", name: "SW Branch", floor: 4, type: "corridor", position: { x: 110, y: 350 }, width: 120, height: 60, wing: "west" },
      { id: "ne-branch-4", name: "NE Branch", floor: 4, type: "corridor", position: { x: 390, y: 70 }, width: 60, height: 100, wing: "north" },
      { id: "nw-branch-4", name: "NW Branch", floor: 4, type: "corridor", position: { x: 110, y: 70 }, width: 60, height: 100, wing: "north" },
      
      // Common facilities with asymmetrical positions
      { id: "stairs-central-4", name: "Central Stairs", floor: 4, type: "stairs", position: { x: 180, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "elevator-4", name: "Elevator", floor: 4, type: "elevator", position: { x: 320, y: 120 }, width: 60, height: 60, wing: "north" },
      { id: "kitchen-4", name: "Kitchen", floor: 4, type: "kitchen", position: { x: 430, y: 120 }, width: 80, height: 80, wing: "north" },
      { id: "restroom-4", name: "Restroom", floor: 4, type: "restroom", position: { x: 70, y: 120 }, width: 60, height: 60, wing: "north" },
      
      // Executive areas - asymmetrical layout
      { id: "exec-office", name: "Executive Office", floor: 4, type: "office", position: { x: 250, y: 200 }, width: 140, height: 90, wing: "central" },
      { id: "boardroom", name: "Boardroom", floor: 4, type: "meeting", position: { x: 250, y: 400 }, width: 140, height: 100, wing: "central" },
      
      // East wing offices - complex layout
      { id: "office-401", name: "Office 401", floor: 4, type: "office", position: { x: 450, y: 180 }, width: 90, height: 70, wing: "east" },
      { id: "office-402", name: "Office 402", floor: 4, type: "office", position: { x: 470, y: 260 }, width: 90, height: 80, wing: "east" },
      { id: "office-403", name: "Office 403", floor: 4, type: "office", position: { x: 450, y: 350 }, width: 80, height: 90, wing: "east" },
      { id: "office-407", name: "Office 407", floor: 4, type: "office", position: { x: 390, y: 410 }, width: 70, height: 80, wing: "east" },
      { id: "office-411", name: "Office 411", floor: 4, type: "office", position: { x: 490, y: 410 }, width: 80, height: 70, wing: "east" },
      
      // West wing offices - complex layout
      { id: "office-404", name: "Office 404", floor: 4, type: "office", position: { x: 50, y: 180 }, width: 90, height: 70, wing: "west" },
      { id: "office-405", name: "Office 405", floor: 4, type: "office", position: { x: 30, y: 260 }, width: 90, height: 80, wing: "west" },
      { id: "office-406", name: "Office 406", floor: 4, type: "office", position: { x: 50, y: 350 }, width: 80, height: 90, wing: "west" },
      { id: "office-408", name: "Office 408", floor: 4, type: "office", position: { x: 110, y: 410 }, width: 70, height: 80, wing: "west" },
      { id: "office-412", name: "Office 412", floor: 4, type: "office", position: { x: 10, y: 410 }, width: 80, height: 70, wing: "west" },
      
      // North wing offices - varied layouts
      { id: "office-409", name: "Office 409", floor: 4, type: "office", position: { x: 250, y: 30 }, width: 90, height: 60, wing: "north" },
      { id: "office-410", name: "Office 410", floor: 4, type: "office", position: { x: 170, y: 40 }, width: 80, height: 70, wing: "north" },
      { id: "office-413", name: "Office 413", floor: 4, type: "office", position: { x: 330, y: 40 }, width: 80, height: 70, wing: "north" },
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
