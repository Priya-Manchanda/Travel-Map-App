import * as React from "react";
import { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { format } from "timeago.js";
import "./App.css";
function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    // setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/api/pin/");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 4,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoieWFzaDU1NSIsImEiOiJjbDdsdW1mam0wOGkzM3dwOWE5MHdtdTA5In0.hdnvnbP9qJ84-aPa9xcrWw"
      >
        {pins.map((p) => {
          <>
            <Marker
              position="absolute"
              longitude={p.lat}
              latitude={p.long}
              offsetTop={-10}
              offsetLeft={-20}
              anchor="center"
            >
              <i
                class="fa-solid fa-location-pin"
                style={{ fontSize: "35px ", color: "brown" }}
                onClick={() => handleMarkerClick(p._id)}
              ></i>
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.lat}
                latitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="right"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>{p.title}</label>
                  <h4>x</h4>
                  <label>Review</label>
                  <p>{p.desc}</p>
                  <label>Rating</label>
                  <div>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Create by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>;
        })}
      </Map>
    </div>
  );
}
export default App;
