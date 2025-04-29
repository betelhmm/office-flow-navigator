
import { Room } from "../data/buildingData";

// Simple graph representation for pathfinding
interface Graph {
  [key: string]: { [key: string]: number };
}

// Updated buildGraph function to handle the new floor plan design
export const buildGraph = (rooms: Room[]): Graph => {
  const graph: Graph = {};
  
  // Initialize all rooms in graph
  rooms.forEach(room => {
    graph[room.id] = {};
  });
  
  // For each room, connect to nearby rooms on the same floor
  rooms.forEach(room => {
    rooms.forEach(otherRoom => {
      if (room.id !== otherRoom.id) {
        // Connect rooms on same floor based on proximity
        if (room.floor === otherRoom.floor) {
          // Calculate distance between room centers
          const distance = Math.sqrt(
            Math.pow(room.position.x - otherRoom.position.x, 2) +
            Math.pow(room.position.y - otherRoom.position.y, 2)
          );
          
          // Connect if they're reasonably close
          if (distance < 200) {
            graph[room.id][otherRoom.id] = distance;
          }
        }
        
        // Connect stairs and elevators between floors
        if (
          (room.type === 'stairs' && otherRoom.type === 'stairs' &&
           Math.abs(room.floor - otherRoom.floor) === 1) ||
          (room.type === 'elevator' && otherRoom.type === 'elevator')
        ) {
          // Cost for changing floors - higher for stairs than elevator
          const floorDifference = Math.abs(room.floor - otherRoom.floor);
          const costMultiplier = room.type === 'stairs' ? 100 : 50;
          graph[room.id][otherRoom.id] = floorDifference * costMultiplier;
        }
      }
    });
  });
  
  return graph;
};

// Simple Dijkstra's algorithm for finding shortest path
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
