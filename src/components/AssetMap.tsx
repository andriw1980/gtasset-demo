
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

// Custom marker component
const CustomMarker: React.FC<{ location: typeof assetLocations[0] }> = ({ location }) => {
  const markerSize = Math.max(20, location.assets / 5);
  const markerColor = location.type === 'office' ? '#096284' : '#fccc19';
  
  const customIcon = divIcon({
    html: `
      <div style="
        width: ${markerSize}px;
        height: ${markerSize}px;
        background-color: ${markerColor};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      ">
        ${location.assets}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [markerSize, markerSize],
    iconAnchor: [markerSize / 2, markerSize / 2]
  });

  return (
    <Marker position={[location.lat, location.lng]} icon={customIcon}>
      <Popup>
        <div style={{ padding: '8px', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#096284' }}>
            {location.name}
          </h4>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            <strong>{location.assets}</strong> Assets
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#999', fontSize: '12px', textTransform: 'capitalize' }}>
            {location.type}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

const AssetMap: React.FC<AssetMapProps> = ({ height = '400px' }) => {
  return (
    <div className="relative rounded-lg overflow-hidden border shadow-sm" style={{ height }}>
      <MapContainer
        center={[-2.5489, 118.0148]} // Center of Indonesia
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        minZoom={3}
        maxZoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {assetLocations.map(location => (
          <CustomMarker key={location.id} location={location} />
        ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm z-[1000]">
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
