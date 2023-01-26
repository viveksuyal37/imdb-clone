import "./Navbar.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        {" "}
        <img className="nav-logo" src={Logo} alt="MovieDb" />
      </Link>
      <ul className="nav-list">
        <Link to="/movies/popular">
          <li>Popular</li>
        </Link>
        <Link to="/movies/top_rated">
          {" "}
          <li>Top Rated</li>
        </Link>
        <Link to="/movies/upcoming">
          {" "}
          <li>Upcoming</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
