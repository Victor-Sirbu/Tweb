import "./DoctorRightPanel.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const DoctorRightPanel = () => {
    const clinicPosition: [number, number] = [47.0262, 28.8406];

    return (
        <div className="right-panel">
            {/* Appointment Card */}
            <div className="appointment-card">
                <div className="appointment-buttons">
                    <button className="btn-primary">Programează o consultație</button>
                    <button className="btn-secondary">Consultă instant</button>
                </div>
            </div>

            {/* Clinic Section Card */}
            <div className="clinic-card">
                <h3 className="clinic-title">Clinică / Spital</h3>

                <div className="clinic-info">
                    <p className="clinic-address">Bd. Ștefan cel Mare nr. 123, Chișinău</p>
                </div>

                <div className="map-container">
                    <MapContainer
                        center={clinicPosition}
                        zoom={15}
                        scrollWheelZoom={false}
                        style={{ height: "220px", borderRadius: "16px" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={clinicPosition}>
                            <Popup>
                                Bd. Ștefan cel Mare nr. 123<br />
                                Chișinău, Moldova
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default DoctorRightPanel;
