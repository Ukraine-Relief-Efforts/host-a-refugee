import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Host } from '../models';

type MapProps = { pins: Host[] };

const Map = ({ pins }: MapProps) => {
  return (
    <MapContainer
      center={[48.68, 21.76]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: 400, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map(
        (pin) =>
          pin.fields.lat && (
            <Marker key={pin.id} position={[pin.fields.lat, pin.fields.lng]}>
              <Popup>Name: {pin.fields.name}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default Map;
