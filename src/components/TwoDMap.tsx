
import React, { useRef, useEffect, useState } from 'react';
import { Room, iconByType } from '../data/buildingData';

interface TwoDMapProps {
  rooms: Room[];
  selectedRoom?: Room | null;
  pathRooms?: Room[];
  onRoomClick?: (roomId: string) => void;
}

const TwoDMap: React.FC<TwoDMapProps> = ({ 
  rooms, 
  selectedRoom, 
  pathRooms, 
  onRoomClick 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mapWidth = 500;
  const mapHeight = 500;
  const roomSize = 40;

  // Handle zoom
  const handleZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.5, scale + delta), 3);
    setScale(newScale);
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - translate.x, 
      y: e.clientY - translate.y 
    });
  };

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTranslate({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - translate.x,
        y: e.touches[0].clientY - translate.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setTranslate({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Draw path
  const renderPath = () => {
    if (!pathRooms || pathRooms.length < 2) return null;
    
    const points = pathRooms.map(room => 
      `${room.position.x},${room.position.y}`
    ).join(' ');
    
    return (
      <polyline
        points={points}
        fill="none"
        stroke="#F97316"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="path-animation animate-flow-path"
      />
    );
  };

  return (
    <div 
      className="w-full h-full overflow-hidden bg-gray-50 relative"
      onWheel={handleZoom}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {/* Grid */}
        <g>
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 50}
              x2={mapWidth}
              y2={i * 50}
              stroke="#ddd"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2={mapHeight}
              stroke="#ddd"
              strokeWidth="1"
            />
          ))}
        </g>
        
        {/* Path */}
        {renderPath()}
        
        {/* Rooms */}
        {rooms.map(room => {
          const isSelected = selectedRoom?.id === room.id;
          const isInPath = pathRooms?.some(pathRoom => pathRoom.id === room.id);
          
          let fillColor = "#9b87f5";
          let strokeColor = "#7E69AB";
          
          switch (room.type) {
            case 'office':
              fillColor = "#7E69AB";
              break;
            case 'meeting':
              fillColor = "#6E59A5";
              break;
            case 'stairs':
              fillColor = "#F97316";
              break;
            case 'elevator':
              fillColor = "#F97316";
              break;
            case 'restroom':
              fillColor = "#0EA5E9";
              break;
            case 'kitchen':
              fillColor = "#F97316";
              break;
            case 'reception':
              fillColor = "#D946EF";
              break;
          }
          
          if (isSelected) {
            fillColor = "#F1F0FB";
            strokeColor = "#9b87f5";
          }
          
          if (isInPath) {
            strokeColor = "#F97316";
            strokeColor = "#F97316";
          }
          
          return (
            <g 
              key={room.id}
              onClick={() => onRoomClick && onRoomClick(room.id)}
              style={{ cursor: 'pointer' }}
              className={isSelected ? 'animate-pulse-location' : ''}
            >
              <rect
                x={room.position.x - roomSize / 2}
                y={room.position.y - roomSize / 2}
                width={roomSize}
                height={roomSize}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth="2"
                rx="4"
                ry="4"
                opacity={isSelected || isInPath ? 1 : 0.7}
              />
              
              <text
                x={room.position.x}
                y={room.position.y + roomSize / 2 + 15}
                textAnchor="middle"
                fill="#333"
                fontSize="10"
              >
                {room.name}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={() => setScale(prev => Math.min(prev + 0.2, 3))}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
        >
          -
        </button>
        <button
          onClick={() => {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
          }}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
        >
          ↺
        </button>
      </div>
    </div>
  );
};

export default TwoDMap;
