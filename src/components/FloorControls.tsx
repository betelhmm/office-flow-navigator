
import React from 'react';
import { Button } from '@/components/ui/button';
import { Floor } from '../data/buildingData';
import { Stairs, Elevator } from 'lucide-react';

interface FloorControlsProps {
  floors: Floor[];
  selectedFloor: number;
  onFloorChange: (floorLevel: number) => void;
}

const FloorControls: React.FC<FloorControlsProps> = ({
  floors,
  selectedFloor,
  onFloorChange
}) => {
  return (
    <div className="flex flex-col items-center space-y-2 p-2 bg-white rounded-lg shadow-lg">
      <div className="w-full p-2 text-center border-b">
        <h3 className="font-medium">Floors</h3>
      </div>
      
      <div className="flex flex-col space-y-2 items-center">
        {[...floors].reverse().map((floor) => (
          <Button
            key={floor.level}
            variant={selectedFloor === floor.level ? "default" : "outline"}
            className={`w-16 ${
              selectedFloor === floor.level 
                ? "bg-nav-400 hover:bg-nav-500" 
                : "hover:bg-nav-100"
            }`}
            onClick={() => onFloorChange(floor.level)}
          >
            {floor.level}
          </Button>
        ))}
      </div>
      
      <div className="border-t w-full pt-2 flex justify-center gap-2">
        <Button variant="outline" size="icon" title="Stairs">
          <Stairs size={18} />
        </Button>
        <Button variant="outline" size="icon" title="Elevator">
          <Elevator size={18} />
        </Button>
      </div>
    </div>
  );
};

export default FloorControls;
