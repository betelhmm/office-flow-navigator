
import { Room } from "../data/buildingData";

// Simple graph representation for pathfinding
interface Graph {
  [key: string]: { [key: string]: number };
}

// Updated buildGraph function to prioritize corridors for pathfinding
export const buildGraph = (rooms: Room[]): Graph => {
  const graph: Graph = {};
  
  // Initialize all rooms in graph
  rooms.forEach(room => {
    graph[room.id] = {};
  });

  // Get all corridors for easy access
  const corridors = rooms.filter(room => room.type === 'corridor');
  const stairsAndElevators = rooms.filter(room => room.type === 'stairs' || room.type === 'elevator');
  
  // Connect rooms to nearest corridors on the same floor
  rooms.forEach(room => {
    // Skip corridors, they will be connected differently
    if (room.type === 'corridor') return;
    
    // Find nearest corridor on the same floor
    const sameFloorCorridors = corridors.filter(c => c.floor === room.floor);
    sameFloorCorridors.forEach(corridor => {
      // Calculate distance between room and corridor
      const distance = Math.sqrt(
        Math.pow(room.position.x - corridor.position.x, 2) +
        Math.pow(room.position.y - corridor.position.y, 2)
      );
      
      // Connect if they're reasonably close, but check if they overlap
      const roomLeft = room.position.x - room.width / 2;
      const roomRight = room.position.x + room.width / 2;
      const roomTop = room.position.y - room.height / 2;
      const roomBottom = room.position.y + room.height / 2;
      
      const corridorLeft = corridor.position.x - corridor.width / 2;
      const corridorRight = corridor.position.x + corridor.width / 2;
      const corridorTop = corridor.position.y - corridor.height / 2;
      const corridorBottom = corridor.position.y + corridor.height / 2;
      
      // Check if room and corridor overlap or are adjacent
      const overlapsHorizontally = 
        (roomLeft <= corridorRight && roomRight >= corridorLeft);
      const overlapsVertically = 
        (roomTop <= corridorBottom && roomBottom >= corridorTop);
      
      // Connect if they overlap in at least one dimension and are close enough
      if ((overlapsHorizontally || overlapsVertically) && distance < 150) {
        // Make the connection bidirectional with lower cost for corridors
        graph[room.id][corridor.id] = distance;
        graph[corridor.id][room.id] = distance; 
      }
    });
  });
  
  // Connect corridors to each other
  corridors.forEach(corridor => {
    corridors.forEach(otherCorridor => {
      if (corridor.id !== otherCorridor.id && corridor.floor === otherCorridor.floor) {
        // Check if corridors are connected (they intersect or are adjacent)
        const distance = Math.sqrt(
          Math.pow(corridor.position.x - otherCorridor.position.x, 2) +
          Math.pow(corridor.position.y - otherCorridor.position.y, 2)
        );
        
        // Connect if distance is reasonable - this is critical for corridor-to-corridor paths
        if (distance < 180) {  // Increased distance threshold for better corridor connections
          // Corridors should have MUCH lower transit cost to ensure paths prefer corridors
          graph[corridor.id][otherCorridor.id] = distance * 0.3;  // Reduced cost factor to prioritize corridors
          graph[otherCorridor.id][corridor.id] = distance * 0.3;
        }
      }
    });
  });
  
  // Connect stairs and elevators between floors
  stairsAndElevators.forEach(transit => {
    stairsAndElevators.forEach(otherTransit => {
      if (transit.id !== otherTransit.id) {
        // Connect stairs to stairs and elevators to elevators between floors
        if (
          (transit.type === 'stairs' && otherTransit.type === 'stairs' &&
          Math.abs(transit.floor - otherTransit.floor) === 1) ||
          (transit.type === 'elevator' && otherTransit.type === 'elevator')
        ) {
          // Cost for changing floors - higher for stairs than elevator
          const floorDifference = Math.abs(transit.floor - otherTransit.floor);
          const costMultiplier = transit.type === 'stairs' ? 100 : 50;
          graph[transit.id][otherTransit.id] = floorDifference * costMultiplier;
        }
      }
    });
  });
  
  return graph;
};

// Enhanced Dijkstra's algorithm with corridor preference
export const findShortestPath = (
  graph: Graph, 
  startRoom: string, 
  endRoom: string
): string[] => {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const nodes: string[] = Object.keys(graph);
  const visited: Set<string> = new Set();
  
  // Initialize distances
  nodes.forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[startRoom] = 0;
  
  // Find path
  while (nodes.length > 0) {
    // Get node with shortest distance
    nodes.sort((a, b) => distances[a] - distances[b]);
    const current = nodes.shift();
    
    if (!current) break;
    if (current === endRoom) break;
    if (distances[current] === Infinity) break;
    
    visited.add(current);
    
    // Check neighbors
    Object.keys(graph[current]).forEach(neighbor => {
      if (visited.has(neighbor)) return;
      
      const distance = distances[current] + graph[current][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;
      }
    });
  }
  
  // Reconstruct path
  const path: string[] = [];
  let current = endRoom;
  
  while (current && previous[current]) {
    path.unshift(current);
    current = previous[current];
  }
  
  if (path.length > 0) {
    path.unshift(startRoom);
  }
  
  return path;
};
