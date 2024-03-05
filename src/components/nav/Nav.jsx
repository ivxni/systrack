import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./Nav.module.scss";
import Logo from "../../assets/img/logo.png";
import Button from "../button/Button";

function Nav({ email }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    if (axios.defaults.headers.common["Authorization"]) {
      delete axios.defaults.headers.common["Authorization"];
    }

    navigate("/");
  };

  const isAdmin = role === "Admin";
  const isSpecialist = role === "Specialist";
  const isStaff = role === "Staff";
  const hasHigherPrivileges = isAdmin || isSpecialist || isStaff;

  return (
    <div className={styles.nav}>
      <div className={styles.items}>
        <div className={styles.title}>
          <div className={styles.img__container}>
            <img src={Logo} alt="sysTrack"></img>
          </div>
          <h4>sysTrack</h4>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/dashboard/myprofile"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/mycomputers"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                My Computers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myorders"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                My Orders
              </NavLink>
            </li>
            {hasHigherPrivileges && <div className={styles.Line}></div>}
            {isAdmin || isStaff ? (
              <li>
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Users
                </NavLink>
              </li>
            ) : null}
            {isAdmin || isStaff ? (
              <li>
                <NavLink
                  to="/dashboard/orders"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Orders
                </NavLink>
              </li>
            ) : null}
            {isAdmin || isSpecialist ? (
              <li>
                <NavLink
                  to="/dashboard/computers"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Computers
                </NavLink>
              </li>
            ) : null}
            {/*{isAdmin || isSpecialist ? (
              <li>
                <NavLink
                  to="/dashboard/components"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Components
                </NavLink>
              </li>
            ) : null}*/}
          </ul>
        </nav>
      </div>
      <div className={styles.footer}>
        <span>{role}</span>
        <Button variant="primary" label="Logout" onClick={handleLogout} />
        <span>{email}</span>
      </div>
    </div>
  );
}

export default Nav;
