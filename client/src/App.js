import * as React from "react";
import { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { format } from "timeago.js";
import "./App.css";
function App() {
  const currentUser = "jane";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    // setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  const handleDblClick = (e) => {
    console.log(e);
    const { lat, lng } = e.lngLat;
    setNewPlace({
      lat,
      lng,
    });
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
        onDblClick={handleDblClick}
      >
        {pins.map((p) => {
          return (
            <>
              <Marker
                position="absolute"
                longitude={p.long}
                latitude={p.lat}
                anchor="center"
              >
                <i
                  class="fa-solid fa-location-pin"
                  style={{
                    fontSize: "35px ",
                    color: p.username === currentUser ? "blue" : "brown",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(p._id)}
                ></i>
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  longitude={p.long}
                  latitude={p.lat}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="right"
                  onClose={() => setCurrentPlaceId(null)}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
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
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </>
          );
        })}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="right"
            onClose={() => setNewPlace(null)}
          >
            Hello
          </Popup>
        )}
      </Map>
    </div>
  );
}
export default App;
