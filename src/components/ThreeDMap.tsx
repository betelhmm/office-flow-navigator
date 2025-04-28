
import React, { useEffect, useRef } from 'react';
import { 
  Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, 
  MeshStandardMaterial, Mesh, Group, AmbientLight, 
  DirectionalLight, Vector3, LineBasicMaterial, BufferGeometry, 
  Line, LineSegments, EdgesGeometry, Color,
  GridHelper, Shape, ExtrudeGeometry
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Room, floors } from '../data/buildingData';

interface ThreeDMapProps {
  selectedFloor: number;
  selectedRoom?: Room | null;
  pathRooms?: Room[];
}

const ThreeDMap: React.FC<ThreeDMapProps> = ({ 
  selectedFloor, 
  selectedRoom, 
  pathRooms 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const buildingRef = useRef<Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new Scene();
    scene.background = new Color(0xf8f9fa);
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(50, 150, 300);
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    renderer.domElement.classList.add('three-canvas');

    const ambientLight = new AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 100);
    scene.add(directionalLight);

    const building = new Group();
    buildingRef.current = building;
    scene.add(building);

    const grid = new GridHelper(500, 20, 0x888888, 0xcccccc);
    grid.position.y = -0.5;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!buildingRef.current || !sceneRef.current) return;

    while (buildingRef.current.children.length > 0) {
      buildingRef.current.remove(buildingRef.current.children[0]);
    }

    const floorHeight = 50;
    const floorSpacing = 10;
    const cutHeight = 30; // Height where we cut the rooms (150cm scaled)

    floors.forEach((floor) => {
      const floorGroup = new Group();
      
      // Create floor base
      const baseGeometry = new BoxGeometry(500, 2, 500);
      const baseMaterial = new MeshStandardMaterial({ 
        color: floor.level === selectedFloor ? 0xe5deff : 0xeeeeee,
        transparent: true,
        opacity: floor.level === selectedFloor ? 0.9 : 0.3
      });
      const baseMesh = new Mesh(baseGeometry, baseMaterial);
      floorGroup.add(baseMesh);

      // Add rooms with cutaway walls
      floor.rooms.forEach((room) => {
        const roomSize = 20;
        const wallThickness = 1;

        // Create room walls (cutaway style)
        const shape = new Shape();
        shape.moveTo(0, 0);
        shape.lineTo(roomSize, 0);
        shape.lineTo(roomSize, roomSize);
        shape.lineTo(0, roomSize);
        shape.lineTo(0, 0);

        const extrudeSettings = {
          steps: 1,
          depth: cutHeight,
          bevelEnabled: false,
        };

        // Select color based on room type
        let roomColor = 0x9b87f5;
        
        switch (room.type) {
          case 'office':
            roomColor = 0x7E69AB;
            break;
          case 'meeting':
            roomColor = 0x6E59A5;
            break;
          case 'stairs':
            roomColor = 0xF97316;
            break;
          case 'elevator':
            roomColor = 0xF97316;
            break;
          case 'restroom':
            roomColor = 0x0EA5E9;
            break;
          case 'kitchen':
            roomColor = 0xF97316;
            break;
          case 'reception':
            roomColor = 0xD946EF;
            break;
          default:
            roomColor = 0x9b87f5;
        }

        if (selectedRoom && room.id === selectedRoom.id) {
          roomColor = 0xF1F0FB;
        }

        if (pathRooms && pathRooms.some(pathRoom => pathRoom.id === room.id)) {
          roomColor = 0xF97316;
        }

        const wallGeometry = new ExtrudeGeometry(shape, extrudeSettings);
        const wallMaterial = new MeshStandardMaterial({
          color: roomColor,
          transparent: true,
          opacity: floor.level === selectedFloor ? 0.9 : 0.3,
        });

        const wallMesh = new Mesh(wallGeometry, wallMaterial);
        wallMesh.position.set(
          room.position.x - 250,
          0,
          room.position.y - 250
        );
        
        floorGroup.add(wallMesh);

        // Add edges for better visibility
        const edges = new LineSegments(
          new EdgesGeometry(wallGeometry),
          new LineBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: floor.level === selectedFloor ? 0.7 : 0.1,
          })
        );
        edges.position.copy(wallMesh.position);
        floorGroup.add(edges);
      });

      // Position the floor
      const yPosition = (floor.level - 1) * (floorHeight + floorSpacing);
      floorGroup.position.y = yPosition;
      buildingRef.current.add(floorGroup);
    });

    // Add navigation path
    if (pathRooms && pathRooms.length > 1) {
      const points: Vector3[] = [];
      
      pathRooms.forEach((room) => {
        const floorIndex = room.floor - 1;
        const floorY = floorIndex * (floorHeight + floorSpacing) + cutHeight/2;
        points.push(new Vector3(
          room.position.x - 250 + 10,
          floorY,
          room.position.y - 250 + 10
        ));
      });

      const pathMaterial = new LineBasicMaterial({
        color: 0xF97316,
        linewidth: 3
      });
      const pathGeometry = new BufferGeometry().setFromPoints(points);
      const pathLine = new Line(pathGeometry, pathMaterial);
      buildingRef.current.add(pathLine);
    }

    // Update camera position
    if (cameraRef.current && controlsRef.current) {
      const targetY = (selectedFloor - 1) * (floorHeight + floorSpacing);
      controlsRef.current.target.set(0, targetY, 0);
      controlsRef.current.update();
    }
  }, [selectedFloor, selectedRoom, pathRooms]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeDMap;
