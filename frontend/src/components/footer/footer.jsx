import './footer.css'

export default function Footer({displaySpinner}) {
  return (
    <footer style={{ display: displaySpinner ? "none" : "flex" }}>
      <span>
        Questions? Call <a href="#">000-800-919-1743</a>
      </span>
      <div className="links">
        <ul>
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Media Center</a>
          </li>
          <li>
            <a href="#">Ways to Know</a>
          </li>
          <li>
            <a href="#">Cookie Preferences</a>
          </li>
          <li>
            <a href="#">Speed Test</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Help Center</a>
          </li>
          <li>
            <a href="#">Investor Relations</a>
          </li>
          <li>
            <a href="#">Terms of use</a>
          </li>
          <li>
            <a href="#">Coorporate Information</a>
          </li>
          <li>
            <a href="#">Legal Notices</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Account</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Only On Netflix</a>
          </li>
        </ul>
      </div>
      <span>Not-Flix India</span>
    </footer>
  );
}
