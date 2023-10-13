import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const handelLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("logout successfully");
  };
  return (
    <div>
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="navbar-brand h1 ">
            {" "}
            <BiDonateBlood color="red" /> Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome{" "}
                {user?.name || user?.organization || user?.hospitalName} !
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/hospital" ||
            location.pathname === "/donor" ? (
              <li className="nav-item mx-3">
                <p className="nav-link">
                  <Link to="/analytics" className="nav-link">
                    Analytics{" "}
                  </Link>
                </p>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <p className="nav-link">
                  <Link to="/" className="nav-link">
                    Home{" "}
                  </Link>
                </p>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handelLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
