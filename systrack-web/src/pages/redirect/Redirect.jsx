import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Redirect.module.scss";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Logo from "../../assets/img/logo.png";

function Redirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const label = location.state?.label || "";
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(countdown);
    };
  }, [navigate]);
  return (
    <div>
      <Header />
      <div className={styles.Redirect}>
        <img src={Logo} alt="Logo" />
        <span>{label}</span>
        <span className={styles.timer}>Redirecting... {timer}</span>
      </div>
      <Footer />
    </div>
  );
}

export default Redirect;
