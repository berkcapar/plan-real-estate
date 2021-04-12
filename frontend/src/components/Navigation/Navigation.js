import { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";

const Navigation = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className="nav-container">
      <div className="navbar-logo-container">
        <Link className="navbar-logo" exact to="/">
          PLAN EMLAK
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i
            className={
              click
                ? "navigation-fas fas fa-times"
                : "navigation-fas fas fa-bars"
            }
          ></i>
        </div>
      </div>

      <ul className={click ? "nav-elements active" : "nav-elements"}>
        <li>
          {" "}
          <Link className="nav-links" to="/makeawish" onClick={closeMobileMenu}>
            Make A Wish
          </Link>
        </li>
        <li>
          <a className="nav-links" href="#why-turkey" onClick={closeMobileMenu}>
            Why Turkey?
          </a>
        </li>
        <li>
          {" "}
          <a
            className="nav-links"
            href="#why-plan-emlak"
            onClick={closeMobileMenu}
          >
            Why Plan Emlak
          </a>
        </li>
        <li>
          {" "}
          <a className="nav-links" href="#contact" onClick={closeMobileMenu}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;

/* let mainNav = document.getElementById('js-menu');
  let navBarToggle = document.getElementById('js-navbar-toggle');
  
  navBarToggle.addEventListener('click', function () {
      
      mainNav.classList.toggle('active');
  }); */
