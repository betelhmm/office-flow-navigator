
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TwoDMap from './TwoDMap';
import DirectoryPanel from './DirectoryPanel';
import FloorControls from './FloorControls';
import RoomDetails from './RoomDetails';
import { Room, floors, getRoom, getRoomsByFloor } from '../data/buildingData';
import { buildGraph, findShortestPath } from '../utils/pathfinding';
import { Compass, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NavigationInterface: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  // Initialize to reception on ground floor
  const [currentLocation, setCurrentLocation] = useState<Room>(() => {
    return floors[0].rooms.find(room => room.id === "reception-1") || floors[0].rooms[0];
  });
  const [pathRooms, setPathRooms] = useState<Room[]>([]);
  const [showDirectoryPanel, setShowDirectoryPanel] = useState(true);
  const { toast } = useToast();

  // Handle room selection
  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setSelectedFloor(room.floor);
  };

  // Handle room click on 2D map
  const handleRoomClick = (roomId: string) => {
    const room = getRoom(roomId);
    if (room) {
      handleRoomSelect(room);
    }
  };

  // Handle floor change
  const handleFloorChange = (floorLevel: number) => {
    setSelectedFloor(floorLevel);
  };

  // Handle route request
  const handleRouteRequest = (startRoom: Room, endRoom: Room) => {
    // Don't calculate route if start and end are the same
    if (startRoom.id === endRoom.id) {
      toast({
        title: "Same location",
        description: "Start and end locations are the same.",
      });
      return;
    }
    
    // Build graph from all rooms
    const allRooms = floors.flatMap(floor => floor.rooms);
    const graph = buildGraph(allRooms);
    
    // Find path
    const path = findShortestPath(graph, startRoom.id, endRoom.id);
    
    if (path.length < 2) {
      toast({
        title: "Route not found",
        description: "Could not find a path between these locations.",
        variant: "destructive"
      });
      return;
    }
    
    // Convert path IDs to rooms
    const routeRooms = path.map(id => {
      const room = getRoom(id);
      if (!room) {
        throw new Error(`Room with ID ${id} not found`);
      }
      return room;
    });

    setPathRooms(routeRooms);
    setSelectedFloor(endRoom.floor);
    setSelectedRoom(endRoom);
    
    toast({
      title: "Route Calculated",
      description: `Route from ${startRoom.name} to ${endRoom.name}`,
    });
  };

  // Clear the currently selected route
  const clearRoute = () => {
    setPathRooms([]);
  };

  // Reset view
  const resetView = () => {
    setSelectedRoom(null);
    clearRoute();
  };

  // Toggle directory panel
  const toggleDirectoryPanel = () => {
    setShowDirectoryPanel(prev => !prev);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Main Content */}
      <div className="relative flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 px-4 flex justify-between items-center bg-white shadow-sm z-10">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="mr-2"
              onClick={toggleDirectoryPanel}
            >
              {showDirectoryPanel ? <X size={18} /> : <Compass size={18} />}
            </Button>
            <h1 className="text-xl font-bold text-nav-700">Office Navigator</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {pathRooms.length > 0 && (
              <Button variant="outline" onClick={clearRoute}>
                Clear Route
              </Button>
            )}
            <Button variant="outline" onClick={resetView}>
              Reset View
            </Button>
          </div>
        </div>
        
        {/* Map Container */}
        <div className="flex-1 relative map-container">
          <TwoDMap 
            rooms={getRoomsByFloor(selectedFloor)}
            selectedRoom={selectedRoom}
            pathRooms={pathRooms?.filter(room => room.floor === selectedFloor)}
            onRoomClick={handleRoomClick}
          />
          
          {/* Floor Controls */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FloorControls 
              floors={floors}
              selectedFloor={selectedFloor}
              onFloorChange={handleFloorChange}
            />
          </div>
          
          {/* Room Details Popup */}
          {selectedRoom && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <RoomDetails 
                room={selectedRoom}
                onClose={() => setSelectedRoom(null)}
                onRouteRequest={handleRouteRequest}
                currentLocation={currentLocation}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Directory Panel */}
      <div 
        className={`${
          showDirectoryPanel ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 absolute md:relative right-0 top-0 h-full w-full md:w-80 z-20`}
      >
        <DirectoryPanel 
          onRoomSelect={handleRoomSelect}
          onRouteRequest={handleRouteRequest}
          currentLocation={currentLocation}
        />
      </div>
    </div>
  );
};

export default NavigationInterface;
