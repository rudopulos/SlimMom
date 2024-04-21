import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header">
      <NavLink to="/">
        <img className="header-logo" src="/SlimMom/logo.svg" alt="logo" />
      </NavLink>{" "}
      <NavLink to="/login">LOG IN</NavLink>
      <NavLink to="/register">REGISTER</NavLink>
      <NavLink to="/calculator">CALCULATOR</NavLink>
      <NavLink to="/diary">DIARY</NavLink>
    </nav>
  );
};

export default Header;
