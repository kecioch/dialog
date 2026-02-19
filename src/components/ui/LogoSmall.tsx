import { NavLink } from "react-router-dom";

const LogoSmall = () => {
  return (
    <NavLink to="/home" draggable={false}>
      <img
        src="images/dialog-logo-small.svg"
        alt="logo"
        className="h-11 w-auto"
        draggable={false}
      />
    </NavLink>
  );
};

export default LogoSmall;
