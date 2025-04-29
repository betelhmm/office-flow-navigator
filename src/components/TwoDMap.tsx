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

  const mapWidth = 550;
  const mapHeight = 550; // Adjusted for more square view

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
        strokeDasharray="10,5"
        className="path-animation"
      />
    );
  };

  // Function to render room based on its type
  const renderRoom = (room: Room) => {
    // Define colors based on room type
    let fillColor = "#f7f7f7";
    let strokeColor = "#999999";
    
    switch (room.type) {
      case 'office':
        fillColor = "#F1F0FB";
        strokeColor = "#7E69AB";
        break;
      case 'meeting':
        fillColor = "#E9E5F8";
        strokeColor = "#6E59A5";
        break;
      case 'stairs':
        fillColor = "#FEF3C7";
        strokeColor = "#D97706";
        break;
      case 'elevator':
        fillColor = "#FEF3C7";
        strokeColor = "#D97706";
        break;
      case 'restroom':
        fillColor = "#DBEAFE";
        strokeColor = "#0EA5E9";
        break;
      case 'kitchen':
        fillColor = "#E5FAF5";
        strokeColor = "#10B981";
        break;
      case 'reception':
        fillColor = "#FAE8FF";
        strokeColor = "#D946EF";
        break;
      case 'break':
        fillColor = "#F9FAFB";
        strokeColor = "#4B5563";
        break;
      case 'corridor':
        fillColor = "#F9FAFB";
        strokeColor = "#e2e8f0";
        break;
    }
    
    // Check if room is selected or in path
    const isSelected = selectedRoom?.id === room.id;
    const isInPath = pathRooms?.some(pathRoom => pathRoom.id === room.id);
    
    if (isSelected) {
      strokeColor = "#9b87f5";
    }
    
    if (isInPath) {
      strokeColor = "#F97316";
    }
    
    // Skip rendering corridors if they're not in the path and not selected
    if (room.type === 'corridor' && !isSelected && !isInPath) {
      return (
        <rect
          x={room.position.x - room.width / 2}
          y={room.position.y - room.height / 2}
          width={room.width}
          height={room.height}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={1}
          strokeDasharray="4,4"
          opacity={0.5}
          onClick={() => onRoomClick && onRoomClick(room.id)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
    
    // For regular rooms
    const RoomIcon = iconByType[room.type];
    
    return (
      <g 
        key={room.id}
        onClick={() => onRoomClick && onRoomClick(room.id)}
        style={{ cursor: 'pointer' }}
        className={isSelected ? 'animate-pulse' : ''}
      >
        {/* Room shape */}
        <rect
          x={room.position.x - room.width / 2}
          y={room.position.y - room.height / 2}
          width={room.width}
          height={room.height}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={isSelected || isInPath ? 3 : 2}
          rx="2"
          ry="2"
          opacity={isSelected ? 1 : 0.9}
        />
        
        {/* Room Icon */}
        {room.type !== 'corridor' && RoomIcon && (
          <foreignObject 
            x={room.position.x - 12} 
            y={room.position.y - 38} 
            width={24} 
            height={24}
            style={{ overflow: 'visible' }}
          >
            <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm">
              <RoomIcon size={16} className="text-gray-700" />
            </div>
          </foreignObject>
        )}
        
        {/* Room label - only for non-corridors or selected/path corridors */}
        {(room.type !== 'corridor' || isSelected || isInPath) && (
          <text
            x={room.position.x}
            y={room.position.y + 5}
            textAnchor="middle"
            fill="#333"
            fontSize={room.type === 'corridor' ? "9" : "11"}
            fontWeight={isSelected ? "bold" : "normal"}
          >
            {room.name}
          </text>
        )}
        
        {/* Door indicators for rooms */}
        {room.type !== 'stairs' && 
         room.type !== 'elevator' && 
         room.type !== 'corridor' && (
          <path
            d={`M ${room.position.x - room.width/4} ${room.position.y + room.height/2} 
                A ${room.width/8} ${room.height/8} 0 0 1 
                ${room.position.x - room.width/4 + room.width/8} ${room.position.y + room.height/2}`}
            fill="none"
            stroke="#999"
            strokeWidth="1"
          />
        )}
      </g>
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
        {/* Building outline */}
        <rect
          x="10"
          y="10"
          width={mapWidth - 20}
          height={mapHeight - 20}
          fill="none"
          stroke="#333"
          strokeWidth="3"
          rx="2"
          ry="2"
        />
        
        {/* Subtle grid for reference */}
        <g opacity="0.05">
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 50}
              x2={mapWidth}
              y2={i * 50}
              stroke="#666"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2={mapHeight}
              stroke="#666"
              strokeWidth="1"
            />
          ))}
        </g>
        
        {/* Draw corridors first (lowest layer) */}
        {rooms
          .filter(room => room.type === 'corridor')
          .map(room => (
            <React.Fragment key={room.id}>
              {renderRoom(room)}
            </React.Fragment>
          ))}
        
        {/* Draw path */}
        {renderPath()}
        
        {/* Draw other rooms (higher layer) */}
        {rooms
          .filter(room => room.type !== 'corridor')
          .map(room => (
            <React.Fragment key={room.id}>
              {renderRoom(room)}
            </React.Fragment>
          ))}
      </svg>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={() => setScale(prev => Math.min(prev + 0.2, 3))}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
          aria-label="Zoom out"
        >
          -
        </button>
        <button
          onClick={() => {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
          }}
          className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
          aria-label="Reset view"
        >
          ↺
        </button>
      </div>
    </div>
  );
};

export default TwoDMap;
