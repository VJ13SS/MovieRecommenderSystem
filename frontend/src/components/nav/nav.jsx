import { useNavigate } from 'react-router-dom';
import './nav.css'

export default function Nav({displaySpinner}) {
  const navigate = useNavigate();

  const goToHome = () =>{
    navigate('/')
  }
  return (
    <div className="nav" style={{ display: displaySpinner ? "none" : "flex" }}>
      <div className="nav-left">
        <span style={{cursor:'pointer'}}onClick={goToHome}>NOT-FLIX</span>
      </div>
      <div className="nav-right">
        <button>Sign In</button>
      </div>
    </div>
  );
}
