import styles from "./Home.module.scss";
import Login from "../../components/login/Login";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

function Home() {
  return (
    <div>
      <Header />
      <div className={styles.home}>
        <Login />
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
