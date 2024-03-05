import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Input from "../input/Input";
import Button from "../button/Button";

import styles from "./Login.module.scss";

library.add(faUser, faKey);

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const apiBaseUrl = "https://systrack-its.azurewebsites.net";

  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/api/user/register`, {
        email,
        password,
      });

      login(event, true);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (event, isRegistering = false) => {
    if (!isRegistering) {
      event.preventDefault();
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/api/user/login`, {
        email,
        password,
      });
      const { token, userId, role } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId.toString());
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      navigate("/redirect", {
        state: { label: isRegistering ? "Signed Up" : "Logged In" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        {showLogin ? (
          <form onSubmit={login}>
            <div className={styles.data__container}>
              <h2>Login</h2>
              <div className={styles.input__container}>
                <FontAwesomeIcon
                  icon="user"
                  className={styles.fa}
                ></FontAwesomeIcon>
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className={styles.input__container}>
                <FontAwesomeIcon
                  icon="key"
                  className={styles.fa}
                ></FontAwesomeIcon>
                <Input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.submit}>
              <Button variant="primary" label="Login" type="submit" />
              <span>Do not have an account?</span>
              <span className={styles.Link} onClick={toggleForm}>
                Create Account
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={register}>
            <div className={styles.data__container}>
              <h2>Signup</h2>
              <div className={styles.input__container}>
                <FontAwesomeIcon
                  icon="user"
                  className={styles.fa}
                ></FontAwesomeIcon>
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className={styles.input__container}>
                <FontAwesomeIcon
                  icon="key"
                  className={styles.fa}
                ></FontAwesomeIcon>
                <Input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className={styles.input__container}>
                <FontAwesomeIcon
                  icon="key"
                  className={styles.fa}
                ></FontAwesomeIcon>
                <Input
                  placeholder="Repeat Password"
                  type="password"
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.submit}>
              <Button variant="primary" label="Signup" type="submit" />
              <span>Already have an account?</span>
              <span className={styles.Link} onClick={toggleForm}>
                Login
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
