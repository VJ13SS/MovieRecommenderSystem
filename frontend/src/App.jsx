import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [displaySpinner,setDisplaySpinner] = useState(true);
  return (
    <div className="app">
      <div className="spinner-component" style={{display:displaySpinner?'flex':'none'}}>
        Loading
        <div className="spinner"></div>
        <button onClick={()=>(setDisplaySpinner(false))}>Enter</button>
      </div>
    </div>
  );
}
