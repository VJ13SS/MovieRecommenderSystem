import { useNavigate } from "react-router-dom";
import "./nav.css";

export default function Nav({ displayLogin }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="nav" style={{ display: displayLogin ? "none" : "flex" }}>
      <div className="nav-left">
        <span style={{ cursor: "pointer" }} onClick={goToHome}>
          NOT-FLIX
        </span>
      </div>
      <div className="nav-right">
        <span>ENJOY FUN</span>
      </div>
    </div>
  );
}
