
import React from 'react';
import { Room, iconByType } from '../data/buildingData';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RoomDetailsProps {
  room: Room;
  onClose: () => void;
  onRouteRequest: (startRoom: Room, endRoom: Room) => void;
  currentLocation: Room;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({
  room,
  onClose,
  onRouteRequest,
  currentLocation
}) => {
  const RoomIcon = iconByType[room.type];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-nav-100 flex items-center justify-center text-nav-500 mr-3">
            {RoomIcon && <RoomIcon size={20} />}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p className="text-gray-500">
              {room.floor === 1 ? "Ground Floor" : 
               room.floor === 2 ? "First Floor" : 
               room.floor === 3 ? "Second Floor" : 
               "Third Floor"}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <div className="mb-4">
        <div className="flex items-center text-gray-700 mb-2">
          <span className="font-medium mr-2">Type:</span>
          <span className="capitalize">{room.type}</span>
        </div>

        {room.description && (
          <div className="text-gray-700 mb-2">
            <span className="font-medium">Description:</span>
            <p>{room.description}</p>
          </div>
        )}

        {room.isAccessible && (
          <div className="inline-flex items-center mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            Wheelchair Accessible
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Button 
          className="flex-1 bg-nav-400 hover:bg-nav-500"
          onClick={() => onRouteRequest(currentLocation, room)}
        >
          Navigate Here
        </Button>
      </div>
    </div>
  );
};

export default RoomDetails;
