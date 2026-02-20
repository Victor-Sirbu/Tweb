import "./DoctorRightPanel.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const DoctorRightPanel = () => {
    const clinicPosition: [number, number] = [24.7136, 46.6753];

    return (
        <div className="right-panel">
            {/* Appointment Card */}
            <div className="appointment-card">
                <div className="rating-section">
                    <div className="rating-item">
                        <span className="rating-icon">⭐</span>
                        <span className="rating-text">3.5 Rating</span>
                    </div>
                    <div className="rating-item">
                        <span className="rating-icon">❤️</span>
                        <span className="rating-text">212 persoane au apreciat</span>
                    </div>
                </div>

                <div className="appointment-buttons">
                    <button className="btn-primary">Programează o consultație</button>
                    <button className="btn-secondary">Consultă instant</button>
                </div>
            </div>

            {/* Clinic Section Card */}
            <div className="clinic-card">
                <h3 className="clinic-title">Clinică / Spital</h3>
                
                <div className="clinic-info">
                    <p className="clinic-address">Apollo Hospital, Sector 32, Riyadh</p>
                    <p className="clinic-distance">2.5 km distanță</p>
                </div>

                <div className="map-container">
                    <MapContainer
                        center={clinicPosition}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: "220px", borderRadius: "16px" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={clinicPosition}>
                            <Popup>Apollo Hospital</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default DoctorRightPanel;
