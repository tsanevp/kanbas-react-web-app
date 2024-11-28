import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item"><Link to="/Labs" className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>Labs</Link></li>
      <li className="nav-item"><Link to="/Labs/Lab1" className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>Lab 1</Link></li>
      <li className="nav-item"><Link to="/Labs/Lab2" className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>Lab 2</Link></li>
      <li className="nav-item"><Link to="/Labs/Lab3" className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>Lab 3</Link></li>
      <li className="nav-item"><Link to="/Labs/Lab4" className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>Lab 4</Link></li>
      <li className="nav-item"><Link to="/Labs/Lab5" className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>Lab 5</Link></li>
      <li className="nav-item"><Link to="/Kanbas" className={`nav-link ${pathname.includes("Kanbas") ? "active" : ""}`}>Kanbas</Link></li>
      <li className="nav-item"><a id="wd-github" href="https://github.com/tsanevp/kanbas-react-web-app/tree/a6" target="_blank" rel="noreferrer" className={`nav-link ${pathname.includes("Github") ? "active" : ""}`}>Client Github Repo</a></li>
      <li className="nav-item"><a id="wd-github" href="https://github.com/tsanevp/kanbas-node-server-app/tree/a6" target="_blank" rel="noreferrer" className={`nav-link ${pathname.includes("Github") ? "active" : ""}`}>Server Github Repo</a></li>
    </ul>
  );
}  