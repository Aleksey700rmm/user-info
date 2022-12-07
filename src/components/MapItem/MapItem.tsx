import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapItem.sass";
import { Located } from "../App/App";
import { Icon } from "leaflet";

interface MapItemProps {
    located: Located | null;
}

const MapItem = (props: MapItemProps) => {
    const latitude = props.located?.latitude ?? 59.9;
    const longitude = props.located?.longitude ?? 31.4;

    return (
        <div>
            {props.located?.latitude ? (
                <MapContainer center={[latitude, longitude]} zoom={9} scrollWheelZoom={false} style={{ width: "600px", height: "400px" }}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[latitude, longitude]} icon={new Icon({ iconUrl: "https://www.shareicon.net/data/512x512/2016/10/18/845321_pin_512x512.png" })}>
                        <Popup>You are here</Popup>
                    </Marker>
                </MapContainer>
            ) : (
                "loading"
            )}
        </div>
    );
};

export default MapItem;
