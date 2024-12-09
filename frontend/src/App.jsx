import { useEffect, useState } from "react";
import "./App.css";

import Content from "./components/content";
export default function App() {
  const [displaySpinner, setDisplaySpinner] = useState(true);
  console.log(displaySpinner);
  return (
    <div
      className="app"
      style={{ justifyContent: displaySpinner ? "center" : "" }}
    >
      <div
        className="nav"
        style={{ display: displaySpinner ? "none" : "none" }}
      >
        <div className="nav-left">
          <span>NOT-FLIX</span>
        </div>
        <div className="nav-right">
          <button>Sign In</button>
        </div>
      </div>
      <div
        className="spinner-component"
        style={{ display: displaySpinner ? "flex" : "none" }}
      >
        Loading
        <div className="spinner"></div>
        <button onClick={() => setDisplaySpinner((prev) => !prev)}>
          Enter
        </button>
      </div>

      <div
        className="grid"
        style={{ display: displaySpinner ? "none" : "none" }}
      >
        <div className="content">
          <h1>Unlimited <span>Movies</span> Unlimited <span>Fun</span></h1>
          <p>Ready to enter into the diverse world of movies..?Engage your selves into the dynamic movie exprience</p>
        </div>
      </div>
      <div className="app-content" style={{ display: displaySpinner ? "none" : "none" }}>
        <div className="movie-row">
          <span>Trending Now</span>
          <div className="movies">
            <div className="movie">
              <img src="" alt="" />
            </div>
            <div className="movie">
              <img src='' alt="" />
            </div>
            <div className="movie">
              <img src='' alt="" />
            </div>
            <div className="movie">
              <img src='' alt="" />
            </div>
            <div className="movie">
              <img src='' alt="" />
            </div>
            <div className="movie">
              <img src='' alt="" />
            </div>
            <div className="movie">
              <img src='' alt="" />
            </div>
          </div>
        </div>
      </div>
      <Content displaySpinner={displaySpinner} />
    </div>
  );
}
