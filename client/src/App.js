import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "./App.css";
function App() {
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
        <Marker
          position="absolute"
          longitude={51.21389}
          latitude={18.4233}
          offsetTop={-10}
          offsetLeft={-20}
          anchor="center"
        >
          <i
            class="fa-solid fa-location-pin"
            style={{ fontSize: "35px ", color: "brown" }}
          ></i>
        </Marker>
        <Popup
          longitude={51.21389}
          latitude={18.4233}
          closeButton={true}
          closeOnClick={false}
          anchor="right"
        >
          <div className="card">
            <label>Place</label>
            <h4>x</h4>
            <label>Review</label>
            <p>beautiful</p>
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
              Create by <b>Priya</b>
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
      </Map>
    </div>
  );
}
export default App;
