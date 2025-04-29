
import React, { useState } from 'react';
import { Room, RoomType, iconByType, searchRooms } from '../data/buildingData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X } from 'lucide-react';

interface DirectoryPanelProps {
  onRoomSelect: (room: Room) => void;
  onRouteRequest: (startRoom: Room, endRoom: Room) => void;
  currentLocation: Room;
}

const roomTypeLabels: Record<RoomType, string> = {
  office: 'Offices',
  meeting: 'Meeting Rooms',
  stairs: 'Stairs',
  elevator: 'Elevators',
  restroom: 'Restrooms',
  kitchen: 'Kitchens',
  reception: 'Reception',
  storage: 'Storage',
  print: 'Print Stations',
  mail: 'Mail Room',
  finance: 'Finance',
  break: 'Break Rooms',
  general: 'General Areas'
};

const DirectoryPanel: React.FC<DirectoryPanelProps> = ({ 
  onRoomSelect, 
  onRouteRequest, 
  currentLocation 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Room[]>([]);
  const [activeTab, setActiveTab] = useState('search');
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchRooms(searchQuery);
      setSearchResults(results);
      setActiveTab('results');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setActiveTab('search');
  };

  const roomTypeGroups = Object.entries(roomTypeLabels).map(([type, label]) => ({
    type: type as RoomType,
    label
  }));

  const handleRoomTypeSelect = (type: RoomType) => {
    setSelectedRoomType(type);
    setActiveTab('type-results');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold text-nav-700">Directory</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="browse">Browse</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="search" className="flex-1 flex flex-col p-4 pt-0">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search rooms, people..."
              className="pr-8"
            />
            {searchQuery && (
              <button 
                className="absolute right-8 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={clearSearch}
              >
                <X size={16} />
              </button>
            )}
            <Button
              variant="ghost" 
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={handleSearch}
            >
              <Search size={18} />
            </Button>
          </div>
          
          <div className="mt-6 text-center text-gray-500">
            <p>Enter a room name, number, or person to find</p>
          </div>
          
          <div className="mt-auto p-4 border-t">
            <h3 className="font-medium mb-2">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleRoomTypeSelect('restroom')}
              >
                <div className="mr-2 text-nav-400">
                  {React.createElement(iconByType.restroom, { size: 16 })}
                </div>
                Restrooms
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleRoomTypeSelect('elevator')}
              >
                <div className="mr-2 text-nav-400">
                  {React.createElement(iconByType.elevator, { size: 16 })}
                </div>
                Elevators
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="browse" className="flex-1 overflow-hidden p-4 pt-0">
          <ScrollArea className="h-full pr-4">
            <div className="grid grid-cols-1 gap-2">
              {roomTypeGroups.map(group => (
                <Button
                  key={group.type}
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => handleRoomTypeSelect(group.type)}
                >
                  <div className="mr-2 text-nav-400">
                    {iconByType[group.type] && React.createElement(iconByType[group.type], { size: 16 })}
                  </div>
                  <span>{group.label}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="results" className="flex-1 overflow-hidden p-4 pt-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Search Results</h3>
            <Button variant="ghost" size="sm" onClick={clearSearch}>
              <X size={16} className="mr-1" /> Clear
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100%-40px)] pr-4">
            {searchResults.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {searchResults.map(room => (
                  <div 
                    key={room.id} 
                    className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onRoomSelect(room)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{room.name}</h4>
                        <p className="text-sm text-gray-500">Floor {room.floor}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRouteRequest(currentLocation, room);
                        }}
                      >
                        Route
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="type-results" className="flex-1 overflow-hidden p-4 pt-0">
          {selectedRoomType && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">{roomTypeLabels[selectedRoomType]}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab('browse')}
                >
                  Back
                </Button>
              </div>
              
              <ScrollArea className="h-[calc(100%-40px)] pr-4">
                <div className="grid grid-cols-1 gap-2">
                  {searchRooms(roomTypeLabels[selectedRoomType]).map(room => (
                    <div 
                      key={room.id} 
                      className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => onRoomSelect(room)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{room.name}</h4>
                          <p className="text-sm text-gray-500">Floor {room.floor}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRouteRequest(currentLocation, room);
                          }}
                        >
                          Route
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DirectoryPanel;
