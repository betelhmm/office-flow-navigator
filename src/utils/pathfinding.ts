
import { Room } from "../data/buildingData";

// Simple graph representation for pathfinding
interface Graph {
  [key: string]: { [key: string]: number };
}

// A simple representation of our building's connectivity
export const buildGraph = (rooms: Room[]): Graph => {
  const graph: Graph = {};
  
  // Initialize all rooms in graph
  rooms.forEach(room => {
    graph[room.id] = {};
  });
  
  // For simplicity, we're creating connections based on proximity
  // In a real app, you would have a more accurate representation
  rooms.forEach(room => {
    rooms.forEach(otherRoom => {
      if (room.id !== otherRoom.id) {
        // Connect rooms on same floor
        if (room.floor === otherRoom.floor) {
          // Simple distance calculation
          const distance = Math.sqrt(
            Math.pow(room.position.x - otherRoom.position.x, 2) +
            Math.pow(room.position.y - otherRoom.position.y, 2)
          );
          
          // Only connect if they're reasonably close (arbitrary threshold)
          if (distance < 150) {
            graph[room.id][otherRoom.id] = distance;
          }
        }
        
        // Connect via stairs and elevators
        if (
          (room.type === 'stairs' && otherRoom.type === 'stairs' &&
           Math.abs(room.floor - otherRoom.floor) === 1) ||
          (room.type === 'elevator' && otherRoom.type === 'elevator')
        ) {
          // Cost for changing floors
          graph[room.id][otherRoom.id] = 50;
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
