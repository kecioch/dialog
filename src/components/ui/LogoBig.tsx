import { NavLink } from "react-router-dom";

const LogoBig = () => {
  return (
    <NavLink to="/" draggable={false}>
      <img
        src="images/dialog-logo-large.svg"
        alt="logo"
        className="h-8 w-auto"
        draggable={false}
      />
    </NavLink>
  );
};

export default LogoBig;
