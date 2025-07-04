
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

// Mock data for asset locations
const assetLocations = [
  { id: 1, name: 'Jakarta Office', lat: -6.2088, lng: 106.8456, assets: 145, type: 'office' },
  { id: 2, name: 'Surabaya Branch', lat: -7.2575, lng: 112.7521, assets: 67, type: 'branch' },
  { id: 3, name: 'Bandung Office', lat: -6.9175, lng: 107.6191, assets: 89, type: 'office' },
  { id: 4, name: 'Medan Branch', lat: 3.5952, lng: 98.6722, assets: 32, type: 'branch' },
  { id: 5, name: 'Yogyakarta Office', lat: -7.7956, lng: 110.3695, assets: 54, type: 'office' },
  { id: 6, name: 'Denpasar Branch', lat: -8.6705, lng: 115.2126, assets: 28, type: 'branch' },
  { id: 7, name: 'Makassar Office', lat: -5.1477, lng: 119.4327, assets: 41, type: 'office' },
  { id: 8, name: 'Palembang Branch', lat: -2.9761, lng: 104.7754, assets: 23, type: 'branch' }
];

interface AssetMapProps {
  height?: string;
}

const AssetMap: React.FC<AssetMapProps> = ({ height = '400px' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [118.0148, -2.5489], // Center of Indonesia
        zoom: 4.5,
        minZoom: 3,
        maxZoom: 15
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Wait for map to load before adding markers
      map.current.on('load', () => {
        addAssetMarkers();
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      alert('Invalid Mapbox token. Please check your token and try again.');
    }
  };

  const addAssetMarkers = () => {
    if (!map.current) return;

    assetLocations.forEach(location => {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'asset-marker';
      markerElement.style.cssText = `
        width: ${Math.max(20, location.assets / 5)}px;
        height: ${Math.max(20, location.assets / 5)}px;
        background-color: ${location.type === 'office' ? '#096284' : '#fccc19'};
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
      `;
      markerElement.textContent = location.assets.toString();

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div style="padding: 8px; text-align: center;">
          <h4 style="margin: 0 0 4px 0; font-weight: bold; color: #096284;">${location.name}</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>${location.assets}</strong> Assets
          </p>
          <p style="margin: 4px 0 0 0; color: #999; font-size: 12px; text-transform: capitalize;">
            ${location.type}
          </p>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([location.lng, location.lat])
        .addTo(map.current!);

      // Add hover events
      markerElement.addEventListener('mouseenter', () => {
        popup.setLngLat([location.lng, location.lat]).addTo(map.current!);
        markerElement.style.transform = 'scale(1.1)';
        markerElement.style.transition = 'transform 0.2s ease';
      });

      markerElement.addEventListener('mouseleave', () => {
        popup.remove();
        markerElement.style.transform = 'scale(1)';
      });
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border" style={{ height }}>
        <MapPin className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Setup Asset Distribution Map</h3>
        <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
          To display the interactive map, please enter your Mapbox public token. 
          Get your token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
        </p>
        <form onSubmit={handleTokenSubmit} className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Load Map</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden border shadow-sm" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#096284] rounded-full border border-white"></div>
            <span>Office</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#fccc19] rounded-full border border-white"></div>
            <span>Branch</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMap;
