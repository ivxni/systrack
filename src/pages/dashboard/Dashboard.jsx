import { useEffect } from "react";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import Nav from "../../components/nav/Nav";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem("userEmail") || "Unknown";

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/");
      }
    };

    checkAuthStatus();

    const interval = setInterval(checkAuthStatus, 60000);

    return () => clearInterval(interval);
  }, [navigate]);
  return (
    <div className={styles.dashboard}>
      <Nav email={userEmail} />
      <div className={styles.nav}></div>
      {location.pathname === '/dashboard' ? <Navigate to="/dashboard/myprofile" /> : <Outlet />}
    </div>
  );
}

export default Dashboard;
