import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { User, Location } from '../models';

type MapProps = { pins?: User[]; pin?: Location };

const Map = ({ pins, pin }: MapProps) => {
  return (
    <MapContainer
      center={pin ? [pin.lat, pin.lng] : [48.68, 21.76]}
      zoom={pin ? 9 : 6}
      scrollWheelZoom={false}
      style={{
        height: 400,
        width: '100%',
        zIndex: '0',
        borderRadius: '0rem 0rem 0.5rem 0.5rem',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pin && (
        <Marker position={[pin.lat, pin.lng]}>
          <Popup>
            {pin.city} {pin.country}
          </Popup>
        </Marker>
      )}
      {pins &&
        pins.map(
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
